<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# テスト戦略および不具合管理ドキュメント

本ドキュメントは、「My Roadmap」プロジェクトにおけるテスト手法、品質基準、および自律型AIエンジニアリングループ（Vitest統合）を定義します。

---

## 1. テスト戦略 (Testing Strategy)

本プロジェクトではテストピラミッドアプローチを採用し、高速で信頼性の高い単体テストおよびコンポーネントテストを重視します。

### 1.1 テストレベル定義

| レベル | 測定対象スコープ | 使用ツール | 実行頻度 |
| :--- | :--- | :--- | :--- |
| **単体テスト (Unit Test)** | 純粋関数、カスタムHook、ユーティリティロジック | Vitest | PR作成時 / ローカル開発時 |
| **コンポーネントテスト** | UIコンポーネント (shadcn/ui), フォーム操作 | Vitest + React Testing Library | PR作成時 / ローカル開発時 |
| **統合テスト (Integration)** | Amplify GraphQL API, 認証フロー | 手動 (Amplify Sandbox) | 主要機能の更新時 |
| **E2Eテスト** | フルユーザーフロー | Playwright (将来導入) | MVPリリース後 |

### 1.2 チームおよびAIの役割分担

- **開発者 (Developers)**: 新機能追加時に単体テストおよびコンポーネントテストを作成する責任を負います。
- **AIエージェント**: テスト基盤の維持、自律型TDDループの駆動、および初回テストコード雛形の自動生成を担当します。

---

## 2. 不具合管理 (Defect Management)

### 2.1 Issueトラッキングの運用
- すべてのバグは `bug` ラベルを付与して GitHub Issues に報告されます。
- 報告には以下を含める必要があります：
  - 再現手順 (Steps to reproduce)
  - 期待される動作 vs 実際の動作
  - 実行環境情報 (ブラウザ、OS)

### 2.2 優先度（重要度）定義

| レベル | 概要説明 | 対応優先度 |
| :--- | :--- | :--- |
| **P0 (最重要/Critical)** | 核心機能の破損 (認証、DB接続異常)、セキュリティ漏洩 | 即時修正 |
| **P1 (重要/High)** | 主要機能の欠損、UI/UXの深刻な阻害 | 次回スプリント |
| **P2 (中度/Medium)** | 軽微な機能バグ、エッジケースの問題 | 計画順次対応 |
| **P3 (低度/Low)** | スタイル崩れ、軽微な誤字 | バックログ |

---

## 3. 開発ツールおよびテスト環境

- **テストランナー**: [Vitest](https://vitest.dev/) (`cd web && npx vitest run`)
- **実行環境**: [jsdom](https://github.com/jsdom/jsdom)
- **コンポーネントモック**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **カバレッジ計測**: Vitest Coverage (`cd web && npx vitest run --coverage`) — 最低 **80%** のカバレッジ基準。
- **CI/CD統合**: GitHub Actions により `main` へのPRごとに自動テストを実行。

---

## 4. AIエージェントとのテスト連携 (AI Agent & Testing)

本プロジェクトでは、AIエージェントによる自動開発ループ (`/loop-engineering`) 内で Vitest が単体・コンポーネントテストの核心的な検証エンジンとして機能します。

- **TDD ガードレール**: AIエージェントは新機能追加時に必ず Vitest テストを先に記述 (RED) し、失敗を確認した後に最小限の実装 (GREEN) を行います。
- **品質・カバレッジゲート**: PR 生成前に全テストの自動実行とカバレッジ監査（80%以上必須、認証・セキュリティは100%）が強制されます。
- **自律開発アーキテクチャ詳細**: AIエージェントの自律開発ループ全般や AI Engineering OS の詳細設計については、[AI開発ガイドライン (/ai_development_guidelines)](/ai_development_guidelines) を参照してください。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Test Strategy and Defect Management

This document defines the testing approach, quality standards, and autonomous AI engineering loop integration for the "My Roadmap" project.

---

## 1. Testing Strategy

We follow the testing pyramid approach, prioritizing unit and integration tests for speed and reliability.

### 1.1 Testing Levels

| Level | Scope | Tools | Frequency |
| :--- | :--- | :--- | :--- |
| **Unit Test** | Pure functions, individual hooks, utility logic | Vitest | Every PR / Local dev |
| **Component Test** | UI components (shadcn/ui), form interactions | Vitest + React Testing Library | Every PR / Local dev |
| **Integration Test** | Amplify GraphQL API, Auth flows | Manual (Amplify Sandbox) | Major feature updates |
| **E2E Test** | Full user journeys | Playwright (Future) | Post-MVP |

### 1.2 Responsibilities

- **Developers**: Responsible for writing unit and component tests for every new feature.
- **AI Agent**: Responsible for maintaining test infrastructure, driving autonomous TDD loops, and generating initial test boilerplate.

---

## 2. Defect Management

### 2.1 Issue Tracking
- All bugs must be reported as GitHub Issues with the `bug` label.
- Reports should include:
  - Steps to reproduce
  - Expected vs. Actual behavior
  - Environment details (Browser, OS)

### 2.2 Severity Levels

| Level | Description | Priority |
| :--- | :--- | :--- |
| **P0 (Critical)** | Core functionality broken (Auth, DB), Security leak | Immediate Fix |
| **P1 (High)** | Major feature broken, UI/UX severely impacted | Next Sprint |
| **P2 (Medium)** | Minor feature bug, edge case issues | As scheduled |
| **P3 (Low)** | Stylistic issues, minor typos | Backlog |

---

## 3. Tooling and Environment

- **Runner**: [Vitest](https://vitest.dev/) (`cd web && npx vitest run`)
- **Environment**: [jsdom](https://github.com/jsdom/jsdom)
- **Component Mocking**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Coverage Tool**: Vitest Coverage (`cd web && npx vitest run --coverage`) — Minimum 80% threshold required.
- **CI Integration**: GitHub Actions runs unit tests on every PR to `main`.

---

## 4. AI Agent & Testing Integration

In this project, Vitest serves as the core verification engine within the autonomous AI execution loop (`/loop-engineering`).

- **TDD Guardrails**: The AI agent is required to write failing tests first (RED) before implementing functional code (GREEN).
- **Quality & Coverage Gates**: Automated full test execution and coverage audits (80%+ threshold required, 100% for auth/security) are enforced before PR generation.
- **Detailed Guidelines**: For full specifications on the autonomous loop architecture and AI Engineering OS, refer to the [AI Development Guidelines](/ai_development_guidelines).

</div>

