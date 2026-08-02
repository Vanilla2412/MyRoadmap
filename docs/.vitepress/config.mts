import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'My Roadmap',
  description: 'Learning Task Management Application - Professional portfolio project',
  base: '/MyRoadmap/',
  ignoreDeadLinks: true,
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Requirements', link: '/requirements' },
      { text: 'Showcase', link: '/showcase' },
      { text: 'CI/CD', link: '/cicd' },
      { text: 'AI Development', link: '/ai_development_guidelines' },
      { text: 'Operations', link: '/operations_policy' },
      { text: 'Testing', link: '/test_strategy' }
    ],
    
    sidebar: [
      {
        text: 'Project Overview',
        items: [
          { text: 'Requirements Specification', link: '/requirements' },
          { text: 'Application Showcase', link: '/showcase' },
          { text: 'CI/CD Pipeline', link: '/cicd' },
          { text: 'AI Development Guidelines', link: '/ai_development_guidelines' },
          { text: 'Task Breakdown (Issues)', link: '/issues_list' }
        ]
      },
      {
        text: 'Operations & Testing',
        items: [
          { text: 'Financial Cost Estimation', link: '/financial_cost_estimation' },
          { text: 'Operations Policy', link: '/operations_policy' },
          { text: 'Test Strategy', link: '/test_strategy' },
          { text: 'Observability Roadmap', link: '/observability_roadmap' }
        ]
      },
      {
        text: 'Guides & Policies',
        items: [
          { text: 'Amplify Hosting Setup', link: '/setup-amplify-hosting' },
          { text: 'Cognito Troubleshooting', link: '/troubleshooting-cognito' },
          { text: 'Privacy Policy', link: '/privacy-policy' }
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
