import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'My Roadmap',
  description: 'Learning Task Management Application - Professional portfolio project',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Requirements', link: '/requirements' },
      { text: 'CI/CD', link: '/cicd' }
    ],
    
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Requirements Specification', link: '/requirements' },
          { text: 'CI/CD Pipeline', link: '/cicd' }
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
}))
