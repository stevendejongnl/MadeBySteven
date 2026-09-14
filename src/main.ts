import { tagManager } from './analytics.js'

tagManager.init()
tagManager.trackPageView(window.location.pathname, document.title)
window.addEventListener('popstate', () => {
  tagManager.trackPageView(window.location.pathname, document.title)
})

export { MbsLayoutBase } from './layout/base.js'
export * from './components/main.js'
export * from './pages/main.js'
