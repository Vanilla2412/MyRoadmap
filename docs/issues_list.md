<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# MVP 開発タスク分解一覧 (Issues Breakdown)

本ドキュメントは、「My Roadmap」の MVP 開発における各ステップを 1〜2 時間（サイズ: S）の扱いやすいタスクに分解した GitHub Issues の定義一覧です。

## Step 2: 認証機能 (Authentication)

### Issue 1: Amplify Gen2 認証リソースの定義
- **タイトル**: `feat: define Amplify Gen 2 Auth resource`
- **概要**: Cognito を使用した Eメールサインアップのバックエンド認証ルールを構成。
- **受入基準**:
  - [ ] `web/amplify/auth/resource.ts` が Eメールログインロジックで更新されていること。
  - [ ] `npx ampx sandbox` がエラーなくプロビジョニング完了すること。

### Issue 2: ログインおよびサインアップ UI の実装
- **タイトル**: `feat: implement login and signup UI`
- **概要**: Amplify Authenticator を統合したログイン・アカウント作成画面の実装。
- **受入基準**:
  - [ ] ログイン用ルート (`/login` 等) を作成。
  - [ ] Amplify Authenticator コンポーネントを組み込み。

### Issue 3: 保護されたルート向け Next.js ミドルウェア
- **タイトル**: `feat: implement protected routes via Next.js Middleware`
- **概要**: 認証済みユーザーのみがタスクダッシュボードにアクセスできるように制御。
- **受入基準**:
  - [ ] `middleware.ts` を作成し、Amplify Auth セッション状態をチェック。
  - [ ] 未認証ユーザーをログインページへリダイレクト。

---

## Step 3: バックエンドデータモデル

### Issue 4: Task データモデルの定義 (DynamoDB & AppSync)
- **タイトル**: `feat: define Task data model with owner authorization`
- **概要**: `web/amplify/data/resource.ts` 内で所有者ベースのアクセス権限を持つ `Task` モデルを定義。

---

## Step 4: フロントエンド UI の実装

### Issue 5: タスクダッシュボード UI
- **タイトル**: `feat: implement Task Dashboard layout and list rendering`
- **概要**: AppSync API からタスクを取得し、shadcn/ui コンポーネントで描画。

### Issue 6: タスク作成フォーム (React Hook Form + Zod)
- **タイトル**: `feat: implement Task creation form`
- **概要**: Zod バリデーション付きのタスク作成モーダルフォーム。

### Issue 7: タスク編集・削除機能
- **タイトル**: `feat: implement Edit and Delete actions for Tasks`
- **概要**: 既存タスクの更新および DynamoDB からの削除機能。

---

## Step 5 〜 Step 8: 運用・信頼性・将来計画

- **Issue 8**: Amplify Hosting デプロイ設定
- **Issue 9**: CI/CD パイプラインにおける Slack 通知機能
- **Issue 10**: コミュニティ標準ドキュメント (`CONTRIBUTING.md`, `SECURITY.md`) の作成
- **Issue 11**: 財務コスト試算および試算分析 ([financial_cost_estimation.md](/financial_cost_estimation))
- **Issue 12**: Phase 3 AWS コスト設計および運用ポリシー ([operations_policy.md](/operations_policy))
- **Issue 13**: Phase 4 AI 機能統合および MLOps 基盤の研究

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# MVP Development Task Breakdown (Issues)

These are the 1-2 hour estimation tasks (Size: S) broken down from development roadmaps. You can use these titles and criteria to create GitHub Issues.

## Step 2: Authentication

### Issue 1: Amplify Gen2 Auth resource definition
- **Title**: `feat: define Amplify Gen 2 Auth resource`
- **Context**: Configure backend authentication rules using email sign-up for Cognito.
- **Acceptance Criteria**:
  - [ ] `web/amplify/auth/resource.ts` is updated with email sign-in logic.
  - [ ] Running `npx ampx sandbox` launches successfully without errors.

### Issue 2: Login and Signup UI Implementation
- **Title**: `feat: implement login and signup UI`
- **Context**: Present login and signup options using Amplify Authenticator.
- **Acceptance Criteria**:
  - [ ] Create dedicated login route (`/login`).
  - [ ] Embed Amplify Authenticator component.

### Issue 3: Next.js Middleware for Protected Routes
- **Title**: `feat: implement protected routes via Next.js Middleware`
- **Context**: Only authenticated users should access the Task Dashboard.
- **Acceptance Criteria**:
  - [ ] Create or update `middleware.ts` to check Amplify Auth session.
  - [ ] Unauthenticated users are redirected to login page.

---

## Step 3: Backend Data Model

### Issue 4: Task Data Model definition (DynamoDB & AppSync)
- **Title**: `feat: define Task data model with owner authorization`
- **Context**: Define the `Task` schema in `web/amplify/data/resource.ts` with `allow.owner()` rules.

---

## Step 4: Frontend UI Implementation

### Issue 5: Task Dashboard UI
- **Title**: `feat: implement Task Dashboard layout and list rendering`
- **Context**: Display user tasks using AppSync API and shadcn/ui components.

### Issue 6: Task Creation Form (React Hook Form + Zod)
- **Title**: `feat: implement Task creation form`
- **Context**: Validated form to create new tasks mapped to Zod schema.

### Issue 7: Task Edit and Delete Functionality
- **Title**: `feat: implement Edit and Delete actions for Tasks`
- **Context**: Update status or delete tasks directly in DynamoDB.

---

## Step 5 - Step 8: Operations & Roadmap

- **Issue 8**: AWS Amplify Hosting Deployment Configuration
- **Issue 9**: Implement Slack Notifications for CI/CD Pipeline
- **Issue 10**: GitHub Release Notes and Community Standards
- **Issue 11**: Financial Cost Estimation and Analysis ([financial_cost_estimation.md](/financial_cost_estimation))
- **Issue 12**: Phase 3 AWS Cost Design and Operations Policy ([operations_policy.md](/operations_policy))
- **Issue 13**: Phase 4 AI Integration and MLOps Foundation

</div>
