---
layout: home

hero:
  name: My Roadmap
  text: Learning Task Management
  tagline: A professional learning task management application built with Next.js and AWS Amplify Gen 2
  actions:
    - theme: brand
      text: View Requirements
      link: /requirements
    - theme: alt
      text: View on GitHub
      link: https://github.com/vanilla2412/MyRoadmap

features:
  - icon: ⚡
    title: Next.js App Router
    details: Modern React framework with TypeScript and App Router for optimal performance
  - icon: ☁️
    title: AWS Amplify Gen 2
    details: Infrastructure as Code with AWS services - Cognito, AppSync, DynamoDB
  - icon: 🔒
    title: Enterprise Security
    details: 28 comprehensive security requirements following AWS Well-Architected Framework and OWASP Top 10
  - icon: 🎨
    title: Modern UI
    details: Built with shadcn/ui and Tailwind CSS for a beautiful, responsive interface
  - icon: 🚀
    title: CI/CD Pipeline
    details: Automated deployment with GitHub Actions
  - icon: 📊
    title: Real-time Updates
    details: GraphQL API with AWS AppSync for efficient data synchronization
---

<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

## プロジェクト概要

**My Roadmap** は、ユーザーが自身の学習目標を体系的に管理・追跡するための学習タスク管理アプリケーションです。本プロジェクトは、モダンなWeb開発のベストプラクティスとエンタープライズグレードのクラウドアーキテクチャを実証するポートフォリオとして設計されています。

### 技術スタック (Tech Stack)

- **フロントエンド (Frontend)**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **バックエンド (Backend)**: AWS Amplify Gen 2 (Infrastructure as Code via TypeScript)
- **認証 (Authentication)**: AWS Cognito
- **データベース (Database)**: Amazon DynamoDB
- **API**: AWS AppSync (GraphQL)
- **CI/CD**: GitHub Actions

### 主要ドキュメント (Documentation)

- [要件定義書 (/requirements)](/requirements) - 機能要件および非機能要件の詳細仕様
- [アプリ画面ショーケース (/showcase)](/showcase) - 各画面のUIデザイン・主要機能ハイライト
- [CI/CD パイプライン (/cicd)](/cicd) - 自動テスト・ビルド・デプロイフロー仕様
- [AI開発ガイドライン (/ai_development_guidelines)](/ai_development_guidelines) - AIエージェントを活用した開発基準
- [運用ポリシー (/operations_policy)](/operations_policy) - コスト管理・リソースハイジーン・DR手順
- [テスト戦略 (/test_strategy)](/test_strategy) - VitestおよびTDD自律ループ仕様
- [可観測性ロードマップ (/observability_roadmap)](/observability_roadmap) - ログ・RUM・X-Ray・SLO戦略

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

## Project Overview

**My Roadmap** is a learning task management application designed to help users systematically track and organize their learning goals. This project demonstrates modern web development practices and enterprise-grade architecture.

### Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: AWS Amplify Gen 2 (Infrastructure as Code)
- **Authentication**: AWS Cognito
- **Database**: Amazon DynamoDB
- **API**: AWS AppSync (GraphQL)
- **CI/CD**: GitHub Actions

### Documentation

- [Requirements Specification](/requirements) - Comprehensive functional and non-functional requirements
- [Application Showcase](/showcase) - UI screen designs and feature highlights
- [CI/CD Pipeline](/cicd) - Automated testing and deployment specifications
- [AI Development Guidelines](/ai_development_guidelines) - Guidelines for AI-driven development
- [Operations Policy](/operations_policy) - Cost management, resource hygiene, and DR policy
- [Test Strategy](/test_strategy) - Vitest and autonomous TDD loop strategy
- [Observability Roadmap](/observability_roadmap) - Structured logging, RUM, X-Ray, and SLO strategy

</div>

