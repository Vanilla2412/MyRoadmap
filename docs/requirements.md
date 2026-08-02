<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# 要件定義書: My Roadmap

## 1. プロジェクト概要

**プロジェクト名:** My Roadmap  
**目的:** ユーザーが自身の学習タスクを体系的に追跡・管理・整理するための学習タスク管理アプリケーション。

**ターゲットユーザー:**

- 自己主導型の学習目標を管理する個人ユーザー
- スキル開発のために構造化されたタスク管理を必要とするユーザー

---

## 2. コア機能 (Phase 1 - MVP)

### 2.1 学習タスク管理

本アプリケーションの主要機能は、以下の必須属性を持つ学習タスクを管理することです：

#### タスク属性仕様

| 属性名 (Property) | データ型 | 必須 | 概要説明 |
| :--- | :--- | :--- | :--- |
| **タイトル (Title)** | String | はい | 学習タスクの名称 (例: "Next.js App Router の習得") |
| **ステータス (Status)** | Enum | はい | タスクの進捗状態: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED` |
| **優先度 (Priority)** | Enum | はい | 優先度レベル: `HIGH`, `MEDIUM`, `LOW` |
| **期限 (Due Date)** | Date | はい | 完了目標日 |
| **カテゴリ (Category)** | String | はい | 学習領域 (例: "フロントエンド", "バックエンド", "インフラ", "アルゴリズム") |

#### ステータス定義

- **NOT_STARTED**: タスクは作成されたが、まだ着手されていない状態
- **IN_PROGRESS**: ユーザーが現在アクティブに取り組んでいる状態
- **COMPLETED**: タスクが正常に完了した状態

---

## 3. 機能要件 (Functional Requirements)

### 3.1 タスクの CRUD 操作

- **FR-1.1**: ユーザーはすべての必須属性を指定して新しい学習タスクを作成できること。
- **FR-1.2**: ユーザーはすべての学習タスク一覧を閲覧できること。
- **FR-1.3**: ユーザーは既存タスクの任意の属性を更新できること。
- **FR-1.4**: ユーザーは学習タスクを削除できること。
- **FR-1.5**: ユーザーはタスクのステータスを変更できること (未着手 → 進行中 → 完了)。

### 3.2 タスクのフィルタリングおよびソート

- **FR-2.1**: ユーザーはステータス別にタスクをフィルタリングできること。
- **FR-2.2**: ユーザーは優先度別にタスクをフィルタリングできること。
- **FR-2.3**: ユーザーはカテゴリ別にタスクをフィルタリングできること。
- **FR-2.4**: ユーザーは期限日順にタスクをソートできること。
- **FR-2.5**: ユーザーは優先度順にタスクをソートできること。

### 3.3 タスクの視覚的表示

- **FR-3.1**: ユーザーにタスクのステータスが視覚的にわかりやすく表示されること。
- **FR-3.2**: ユーザーに優先度インジケーター (カラーコード等) が表示されること。
- **FR-3.3**: ユーザーに期日が近いタスクが強調表示されること。

---

## 4. 非機能要件 (Non-Functional Requirements)

### 4.1 パフォーマンス要件

- **NFR-1.1**: タスク一覧は 2 秒以内にロードされること。
- **NFR-1.2**: タスクの CRUD 操作は 1 秒以内に完了すること。

### 4.2 ユーザビリティ要件

- **NFR-2.1**: UI はレスポンシブであり、デスクトップおよびモバイル端末で正常に動作すること。
- **NFR-2.2**: UI はモダンなデザイン原則 (クリーン、直感的) に従うこと。
- **NFR-2.3**: アクセシビリティに配慮されていること (WCAG 2.1 Level AA 準拠)。

### 4.3 セキュリティ要件

#### 4.3.1 認証・アイデンティティ管理

- **NFR-3.1.1**: ユーザーは Eメール検証付きの AWS Cognito 経由で認証すること。
- **NFR-3.1.2**: パスワードは以下の最小複雑性要件を満たすこと：
  - 8 文字以上
  - 英大文字 1 文字以上
  - 英小文字 1 文字以上
  - 数字 1 文字以上
  - 記号 1 文字以上
- **NFR-3.1.3**: JWT トークンは 1 時間の非アクティブで期限切れとなること。
- **NFR-3.1.4**: リフレッシュトークンは httpOnly クッキーを使用して安全に保存されること。
- **NFR-3.1.5**: ログイン失敗試行にはレート制限を設けること (15 分あたり最大 5 回)。

#### 4.3.2 認可およびアクセス制御

- **NFR-3.2.1**: ユーザーは自身のタスクにのみアクセスできること (`userId` による行レベルセキュリティの強制)。
- **NFR-3.2.2**: すべての GraphQL ミューテーションは変更を許可する前にユーザーの所有権を検証すること。
- **NFR-3.2.3**: AppSync リゾルバーはフィールドレベルで認可ルールを強制すること。
- **NFR-3.2.4**: 有効な JWT トークンのない API リクエストは 401 Unauthorized を返すこと。
- **NFR-3.2.5**: 未承認のリソースにアクセスしようとする API リクエストは 403 Forbidden を返すこと。

#### 4.3.3 データ保護

- **NFR-3.3.1**: 通信中のすべてのデータは TLS 1.2 以上で暗号化されること。
- **NFR-3.3.2**: DynamoDB の保存データは AWS マネージドキーで暗号化されること。
- **NFR-3.3.3**: 機密性の高いユーザーデータ (メールアドレス) はプレーンテキストでログに記録されないこと。

#### 4.3.4 入力検証および API セキュリティ

- **NFR-3.4.1**: すべてのユーザー入力はクライアント側・サーバー側の両方で検証・サニタイズされること。
- **NFR-3.4.2**: GraphQL クエリの最大深度は 5 に制限されること。
- **NFR-3.4.3**: API レート制限はユーザーあたり毎分 100 リクエストに設定されること。

#### 4.3.5 セキュリティモニタリングおよびログ

- **NFR-3.5.1**: 認証失敗の試行は CloudWatch にログ記録されること。
- **NFR-3.5.2**: 不審なアクティビティは CloudWatch アラームをトリガーすること。
- **NFR-3.5.3**: アクセスログは 90 日間保持されること。

---

## 5. クラウドアーキテクチャ要件 (AWS Amplify Gen 2)

- **ARCH-1.1**: インフラストラクチャは TypeScript コード (AWS Amplify Gen 2 IaC) として定義・管理されること。
- **ARCH-1.2**: バックエンドリソース (Cognito, DynamoDB, AppSync) は Amplify sandbox 環境でローカル検証可能であること。
- **ARCH-1.3**: GitHub Actions CI/CD パイプライン経由で AWS Amplify ホスティング環境へ自動デプロイされること。

---

## 6. データモデル (Phase 1)

### タスクエンティティ (Task Entity)

```typescript
interface Task {
  id: string; // 一意識別子 (UUID)
  userId: string; // タスク所有者ID (Cognitoより)
  title: string; // タスク名
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string; // ISO 8601 日付フォーマット
  category: string; // 学習領域
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時
}
```

### DynamoDB テーブル設計

- **テーブル名**: `Tasks`
- **パーティションキー**: `userId` (String)
- **ソートキー**: `id` (String)
- **GSI (グローバルセカンダリインデックス)**:
  - `StatusIndex`: パーティションキー = `userId`, ソートキー = `status`
  - `DueDateIndex`: パーティションキー = `userId`, ソートキー = `dueDate`

---

## 7. ユーザーストーリー (User Stories)

- **US-1**: 学習者として、学習したい内容を追跡できるように新しいタスクを作成したい。
- **US-2**: 学習者として、ロードマップを一目で確認できるようにすべてのタスクを一覧で閲覧したい。
- **US-3**: 学習者として、現在集中しているタスクがわかるように作業開始時にステータスを「進行中」に変更したい。
- **US-4**: 学習者として、達成感を得るために完了したタスクを「完了」としてマークしたい。
- **US-5**: 学習者として、重要なアイテムから着手できるように各タスクに優先度を設定したい。
- **US-6**: 学習者として、時間を効率的に管理できるように期限日を設定したい。

---

## 8. スコープ外機能 (将来フェーズ)

以下の機能は Phase 1 には含まれず、将来のイテレーションで検討されます：

- サブタスク / 階層型タスク
- 時間トラッキング (見積時間 vs 実績時間)
- 学習リソースリンク (URL, メモ)
- 進捗率表示 (%)
- スキルツリー連携

---

## 9. ドキュメント情報

- **バージョン**: 1.2.0
- **最終更新日**: 2026-08-02
- **ステータス**: 公開中

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Requirements Specification: My Roadmap

## 1. Project Overview

**Project Name:** My Roadmap  
**Purpose:** A learning task management application designed to help users track and organize their learning tasks systematically.

**Target Users:**

- Individuals managing self-paced learning goals
- Users who need structured task tracking for skill development

---

## 2. Core Features (Phase 1 - MVP)

### 2.1 Learning Task Management

The primary feature of this application is to manage learning tasks with the following essential attributes:

#### Task Properties

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **Title** | String | Yes | Name of the learning task (e.g., "Learn Next.js App Router") |
| **Status** | Enum | Yes | Current state: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED` |
| **Priority** | Enum | Yes | Priority level: `HIGH`, `MEDIUM`, `LOW` |
| **Due Date** | Date | Yes | Target completion date |
| **Category** | String | Yes | Learning domain (e.g., "Frontend", "Backend", "Infrastructure") |

#### Status Definitions

- **NOT_STARTED**: Task has been created but not yet begun
- **IN_PROGRESS**: User is actively working on this task
- **COMPLETED**: Task has been finished successfully

---

## 3. Functional Requirements

### 3.1 Task CRUD Operations

- **FR-1.1**: Users shall be able to create a new learning task with all required properties
- **FR-1.2**: Users shall be able to view a list of all learning tasks
- **FR-1.3**: Users shall be able to update any property of an existing task
- **FR-1.4**: Users shall be able to delete a learning task
- **FR-1.5**: Users shall be able to change the status of a task (NOT_STARTED → IN_PROGRESS → COMPLETED)

### 3.2 Task Filtering and Sorting

- **FR-2.1**: Users shall be able to filter tasks by status
- **FR-2.2**: Users shall be able to filter tasks by priority
- **FR-2.3**: Users shall be able to filter tasks by category
- **FR-2.4**: Users shall be able to sort tasks by due date
- **FR-2.5**: Users shall be able to sort tasks by priority

### 3.3 Task Visualization

- **FR-3.1**: Users shall see a clear visual representation of task status
- **FR-3.2**: Users shall see priority indicators (e.g., color coding)
- **FR-3.3**: Users shall see upcoming deadlines highlighted

---

## 4. Non-Functional Requirements

### 4.1 Performance

- **NFR-1.1**: Task list shall load within 2 seconds
- **NFR-1.2**: Task CRUD operations shall complete within 1 second

### 4.2 Usability

- **NFR-2.1**: UI shall be responsive and work on desktop and mobile devices
- **NFR-2.2**: UI shall follow modern design principles (clean, intuitive)
- **NFR-2.3**: Application shall be accessible (WCAG 2.1 Level AA compliance)

### 4.3 Security

#### 4.3.1 Authentication & Identity Management

- **NFR-3.1.1**: Users shall authenticate via AWS Cognito with email verification
- **NFR-3.1.2**: Passwords shall meet minimum complexity requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- **NFR-3.1.3**: JWT tokens shall expire after 1 hour of inactivity
- **NFR-3.1.4**: Refresh tokens shall be securely stored using httpOnly cookies
- **NFR-3.1.5**: Failed login attempts shall be rate-limited (max 5 attempts per 15 minutes)

#### 4.3.2 Authorization & Access Control

- **NFR-3.2.1**: Users shall only access their own tasks (row-level security enforced by `userId`)
- **NFR-3.2.2**: All GraphQL mutations shall verify user ownership before allowing modifications
- **NFR-3.2.3**: AppSync resolvers shall enforce authorization rules at the field level
- **NFR-3.2.4**: API requests without valid JWT tokens shall return 401 Unauthorized
- **NFR-3.2.5**: API requests attempting to access unauthorized resources shall return 403 Forbidden

#### 4.3.3 Data Protection

- **NFR-3.3.1**: All data in transit shall be encrypted using TLS 1.2 or higher
- **NFR-3.3.2**: DynamoDB data at rest shall be encrypted using AWS managed keys
- **NFR-3.3.3**: Sensitive user data (email addresses) shall not be logged in plain text

#### 4.3.4 Input Validation & API Security

- **NFR-3.4.1**: All user inputs shall be validated and sanitized on both client and server side
- **NFR-3.4.2**: GraphQL queries shall have a maximum depth limit of 5 to prevent DoS attacks
- **NFR-3.4.3**: API rate limiting shall be enforced at 100 requests per minute per user

#### 4.3.5 Security Monitoring & Logging

- **NFR-3.5.1**: Failed authentication attempts shall be logged to CloudWatch
- **NFR-3.5.2**: Suspicious activity (rate limit exceeded, invalid tokens) shall trigger CloudWatch alarms
- **NFR-3.5.3**: Access logs shall be retained for 90 days

---

## 5. Cloud Architecture Requirements (AWS Amplify Gen 2)

- **ARCH-1.1**: Infrastructure shall be defined and managed as TypeScript code (AWS Amplify Gen 2 IaC)
- **ARCH-1.2**: Backend resources (Cognito, DynamoDB, AppSync) shall be verifiable locally in Amplify sandbox
- **ARCH-1.3**: Automated deployment to AWS Amplify Hosting via GitHub Actions CI/CD pipeline

---

## 6. Data Model (Phase 1)

### Task Entity

```typescript
interface Task {
  id: string; // Unique identifier (UUID)
  userId: string; // Owner of the task (from Cognito)
  title: string; // Task name
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string; // ISO 8601 date format
  category: string; // Learning domain
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}
```

### DynamoDB Table Design

- **Table Name**: `Tasks`
- **Partition Key**: `userId` (String)
- **Sort Key**: `id` (String)
- **GSI (Global Secondary Index)**:
  - `StatusIndex`: Partition Key = `userId`, Sort Key = `status`
  - `DueDateIndex`: Partition Key = `userId`, Sort Key = `dueDate`

---

## 7. User Stories (Phase 1)

**US-1**: As a learner, I want to create a new learning task so that I can track what I need to study.  
**US-2**: As a learner, I want to view all my tasks in a list so that I can see my learning roadmap at a glance.  
**US-3**: As a learner, I want to update a task's status to "In Progress" when I start working on it, so that I can track my current focus.  
**US-4**: As a learner, I want to mark a task as "Completed" when I finish it, so that I can see my progress.  
**US-5**: As a learner, I want to set a priority for each task so that I can focus on the most important items first.  
**US-6**: As a learner, I want to set a due date for each task so that I can manage my time effectively.

---

## 8. Out of Scope (Future Phases)

The following features are **not included in Phase 1** but may be considered for future iterations:

- Subtasks / nested tasks
- Time tracking (estimated hours, actual hours)
- Learning resources (URLs, notes)
- Progress percentage
- Skill tree integration

---

## 9. Document Information

- **Version**: 1.2.0
- **Last Updated**: 2026-08-02
- **Author**: John ([github](https://github.com/vanilla2412))
- **Status**: Published

</div>
