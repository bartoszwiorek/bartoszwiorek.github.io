import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import ts from 'typescript'
import { runtimeConfig } from './config.mjs'

const source = ts.transpileModule(await readFile(new URL('../.vitepress/theme/privacy.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const id = '00000000-0000-0000-0000-000000000001'
function fixture(config) {
  const scripts = [], events = new Map(), records = []
  const window = {
    Cookiebot: { consent: { statistics: false } },
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: name => events.delete(name),
    ackeeTracker: { create: () => ({ record: (_id, attributes) => {
      const record = { attributes, stopped: false }
      records.push(record)
      return { stop: () => { record.stopped = true } }
    } }) },
  }
  const messages = []
  const context = { exports: {}, console: { error: (...args) => messages.push(args), warn: (...args) => messages.push(args) }, window, fetch: async () => ({ ok: true, json: async () => config }), location: { origin: 'https://portfolio.example.com', pathname: '/' }, document: { createElement: () => ({ dataset: {}, remove() {} }), head: { append: script => scripts.push(script) } } }
  vm.runInNewContext(source, context)
  return { ...context.exports, window, scripts, events, records, messages }
}
test('missing Cookiebot configuration disables analytics', async () => {
  const f = fixture({ cookiebotId: '', ackeeServer: 'https://analytics.example.com', ackeeDomainId: id })
  assert.equal((await f.setupPrivacy()).enabled, false)
  assert.equal(f.scripts.length, 0)
  assert.match(f.messages[0][0], /COOKIEBOT_ID/)
})
test('configured Cookiebot loads without Ackee configuration and reports script failures', async () => {
  const f = fixture({ cookiebotId: id, ackeeServer: '', ackeeDomainId: '' })
  assert.equal((await f.setupPrivacy()).enabled, true)
  assert.equal(f.scripts[0].src, 'https://consent.cookiebot.com/uc.js')
  assert.equal(f.scripts[0].dataset.cbid, id)
  assert.equal(f.scripts[0].dataset.blockingmode, 'none')
  f.scripts[0].onerror()
  assert.match(f.messages[0][0], /Cookiebot script could not be loaded/)
  assert.equal(f.records.length, 0)
})
test('consent gates loading, avoids duplicate records, and withdrawal stops tracking', async () => {
  const f = fixture({ cookiebotId: id, ackeeServer: 'https://analytics.example.com', ackeeDomainId: id })
  const privacy = await f.setupPrivacy()
  assert.equal(f.scripts.length, 1)
  f.window.Cookiebot.consent.statistics = true
  f.events.get('CookiebotOnAccept')()
  assert.equal(f.scripts.length, 2)
  f.scripts[1].onload()
  f.events.get('CookiebotOnConsentReady')()
  assert.equal(f.records.length, 1)
  privacy.trackPage()
  assert.equal(f.records[0].stopped, true)
  assert.equal(f.records.length, 2)
  f.window.Cookiebot.consent.statistics = false
  f.events.get('CookiebotOnDecline')()
  assert.equal(f.records[1].stopped, true)
  privacy.cleanup()
  assert.equal(f.events.size, 0)
})
test('withdrawal while tracker is loading prevents a record', async () => {
  const f = fixture({ cookiebotId: id, ackeeServer: 'https://analytics.example.com', ackeeDomainId: id })
  await f.setupPrivacy()
  f.window.Cookiebot.consent.statistics = true
  f.events.get('CookiebotOnAccept')()
  f.window.Cookiebot.consent.statistics = false
  f.events.get('CookiebotOnDecline')()
  f.scripts[1].onload()
  assert.equal(f.records.length, 0)
})
test('partially initialized Cookiebot waits for consent without throwing', async () => {
  const f = fixture({ cookiebotId: id, ackeeServer: 'https://analytics.example.com', ackeeDomainId: id })
  f.window.Cookiebot = {}
  const privacy = await f.setupPrivacy()
  assert.doesNotThrow(() => f.openCookieSettings())
  assert.doesNotThrow(() => f.scripts[0].onload())
  assert.doesNotThrow(() => f.events.get('CookiebotOnConsentReady')())
  assert.equal(f.scripts.length, 1)
  assert.equal(f.records.length, 0)
  f.window.Cookiebot.consent = { statistics: true }
  f.events.get('CookiebotOnConsentReady')()
  assert.equal(f.scripts.length, 2)
  f.scripts[1].onload()
  assert.equal(f.records.length, 1)
  delete f.window.Cookiebot.consent
  assert.doesNotThrow(() => f.events.get('CookiebotOnDecline')())
  assert.equal(f.records[0].stopped, true)
  privacy.cleanup()
})
test('runtime configuration normalizes HTTPS URLs and rejects invalid values', () => {
  assert.equal(runtimeConfig({ ACKEE_SERVER: 'https://analytics.example.com/' }).ackeeServer, 'https://analytics.example.com')
  assert.throws(() => runtimeConfig({ COOKIEBOT_ID: 'invalid' }))
  assert.throws(() => runtimeConfig({ ACKEE_SERVER: 'javascript:alert(1)' }))
  assert.throws(() => runtimeConfig({ ACKEE_SERVER: 'https://user:password@example.com' }))
})
