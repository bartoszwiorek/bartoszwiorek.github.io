export function runtimeConfig(env = process.env) {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const cookiebotId = env.COOKIEBOT_ID?.trim() || ''
  const ackeeDomainId = env.ACKEE_DOMAIN_ID?.trim() || ''
  const ackeeServer = (env.ACKEE_SERVER || '').trim().replace(/\/+$/, '')
  if (cookiebotId && !uuid.test(cookiebotId)) throw new Error('COOKIEBOT_ID must be a UUID')
  if (ackeeDomainId && !uuid.test(ackeeDomainId)) throw new Error('ACKEE_DOMAIN_ID must be a UUID')
  if (ackeeServer) {
    const url = new URL(ackeeServer)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
      throw new Error('ACKEE_SERVER must be an HTTPS URL without credentials, query or fragment')
    }
  }
  return { cookiebotId, ackeeServer, ackeeDomainId }
}
