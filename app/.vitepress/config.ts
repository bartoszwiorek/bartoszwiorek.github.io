import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  lang: 'en-US',
  title: 'Bartosz Wiorek',
  description: 'Front-end Engineer based in Poznań, Poland. JavaScript, TypeScript, React, and an eye for design.',
  appearance: 'dark',
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#101211' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],
  vite: { plugins: [tailwindcss()] },
})
