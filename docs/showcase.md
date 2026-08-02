<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# アプリケーションショーケース (Application Showcase)

**My Roadmap** アプリケーションに実装されているユーザーインターフェース、UXフロー、およびコア機能の概要です。

🎥 **[デモ動画 (AIエージェント統合デモ)](https://youtu.be/CB09PKJzTkc)**

[![デモ動画](https://img.youtube.com/vi/CB09PKJzTkc/0.jpg)](https://youtu.be/CB09PKJzTkc)

---

## 1. 認証フロー (Authentication Flow)
**AWS Cognito** を活用したセキュアなユーザーアイデンティティ管理機能。

### 主な特徴
* **デュアルタブインターフェース**: 「サインイン (Sign In)」と「アカウント作成 (Create Account)」をシームレスに切り替えるインターフェース。
* **パスワード表示トグル**: パスワード入力を確認できるインラインの目のアイコン。
* **入力バリデーションと安全機構**: ガイドテキストやエラーメッセージを備えたクリーンな入力レイアウト。
* **セルフサービスアクション**: パスワード再設定 (Forgot your password?) へのアクセス機能。

### スクリーンショット

<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">サインイン画面</p>
    <img src="/assets/showcase/auth-signin.png" alt="サインイン画面" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">アカウント作成画面</p>
    <img src="/assets/showcase/auth-signup.png" alt="アカウント作成画面" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
</div>

---

## 2. タスクダッシュボード (Task Dashboard)
タスク一覧、メタデータ表示、高度な検索・フィルタリング機能を備えたメインコントロールセンター。

### 主な特徴
* **詳細タスクカード**: タイトル、詳細要約、優先度バッジ (`LOW` / `MEDIUM` / `HIGH`)、期限、ステータスバッジ (`TODO`, `IN PROGRESS`, `DONE`) を一目で確認。
* **マルチ条件フィルタリング**: ステータス、優先度、カテゴリ、タグによる動的なタスク抽出。
* **ソート機能**: 期限日や優先順位による柔軟な一覧ソート。
* **トースト通知**: タスク更新時に画面右下に即座にフィードバックを表示する非同期トースト通知。

### スクリーンショット

<img src="/assets/showcase/dashboard.png" alt="タスクダッシュボード画面" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 3. タスク作成および編集 (Task Creation & Editing)
詳細なパラメータを指定して新規タスクの作成および編集を行うモーダルダイアログ。

### 主な特徴
* **時間管理**: `見積時間 (Estimated Hours)` と `実績時間 (Actual Hours)` を追跡。
* **期限日ピッカー**: 完了目標日を設定するためのネイティブカレンダー選択ツール。
* **タグ & カテゴリ**: 学習領域カテゴリとカンマ区切りのカスタムタグによる整理。
* **動的サブタスクリスト**: 1つの親タスク内で複数のサブタスクを追加・削除・管理。

### スクリーンショット

<img src="/assets/showcase/task-edit.png" alt="タスク作成・編集モーダル" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 4. 設定およびアカウントプロファイル (Settings & Account Profile)
ユーザー情報の更新、プライバシー設定、アカウント削除を行う中央設定領域。

### 主な特徴
* **プロファイル要約**: サインイン中のユーザーの基本情報 (Eメールアドレス等) を表示。
* **プライバシーコントロール**: アナリティクスおよびテレメトリ計測のオン/オフ切り替えスイッチ。
* **デンジャーゾーン (Danger Zone)**: 誤操作による削除を防ぐチェックボックス同意付きのアカウント解約・データ削除フロー。

### スクリーンショット

<img src="/assets/showcase/settings.png" alt="アカウント設定画面" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Application Showcase

An overview of the current user interface, user experience flows, and core features implemented in the **My Roadmap** application.

🎥 **[Demo Video (AI Agent Integrated)](https://youtu.be/CB09PKJzTkc)**

[![Demo Video](https://img.youtube.com/vi/CB09PKJzTkc/0.jpg)](https://youtu.be/CB09PKJzTkc)

---

## 1. Authentication Flow
Secure user identity management powered by **AWS Cognito**.

### Key Features
* **Dual Tabs Interface**: Interactive tabs to seamlessly toggle between "Sign In" and "Create Account" states.
* **Password Visibility Toggle**: Inline eye icons to easily check passwords and confirm password entries.
* **Input Validation & Safety**: Clean and standard input layouts with descriptive placeholder texts to guide the user.
* **Self-Service Actions**: Access to password recovery (Forgot your password?) to resolve account access issues.

### Screenshots

<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">Sign In</p>
    <img src="/assets/showcase/auth-signin.png" alt="Sign In Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">Create Account</p>
    <img src="/assets/showcase/auth-signup.png" alt="Create Account Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
</div>

---

## 2. Task Dashboard
The main control center featuring a comprehensive task list, metadata displays, and advanced querying capabilities.

### Key Features
* **Detailed Task Cards**: Displays important task information at a glance, including title, description summary, priority level badge (e.g., `LOW`), due date, and status badges (`TODO`, `IN PROGRESS`, `DONE`).
* **Multi-Criteria Filtering**: Dynamic dropdown selectors and input fields allowing users to filter tasks by **Status**, **Priority**, **Category**, and **Tag**.
* **Sorting Capabilities**: Easily sort the list of tasks (e.g., Default order).
* **Toast Notifications**: Asynchronous notifications at the bottom-right of the screen to give immediate feedback when tasks are updated (e.g., "Task updated successfully").

### Screenshots

<img src="/assets/showcase/dashboard.png" alt="Task Dashboard Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 3. Task Creation & Editing
A unified modal overlay for creating new tasks or editing existing ones with granular parameters.

### Key Features
* **Time Management**: Track task scope by specifying both `Estimated Hours` and `Actual Hours`.
* **Due Date Selector**: Native calendar date picker for scheduling task completion.
* **Tags & Categories**: Add a search category and comma-separated tags to keep roadmap elements highly discoverable.
* **Dynamic Subtask List**: Add, remove, and manage multiple subtasks inside a single parent task item.

### Screenshots

<img src="/assets/showcase/task-edit.png" alt="Task Creation & Editing Modal" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 4. Settings & Account Profile
A centralized preferences area for user profile updates, privacy control, and account termination.

### Key Features
* **Profile Summary**: Displays the signed-in user's primary information (such as email address).
* **Privacy Controls**: "Analytics & Telemetry" toggle switch allowing users to opt in or out of anonymous tracking.
* **Danger Zone**: A secure, multi-step confirmation area for deleting accounts. It features a check agreement statement to prevent accidental permanent deletion of task data.

### Screenshots

<img src="/assets/showcase/settings.png" alt="Account Settings Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

</div>

