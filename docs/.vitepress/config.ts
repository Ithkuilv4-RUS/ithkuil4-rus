import { defineConfig } from 'vitepress'
import fg from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter'

const DOCS_DIR = path.resolve(process.cwd(), 'docs')

function makeGrammarSidebar() {
  const files = fg.sync(['grammar/**/*.md'], {
    cwd: DOCS_DIR,
    onlyFiles: true
  }).filter(f => f !== 'grammar/index.md')

  const items = files
    .map((file) => {
      const abs = path.join(DOCS_DIR, file)
      const raw = fs.readFileSync(abs, 'utf8')
      const fm = matter(raw).data as { title?: string; sidebarTitle?: string; sidebarOrder?: number }

      const link = '/' + file.replace(/\.md$/, '')
      const fallback = path.basename(file, '.md')
      const text = fm.sidebarTitle || fm.title || fallback

      return { text, link, order: typeof fm.sidebarOrder === 'number' ? fm.sidebarOrder : 9999 }
    })
    .sort((a, b) => (a.order - b.order) || a.text.localeCompare(b.text, 'ru'))

  return items.map(({ order, ...rest }) => rest)
}

export default defineConfig({
  lang: 'ru-RU',
  title: 'Новый Ифкуиль',
  description: 'Текст...',

  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Грамматика', link: '/grammar/' }
    ],

    sidebar: {
      '/grammar/': [
        { text: 'Введение', link: '/grammar/' },
        ...makeGrammarSidebar()
      ]
    },

    search: { provider: 'local' }
  }
})
