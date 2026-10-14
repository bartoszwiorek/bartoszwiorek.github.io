import { defineConfig, type HeadConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  lang: 'en-US',
  title: 'wiorek.net',
  description: 'Over 10 years of building web applications, from interface to API. Thoughtful engineering, attention to detail and code built to last.',
  appearance: 'dark',
  cleanUrls: true,
  srcExclude: ['README.md'],
  sitemap: { hostname: 'https://wiorek.net' },
  head: [
    ['meta', { name: 'theme-color', content: '#101211' }],
    ['meta', { name: 'author', content: 'Bartosz Wiorek' }],
    ['meta', { property: 'og:site_name', content: 'wiorek.net' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],
  transformHead({ pageData }) {
    if (pageData.relativePath === '404.md') return [['meta', { name: 'robots', content: 'noindex, follow' }]]
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = new URL(path, 'https://wiorek.net/').href
    const title = pageData.relativePath === 'index.md' ? 'Bartosz Wiorek - Full-stack Web Developer' : `${pageData.title} | wiorek.net`
    const image = 'https://wiorek.net/og-image.png'
    const imageAlt = 'Bartosz Wiorek - Full-stack Web Developer. Code with care. Built to work. wiorek.net.'
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:secure_url', content: image }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: imageAlt }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageData.description }],
      ['meta', { name: 'twitter:image', content: image }],
      ['meta', { name: 'twitter:image:alt', content: imageAlt }],
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
