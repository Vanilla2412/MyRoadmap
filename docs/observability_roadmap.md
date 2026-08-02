<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# オブザーバビリティ（可観測性）実装ロードマップ

本ドキュメントは、「My Roadmap」プロジェクトにおいてエンタープライズグレードのオブザーバビリティ（可観測性）を構築するための戦略的ロードマップです。ログ記録、モニタリング、分散トレーシング、および信頼性エンジニアリングの実践的スキルを習得するよう設計されています。

---

## 🏗️ Phase 1: 構造化ログ機能 (High-Cardinality Structured Logging)
**目標**: 単純な `console.log` から、検索可能でハイパフォーマンスな JSON ログへ移行。

### Issue 原案: `feat: implement structured logging with CloudWatch Insights support`
- **背景**: 標準ログはフィルタリングが困難。CloudWatch での検索性を高めるため構造化ログが必要。
- **タスク**:
  - [ ] Next.js (Server Components/Actions) および Lambda 向けに `pino` を導入・設定。
  - [ ] `web/src/lib/logger.ts` に統一されたロギングユーティリティを実装。
  - [ ] 全ログに `request_id`, `user_id`, `correlation_id` を付与。
  - [ ] CDK 経由で CloudWatch Groups のログ保持期間 (14日) を設定。
- **習得スキル**:
  - カーディナリティの高いデータの管理。
  - CloudWatch Logs Insights のクエリ構文。
  - 高トラフィックアプリにおけるロギングのパフォーマンスへの影響。

---

## 📈 Phase 2: リアルユーザーモニタリング (RUM) & パフォーマンス
**目標**: サーバーの枠を超えてユーザー体験を可視化。

### Issue 原案: `feat: integrate AWS CloudWatch RUM for client-side observability`
- **背景**: ユーザーが遭遇する問題の多くはブラウザ側で発生。RUM により JS エラーやページロード時間を可視化。
- **タスク**:
  - [ ] AWS Console/CLI (または CDK) 経由で CloudWatch RUM App Monitor をプロビジョニング。
  - [ ] Next.js `layout.tsx` に RUM スニペットを組み込み。
  - [ ] 主要アクション (例: "タスク作成") にカスタムイベントを設定。
  - [ ] Core Web Vitals (LCP, FID, CLS) を監視。
- **習得スキル**:
  - クライアント側のパフォーマンスメトリクス。
  - プライバシーを保護したユーザーフローの追跡。
  - クライアントエラーとサーバーレースの紐付け。

---

## 🔍 Phase 3: 分散トレーシング (Distributed Tracing)
**目標**: エンドツーエンドのリクエストライフサイクルを可視化。

### Issue 原案: `feat: enable distributed tracing with AWS X-Ray`
- **背景**: どのコンポーネント (AppSync, Lambda, DynamoDB) がレイテンシーの原因となっているかを特定。
- **タスク**:
  - [ ] `web/amplify/backend.ts` 内の AppSync API および Lambda で X-Ray トレーシングを有効化。
  - [ ] AWS X-Ray SDK を使用して特定ロジックブロックのサブセグメントを作成。
  - [ ] CloudWatch Service Map 上でトレースをビジュアル表示。
- **習得スキル**:
  - トレースの伝播 (W3C Trace Context)。
  - サーバーレスアーキテクチャにおけるボトルネックの特定。
  - API レイテンシーのプロファイリング。

---

## 🛡️ Phase 4: サイト信頼性エンジニアリング (SLI/SLO)
**目標**: 「正常」を定義し、「異常」時にアラートを発報。

### Issue 原案: `feat: define SLIs/SLOs and implement CloudWatch Dashboards`
- **背景**: サービスが不具合を起こしているタイミングを定量的に把握。
- **タスク**:
  - [ ] **SLI (サービスレベル指標)** の定義: API 成功率, P95 レイテンシー。
  - [ ] **SLO (サービスレベル目標)** の設定: 99.9% 成功率。
  - [ ] CloudWatch ダッシュボードの作成。
  - [ ] 重大障害に対する複合アラートの設定。
- **習得スキル**:
  - SRE (Site Reliability Engineering) 原則。
  - アラート疲労を避けるアクション可能なアラート設計。

---

## 📝 Issue 原案の活用方法
1. 上記のタイトルと本文をコピー。
2. 本リポジトリに新しい GitHub Issue を作成。
3. 実装ステップをチェックリストとして活用し、順次対応。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Observability Implementation Roadmap

This document outlines the strategic roadmap for implementing professional-grade observability in the **My Roadmap** project. These tasks are designed to build real-world skills in logging, monitoring, tracing, and reliability engineering.

---

## 🏗️ Phase 1: High-Cardinality Structured Logging
**Goal**: Move from simple `console.log` to searchable, high-performance JSON logs.

### Issue Draft: `feat: implement structured logging with CloudWatch Insights support`
- **Context**: Standard logs are hard to filter. We need structured logs for better searchability in CloudWatch.
- **Tasks**:
  - [ ] Install and configure `pino` for Next.js (Server Components/Actions) and Lambda.
  - [ ] Implement a unified logging utility in `web/src/lib/logger.ts`.
  - [ ] Add `request_id`, `user_id`, and `correlation_id` to all logs.
  - [ ] Configure log retention (14 days) in CloudWatch Groups via CDK.
- **Skills to Master**:
  - High-cardinality data management.
  - CloudWatch Logs Insights query syntax.
  - Performance impact of logging in high-traffic apps.

---

## 📈 Phase 2: Real User Monitoring (RUM) & Performance
**Goal**: Understand user experience beyond the server.

### Issue Draft: `feat: integrate AWS CloudWatch RUM for client-side observability`
- **Context**: Most user issues happen in the browser. RUM provides visibility into JS errors and page load times.
- **Tasks**:
  - [ ] Provision CloudWatch RUM App Monitor via AWS Console/CLI (or CDK).
  - [ ] Integrate the RUM snippet into the Next.js `layout.tsx`.
  - [ ] Set up custom events for key user actions (e.g., "Task Created").
  - [ ] Monitor Core Web Vitals (LCP, FID, CLS).
- **Skills to Master**:
  - Client-side performance metrics.
  - Tracking user journeys without violating privacy.
  - Mapping client errors to server traces.

---

## 🔍 Phase 3: Distributed Tracing & Distributed Logic
**Goal**: Visualize the end-to-end request lifecycle.

### Issue Draft: `feat: enable distributed tracing with AWS X-Ray`
- **Context**: Identifying which component (AppSync, Lambda, DynamoDB) is causing latency.
- **Tasks**:
  - [ ] Enable X-Ray tracing on AppSync API and Lambda functions in `web/amplify/backend.ts`.
  - [ ] Use AWS X-Ray SDK to create subsegments for specific logic blocks.
  - [ ] Visualize traces in the CloudWatch Service Map.
- **Skills to Master**:
  - Trace propagation (W3C Trace Context).
  - Bottleneck identification in serverless architectures.
  - Profiling API latency.

---

## 🛡️ Phase 4: Reliability Engineering (SLI/SLO)
**Goal**: Define "Healthy" and alert on "Unhealthy".

### Issue Draft: `feat: define SLIs/SLOs and implement CloudWatch Dashboards`
- **Context**: We need to know when we are failing our users.
- **Tasks**:
  - [ ] Define **Service Level Indicators (SLIs)**: API Success Rate, P95 Latency.
  - [ ] Set **Service Level Objectives (SLOs)**: 99.9% Success Rate.
  - [ ] Create a "Mission Control" CloudWatch Dashboard.
  - [ ] Configure composite alarms for critical failures.
- **Skills to Master**:
  - SRE (Site Reliability Engineering) principles.
  - Designing actionable alerts (avoiding alert fatigue).
  - Dashboard design for operational excellence.

---

## 📝 How to Use These Drafts
1. Copy the title and content of an issue draft.
2. Create a new GitHub Issue in this repository.
3. Use the implementation steps as your checklist.
4. Move from Phase 1 to Phase 4 sequentially for the best learning experience.

</div>

