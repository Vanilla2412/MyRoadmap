<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# CI/CD パイプライン仕様書 (CI/CD Pipeline Specification)

本ドキュメントは、「My Roadmap」プロジェクトにおける継続的インテグレーション (CI) および継続的デプロイメント (CD) のワークフロー仕様を記載したものです。

## 1. 概要 (Overview)

本プロジェクトでは、GitHub Actions を使用して自動テストおよび AWS Amplify へのデプロイを行っています。

- **CI**: すべての Pull Request に対してリンティング、型チェック、およびビルド検証を自動実行。
- **CD**: セミオートマチック（半自動）デプロイ戦略。コスト最適化とセキュリティ確保のため、マージ時の自動デプロイは無効化されており、スケジュールまたは管理者承認付きの昇認トリガーでデプロイを実行します。

---

## 2. 継続的インテグレーション (CI)

### ワークフロー: `Next.js CI` (`.github/workflows/ci.yml`)

- **トリガー**: `main` ブランチへのプッシュおよび `main` をターゲットとするすべての Pull Request。
- **実行環境**: Node.js 20.x, Ubuntu latest。

#### 主な実行ステップ:
1. **依存関係のインストール**: `npm install` を使用。WindowsとCI環境間の差異を防ぐため、パイプライン内ではインストール前に `package-lock.json` を再生成します。
2. **型チェック**: `npm run typecheck` を実行し、TypeScript の型安全性を確認。
3. **リンティング**: `npm run lint` (ESLint) を実行してコード品質を維持。
4. **ビルド検証**: `npm run build` を実行し、Next.js アプリケーションが正常にコンパイルされることを検証。

---

## 3. 継続的デプロイメント (CD)

AWS Amplify への **セミオートマチック（半自動）** デプロイ戦略を採用しています。

### ワークフロー: `Amplify Deploy` (`.github/workflows/deploy.yml`)

#### A. スケジュールデプロイ
- **スケジュール**: 毎月 1 日 23:00 JST (`0 14 1 * *` UTC)。
- **目的**: 手動操作なしで定期的な「マンスリーリリース」を提供。

#### B. 手動デプロイ
- **トリガー**: `workflow_dispatch` (GitHub UI からの手動トリガー)。
- **要件**: 「管理者承認 (Admin Approval)」が設定された環境での実行。
- **ログ記録**: デプロイ実行の理由は GitHub Actions のサマリーに自動記録。

### デプロイ処理ロジック (`amplify.yml`)
1. **バックエンド**: `npx ampx pipeline-deploy` により AWS リソース (Auth, Data) をデプロイ。
2. **フロントエンド**: Next.js アプリケーションをビルド。
3. **キャッシュ**: 後続ビルドの高速化のため、Node モジュールおよび Next.js ビルドキャッシュを保持。

---

## 4. 将来ロードマップ

### 4.1 自動通知の導入 (計画中)
リアルタイムのステータス通知のため **Slack** との連携を予定。
- **詳細**: [Issue #63](https://github.com/Vanilla2412/MyRoadmap/issues/63) を参照。
- **イベント**: CI/CD の成功および失敗の通知。

### 4.2 ステージング環境の拡充
現在は単一の `main` ブランチで運用していますが、将来のイテレーションで以下を検討：
- Pull Request ごとのプレビューデプロイ。
- ステージング専用の `develop` ブランチの構築。

---

## 5. セキュリティ & クレデンシャル管理

- すべての AWS クレデンシャルおよび App ID は **GitHub Secrets** に安全に保存。
- 本番環境へのデプロイには、リポジトリ管理者からの手動承認が必要。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# CI/CD Pipeline Specification

This document details the Continuous Integration (CI) and Continuous Deployment (CD) workflows for the **My Roadmap** project.

## 1. Overview

The project uses GitHub Actions for automated testing and deployment to AWS Amplify.

- **CI**: Automated linting, type checking, and build verification on every Pull Request.
- **CD**: Semi-automated deployment strategy. Automatic deployment on merge is disabled to optimize costs and ensure security. Deployment is triggered by schedules or manual actions, requiring administrator approval.

---

## 2. Continuous Integration (CI)

### Workflow: `Next.js CI` (`.github/workflows/ci.yml`)

- **Trigger**: Pushes to `main` and all Pull Requests targeting `main`.
- **Environment**: Node.js 20.x, Ubuntu latest.

#### Key Steps:
1. **Dependency Installation**: Uses `npm install`. To avoid environmental discrepancies between Windows and CI, `package-lock.json` is removed before installation in the pipeline.
2. **Type Check**: Runs `npm run typecheck` to ensure TypeScript safety.
3. **Lint**: Runs `npm run lint` (ESLint) to maintain code quality.
4. **Build Verification**: Runs `npm run build` to ensure the Next.js application compiles correctly.

---

## 3. Continuous Deployment (CD)

The project adopts a **Semi-Automated** deployment strategy to AWS Amplify.

### Workflow: `Amplify Deploy` (`.github/workflows/deploy.yml`)

#### A. Scheduled Deployment
- **Schedule**: 1st of every month at 23:00 JST (`0 14 1 * *` UTC).
- **Purpose**: To provide a regular "Monthly Release" without manual intervention.

#### B. Manual Deployment
- **Trigger**: `workflow_dispatch` (Manual trigger from GitHub UI).
- **Requirement**: Execution requires an environment with "Admin Approval".
- **Log**: The reason for deployment is recorded in the GitHub Actions summary.

### Deployment Process Logic (`amplify.yml`)
1. **Backend**: Deploys AWS resources (Auth, Data) using `npx ampx pipeline-deploy`.
2. **Frontend**: Builds the Next.js application.
3. **Cache**: Node modules and Next.js build cache are preserved to speed up subsequent builds.

---

## 4. Future Roadmap

### 4.1 Automated Notifications (Planned)
Integration with **Slack** is planned to provide real-time status updates.
- **Details**: See [Issue #63](https://github.com/Vanilla2412/MyRoadmap/issues/63).
- **Events**: Notifications for CI/CD success and failure.

### 4.2 Staging Environments
Currently, the project operates on a single `main` branch. Future iterations may include:
- Preview deployments for Pull Requests.
- A dedicated `develop` branch for staging.

---

## 5. Security & Credentials

- All AWS credentials and App IDs are stored securely in **GitHub Secrets**.
- Deployments to the production environment require manual approval from a repository administrator.

</div>

