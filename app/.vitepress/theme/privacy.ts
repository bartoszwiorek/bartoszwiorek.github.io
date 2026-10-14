type RuntimeConfig = { cookiebotId: string; ackeeServer: string; ackeeDomainId: string }
type Tracker = { record: (id: string, attributes: { siteLocation: string }) => { stop: () => void } }
declare global {
  interface Window {
    Cookiebot?: { consent: { statistics: boolean }; renew: () => void }
    ackeeTracker?: { create: (server: string, options: Record<string, boolean>) => Tracker }
  }
}

export function openCookieSettings() { window.Cookiebot?.renew() }

export async function setupPrivacy(): Promise<{ enabled: boolean; cleanup?: () => void; trackPage?: () => void }> {
  let config: RuntimeConfig
  try {
    const response = await fetch('/runtime-config.json', { cache: 'no-store' })
    if (!response.ok) {
      console.error('[Privacy] Runtime configuration could not be loaded:', response.status)
      return { enabled: false }
    }
    config = await response.json()
  } catch (error) {
    console.error('[Privacy] Runtime configuration could not be loaded. Serve the app using scripts/server.mjs or pnpm dev.', error)
    return { enabled: false }
  }
  if (!config.cookiebotId) {
    console.warn('[Privacy] Cookiebot is disabled: COOKIEBOT_ID is missing from the running server environment.')
    return { enabled: false }
  }

  let stop: (() => void) | undefined
  let tracker: Tracker | undefined
  let loading = false
  let disposed = false
  const allowed = () => !disposed && Boolean(window.Cookiebot?.consent.statistics)
  function sync() {
    if (!allowed()) { stop?.(); stop = undefined; return }
    if (stop || !config.ackeeServer || !config.ackeeDomainId) return
    if (tracker) {
      // Exclude query strings and fragments from recorded URLs.
      stop = tracker.record(config.ackeeDomainId, { siteLocation: location.origin + location.pathname }).stop
      return
    }
    if (loading) return
    loading = true
    const script = document.createElement('script')
    script.src = `${config.ackeeServer}/tracker.js`
    script.async = true
    script.dataset.cookieconsent = 'statistics'
    script.onload = () => {
      loading = false
      tracker = window.ackeeTracker?.create(config.ackeeServer, { detailed: false, ignoreLocalhost: true, ignoreOwnVisits: true })
      if (tracker) sync()
    }
    script.onerror = () => { loading = false; script.remove() }
    document.head.append(script)
  }
  const events = ['CookiebotOnConsentReady', 'CookiebotOnAccept', 'CookiebotOnDecline']
  events.forEach(event => window.addEventListener(event, sync))
  const script = document.createElement('script')
  script.id = 'Cookiebot'
  script.src = 'https://consent.cookiebot.com/uc.js'
  script.dataset.cbid = config.cookiebotId
  script.dataset.culture = 'EN'
  // Manual blocking: all optional tracking is managed by sync().
  script.dataset.blockingmode = 'none'
  script.onload = sync
  script.onerror = () => console.error('[Privacy] Cookiebot script could not be loaded. Check network errors, content security policy and browser extensions.')
  script.async = true
  document.head.append(script)
  sync()
  return { enabled: true, trackPage: () => { stop?.(); stop = undefined; sync() }, cleanup: () => {
    disposed = true
    stop?.()
    events.forEach(event => window.removeEventListener(event, sync))
  } }
}
