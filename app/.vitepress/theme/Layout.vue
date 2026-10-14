<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { setupPrivacy, openCookieSettings } from './privacy'

const { page } = useData()
const route = useRoute()
const cookiesEnabled = ref(false)
let cleanup: (() => void) | undefined
let trackPage: (() => void) | undefined
let disposed = false
watch(() => route.path, () => trackPage?.(), { flush: 'post' })
onMounted(async () => {
  const privacy = await setupPrivacy()
  if (disposed) { privacy.cleanup?.(); return }
  cookiesEnabled.value = privacy.enabled
  cleanup = privacy.cleanup
  trackPage = privacy.trackPage
})
onUnmounted(() => { disposed = true; cleanup?.() })
const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Strapi', 'Payload', 'PostgreSQL', 'Algolia', 'VitePress', 'Storybook', 'Chromatic', 'Figma', 'AI integrations']
const expertise = [
  { title: 'Frontend engineering', text: 'React, Next.js and TypeScript for web applications, with Tailwind CSS for responsive interfaces.' },
  { title: 'Backend & content', text: 'Node.js and Express for APIs, Strapi/Payload for content management, and PostgreSQL for application data.' },
  { title: 'Component workflows', text: 'Figma, Storybook and Chromatic to connect interface specifications, component development and visual testing.' },
  { title: 'Search & integrations', text: 'Algolia for search, VitePress for documentation, and AI integrations that support application workflows.' },
]
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="mx-auto max-w-6xl px-6 sm:px-10">
    <header class="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-white/10 py-7">
      <a href="/" aria-label="wiorek.net - home" class="shrink-0 text-lg font-semibold tracking-tight">wiorek<span class="text-lime">.</span>net</a>
      <nav aria-label="Main navigation" class="flex flex-wrap gap-2 text-sm text-muted sm:gap-6">
        <a href="/#about">About</a><a href="/#experience">Experience</a><a href="/#expertise">Expertise</a><a href="/#certificates">Certificates</a><a href="/#contact">Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </header>

    <main id="main" tabindex="-1">
      <template v-if="page.relativePath === 'index.md'">
        <section class="grid gap-12 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1fr_280px] lg:items-end lg:pb-28" aria-labelledby="hero-title">
          <div>
            <p class="eyebrow mb-7 flex items-center gap-3"><span class="h-2 w-2 rounded-full bg-lime" /> FULL-STACK WEB DEVELOPER · POZNAŃ, PL</p>
            <h1 id="hero-title" class="max-w-3xl text-5xl font-medium leading-[1.06] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Code with care.<br /><span class="text-muted">Built to work.</span></h1>
            <p class="mt-8 max-w-xl text-lg leading-relaxed text-muted">I'm Bartosz Wiorek, a full-stack web developer based in Poznań. I build web applications with React, TypeScript and Node.js - from the interface to the API.</p>
            <a class="primary-link mt-9" href="mailto:bartoszwiorek@gmail.com">Let's talk <span aria-hidden="true">↗</span></a>
          </div>
          <aside class="profile-panel" aria-label="Profile at a glance">
            <div class="mb-12 flex items-start justify-between"><span class="eyebrow">A LITTLE CONTEXT</span><span class="text-lime" aria-hidden="true">✳</span></div>
            <p class="text-2xl font-medium tracking-tight">Bartosz<br />Wiorek<span class="text-lime">.</span></p>
            <p class="mt-2 text-sm text-muted">Full-stack Web Developer</p>
            <div class="mt-8 border-t border-white/10 pt-5 text-sm text-muted">Based in Poznań, Poland<br /><span class="mt-2 block text-foreground">From frontend to backend.</span></div>
          </aside>
        </section>

        <section id="about" class="section-grid" aria-labelledby="about-title">
          <p class="eyebrow"><span class="section-number">01 /</span> ABOUT</p>
          <div>
            <h2 id="about-title" class="section-title">The whole application.<br />Attention to every layer.</h2>
            <p class="body-copy mt-6">I work across the web stack: building interfaces, connecting services and shaping the data behind them. My toolkit centres on TypeScript, React and Node.js, with the supporting tools each application needs.</p>
            <p class="body-copy mt-4">I care about readable code, reusable components and a smooth experience for the people using the product. I keep learning and exploring practical ways to bring new capabilities, including AI integrations, into web applications.</p>
            <div class="mt-9 border-l-2 border-lime pl-5"><p class="text-sm font-medium">Engineering degree in Computer Science</p><p class="mt-1 text-sm text-muted">Adam Mickiewicz University · Poznań</p></div>
          </div>
        </section>

        <section id="experience" class="section-grid" aria-labelledby="experience-title">
          <p class="eyebrow"><span class="section-number">02 /</span> EXPERIENCE</p>
          <div>
            <p class="mb-6 text-7xl font-medium tracking-[-0.055em] text-lime sm:text-8xl" aria-hidden="true">10+</p>
            <h2 id="experience-title" class="section-title">Over 10 years<br />of web development.</h2>
            <p class="body-copy mt-6">More than a decade of experience building for the web. Today, my work spans frontend interfaces, backend APIs and the services that connect them.</p>
            <p class="body-copy mt-4">I bring that experience to each project with a focus on clear code, practical technology choices and applications that are easy to use and maintain.</p>
          </div>
        </section>

        <section id="expertise" class="section-grid" aria-labelledby="expertise-title">
          <p class="eyebrow"><span class="section-number">03 /</span> EXPERTISE</p>
          <div>
            <h2 id="expertise-title" class="section-title">A connected web stack.</h2>
            <p class="body-copy mt-5">Tools for building interfaces, delivering APIs, managing content and keeping components consistent.</p>
            <div class="mt-9 divide-y divide-white/10">
              <div v-for="item in expertise" :key="item.title" class="grid gap-3 py-6 sm:grid-cols-[210px_1fr]">
                <h3 class="font-medium">{{ item.title }}</h3><p class="text-sm leading-7 text-muted">{{ item.text }}</p>
              </div>
            </div>
            <ul aria-label="Technologies" class="mt-7 flex flex-wrap gap-2"><li v-for="skill in skills" :key="skill" class="rounded-full border border-white/15 px-4 py-2 text-xs text-muted">{{ skill }}</li></ul>
          </div>
        </section>

        <section id="certificates" class="section-grid" aria-labelledby="certificates-title">
          <p class="eyebrow"><span class="section-number">04 /</span> CERTIFICATES</p>
          <div>
            <h2 id="certificates-title" class="section-title">A foundation in search.</h2>
            <p class="body-copy mt-5">Algolia credentials that complement my work with search and web applications.</p>
            <ul class="mt-9 divide-y divide-white/10" aria-label="Algolia certificates">
              <li class="flex items-start justify-between gap-5 py-6">
                <div><p class="eyebrow mb-3">ALGOLIA</p><h3 class="text-lg font-medium">Algolia Certified Developer</h3></div>
                <span class="shrink-0 rounded-full border border-lime/30 px-4 py-2 text-xs font-medium text-lime">ACD</span>
              </li>
              <li class="flex items-start justify-between gap-5 py-6">
                <div><p class="eyebrow mb-3">ALGOLIA</p><h3 class="text-lg font-medium">Algolia Search Engineering Basics</h3></div>
                <span class="shrink-0 rounded-full border border-lime/30 px-4 py-2 text-xs font-medium text-lime">ASEB</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="contact" class="section-grid border-b-0!" aria-labelledby="contact-title">
          <p class="eyebrow"><span class="section-number">05 /</span> CONTACT</p>
          <div>
            <h2 id="contact-title" class="section-title">Good work starts<br />with a conversation.</h2>
            <p class="body-copy mt-5">Building a web application, connecting services or improving an existing product? Let’s talk about what you have in mind.</p>
            <a class="mt-8 inline-flex break-all text-xl font-medium text-lime sm:text-2xl" href="mailto:bartoszwiorek@gmail.com">bartoszwiorek@gmail.com <span class="ml-3" aria-hidden="true">↗</span></a>
            <div class="mt-6"><a href="https://www.linkedin.com/in/bartoszwiorek" target="_blank" rel="noopener noreferrer" class="text-sm text-muted">Find me on LinkedIn<span class="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
      </template>
      <section v-else-if="page.isNotFound" class="py-24"><p class="eyebrow">404</p><h1 class="section-title mt-4">This page isn't here.</h1><a class="primary-link mt-8" href="/">Back home <span aria-hidden="true">↗</span></a></section>
      <article v-else class="prose-page mx-auto max-w-3xl py-20"><Content /></article>
    </main>

    <footer class="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 py-7 text-xs text-muted">
      <p>Bartosz Wiorek <span class="px-2 text-lime">/</span> Built with care.</p>
      <div class="flex gap-6"><a href="/privacy">Privacy</a><button v-if="cookiesEnabled" type="button" @click="openCookieSettings">Cookie settings</button><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
    </footer>
  </div>
</template>
