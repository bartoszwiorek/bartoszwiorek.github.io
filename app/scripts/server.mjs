import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runtimeConfig } from './config.mjs'

const root = fileURLToPath(new URL('../.vitepress/dist/', import.meta.url))
const config = JSON.stringify(runtimeConfig())
const port = Number(process.env.PORT || 3000)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' }

createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return }
  let path
  try { path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname) }
  catch { res.writeHead(400); res.end(); return }
  if (path === '/health') { res.writeHead(200); res.end(req.method === 'HEAD' ? undefined : 'ok'); return }
  if (path === '/runtime-config.json') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    res.end(req.method === 'HEAD' ? undefined : config)
    return
  }
  const file = resolve(root, '.' + path)
  if (!file.startsWith(resolve(root) + sep) && file !== resolve(root)) { res.writeHead(403); res.end(); return }
  let contents, chosen, status = 200
  const candidates = path.endsWith('/') ? [resolve(file, 'index.html')] : [file, `${file}.html`, resolve(file, 'index.html')]
  for (const candidate of candidates) {
    try { if ((await stat(candidate)).isFile()) { contents = await readFile(candidate); chosen = candidate; break } } catch {}
  }
  if (!chosen) {
    status = 404
    chosen = resolve(root, '404.html')
    try { contents = await readFile(chosen) } catch { contents = Buffer.from('Not found') }
  }
  res.writeHead(status, {
    'Content-Type': types[extname(chosen)] || 'application/octet-stream',
    'Cache-Control': status === 200 && path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  })
  res.end(req.method === 'HEAD' ? undefined : contents)
}).listen(port, '0.0.0.0', () => console.log(`Portfolio listening on port ${port}`))
