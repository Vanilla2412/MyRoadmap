import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Roadmap',
  description: 'Learning Task Management Application - Professional portfolio project',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Requirements', link: '/requirements' }
    ],
    
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Requirements Specification', link: '/requirements' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vanilla2412/MyRoadmap' }
    ],
    
    footer: {
      message: 'Built with Next.js, AWS Amplify Gen 2, and VitePress',
      copyright: 'Copyright © 2026 Vanilla2412'
    }
  }
})
