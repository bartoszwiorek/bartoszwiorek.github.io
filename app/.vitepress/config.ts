import { defineConfig, type HeadConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  lang: 'en-US',
  title: 'wiorek.net',
  description: 'Bartosz Wiorek, full-stack web developer in Poznań, Poland. React, Next.js, TypeScript and Node.js - interfaces, APIs, content platforms and AI integrations.',
  appearance: 'dark',
  cleanUrls: true,
  srcExclude: ['README.md'],
  sitemap: { hostname: 'https://wiorek.net' },
  head: [
    ['meta', { name: 'theme-color', content: '#101211' }],
    ['meta', { name: 'author', content: 'Bartosz Wiorek' }],
    ['meta', { property: 'og:site_name', content: 'wiorek.net' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],
  transformHead({ pageData }) {
    if (pageData.relativePath === '404.md') return [['meta', { name: 'robots', content: 'noindex, follow' }]]
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = new URL(path, 'https://wiorek.net/').href
    const title = `${pageData.title} | wiorek.net`
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageData.description }],
    ]
    if (pageData.relativePath === 'index.md') head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Person', '@id': 'https://wiorek.net/#person', name: 'Bartosz Wiorek', url, jobTitle: 'Full-stack Web Developer', sameAs: ['https://www.linkedin.com/in/bartoszwiorek'], knowsAbout: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Strapi', 'Payload', 'PostgreSQL', 'Algolia', 'VitePress', 'Storybook', 'Chromatic', 'Figma', 'AI integrations'] },
        { '@type': 'WebSite', '@id': 'https://wiorek.net/#website', name: 'wiorek.net', url, inLanguage: 'en', author: { '@id': 'https://wiorek.net/#person' } },
        { '@type': 'ProfilePage', '@id': 'https://wiorek.net/#profile', url, mainEntity: { '@id': 'https://wiorek.net/#person' }, isPartOf: { '@id': 'https://wiorek.net/#website' } },
      ],
    })])
    return head
  },
  vite: { plugins: [tailwindcss()] },
})
