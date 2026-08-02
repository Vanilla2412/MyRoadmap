<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# プライバシーポリシー (Privacy Policy)

最終更新日: 2026年8月2日

## 概要
当アプリケーションはユーザーのプライバシーを尊重します。パフォーマンスの監視およびユーザー体験向上のため、**AWS CloudWatch RUM** および **AWS X-Ray** を使用しています。

## 収集するデータ
以下の匿名テレメトリデータを収集します：
- ページロード速度
- クライアント側 JavaScript エラー
- 匿名セッション識別子
- ブラウザおよび端末タイプ

### 収集しないデータ (DO NOT collect):
- **個人識別情報 (PII)**: 氏名、メールアドレス、タスク内に含まれるデータ (タイトル、詳細等) は収集しません。
- **フォーム入力内容**: フォームに入力されたテキスト情報は記録しません。
- **機密データ**: トークンやIDの偶発的収集を防ぐため、URL パラメータはマスク処理されます。

## ユーザーの選択肢 (オプトアウト)
ユーザーは自身のデータに関して完全な制御権を持ちます。
- **グローバルオプトアウト**: アプリケーション内の **設定 (Settings)** ページからいつでもアナリティクスを無効化できます。
- **追跡防止**: オプトアウトした場合、ブラウザセッション内でトラッキングスクリプトは一切初期化されません。

## データの利用目的
収集されたデータは以下の目的でのみ使用されます：
- アプリケーションクラッシュのデバッグ。
- 低速なページロードの特定。
- 将来の開発ロードマップに向けた利用傾向の把握。

## お問い合わせ
プライバシーに関するご質問がある場合は、リポジトリ管理者までお問い合わせください。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Privacy Policy

Last updated: August 2, 2026

## Overview
We value your privacy. This application uses **AWS CloudWatch RUM** and **AWS X-Ray** to monitor performance and improve user experience.

## Data Collection
We collect anonymous telemetry data, which includes:
- Page load speeds
- Client-side JavaScript errors
- Anonymous session identifiers
- Browser and device types

### What we DO NOT collect:
- **Personally Identifiable Information (PII)**: We do not collect names, emails, or specific data stored in your tasks (titles, descriptions, etc.).
- **Form Inputs**: We do not record any text you type into forms.
- **Sensitive Data**: URL parameters are masked to prevent accidental collection of IDs or tokens.

## Your Choices (Opt-out)
You have full control over your data.
- **Global Opt-out**: You can disable analytics at any time via the **Settings** page in the application.
- **Do Not Track**: If you opt-out, no tracking scripts will be initialized in your browser session.

## Data Usage
Collected data is used solely for:
- Debugging application crashes.
- Identifying slow page loads.
- Understanding which features are most used to guide future development.

## Contact
If you have questions about our privacy practices, please contact the repository owner.

</div>

