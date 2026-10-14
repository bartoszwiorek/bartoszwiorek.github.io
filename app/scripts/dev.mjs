import { createServer } from 'vitepress'
import { runtimeConfig } from './config.mjs'
import { loadEnv } from 'vite'

Object.assign(process.env, loadEnv('development', process.cwd(), ''))
const config = JSON.stringify(runtimeConfig())
const server = await createServer(process.cwd(), {
  plugins: [{ name: 'portfolio-runtime-config', configureServer(server) {
    server.middlewares.use('/runtime-config.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'no-store')
      res.end(config)
    })
  } }],
})
await server.listen()
server.printUrls()
