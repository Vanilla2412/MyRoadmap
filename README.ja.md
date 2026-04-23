# My Roadmap 🚀

> 学習タスクを体系的に追跡・管理するためのモダンな学習管理アプリケーション

**[English README is available here](./README.md) | [英語版 README](./README.md)**

📖 **[オンラインドキュメント（LIVE）](https://vanilla2412.github.io/MyRoadmap/)**
迫力あるMermaid図解や詳細な要件定義書を確認できます。

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS-Amplify_Gen_2-orange)](https://aws.amazon.com/amplify/)

---

## 📋 概要

**My Roadmap** は、最新のWeb技術とAWSクラウドインフラを使用して構築されたフルスタック学習タスク管理アプリケーションです。優先度管理、カテゴリ分類、期限追跡などの機能を備え、学習タスクの作成、整理、追跡を可能にします。

### このプロジェクトが示すもの:

- ✅ **モダンフロントエンド**: Next.js App Router + TypeScript + Tailwind CSS
- ✅ **クラウドネイティブバックエンド**: AWS Amplify Gen 2（Infrastructure as Code）
- ✅ **サーバーレスアーキテクチャ**: AWS AppSync（GraphQL）、DynamoDB、Cognito
- ✅ **ベストプラクティス**: 型安全性、セキュリティファースト設計、包括的なドキュメント

🔗 **ライブデモ**: デプロイ済み（AWS Amplify）

### プロジェクトの目的

1. **技術習得**: 最新のWeb技術（Next.js App Router、TypeScript、AWS Amplify Gen 2）を実践的に学ぶ
2. **開発スキル向上**: プロフェッショナルなコード品質と包括的なドキュメント作成を実践

---

## 🛠️ 技術スタック

### フロントエンド

- **フレームワーク**: [Next.js](https://nextjs.org/)（App Router）
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **UIコンポーネント**: [shadcn/ui](https://ui.shadcn.com/)

### バックエンド & インフラ

- **IaC**: [AWS Amplify Gen 2](https://docs.amplify.aws/)（TypeScriptベース）
- **認証**: [Amazon Cognito](https://aws.amazon.com/jp/cognito/)
- **データベース**: [Amazon DynamoDB](https://aws.amazon.com/jp/dynamodb/)
- **API**: [AWS AppSync](https://aws.amazon.com/jp/appsync/)（GraphQL）

### CI/CD

- **バージョン管理**: GitHub
- **パイプライン**: GitHub Actions

---

## ✨ 機能（Phase 1 - MVP）

### コアタスク管理

- ✅ **CRUD操作**: 学習タスクの作成、読み取り、更新、削除
- ✅ **タスクプロパティ**: タイトル、ステータス、優先度、期限、カテゴリ
- ✅ **ステータス追跡**: 未着手 → 進行中 → 完了
- ✅ **優先度レベル**: 高、中、低

### 整理 & フィルタリング

- ✅ ステータス、優先度、カテゴリによるタスクフィルタリング
- ✅ 期限と優先度によるタスクソート
- ✅ ビジュアルステータスインジケーターと期限ハイライト

### セキュリティ & 認証

- ✅ AWS Cognito認証（メール認証付き）
- ✅ パスワード複雑性要件の強制
- ✅ JWTベースの認可
- ✅ 行レベルセキュリティ（ユーザーは自分のタスクのみアクセス可能）

---

## 🚀 はじめ方

### 前提条件

- **Node.js**: v18.17以上
- **npm**: v9以上
- **AWSアカウント**: バックエンドインフラのデプロイ用（ローカル開発では任意）

### インストール

1. **リポジトリのクローン**

   ```bash
   git clone https://github.com/Vanilla2412/MyRoadmap.git
   cd MyRoadmap
   ```

2. **ルート依存関係のインストール（ドキュメント用）**

   ```bash
   npm install
   ```

3. **アプリケーション本体の依存関係のインストール**

   ```bash
   cd web
   npm install
   ```

### アプリケーションの実行

ローカル環境で AWS Amplify Sandbox と共に実行する場合：

```bash
# プロジェクトルートから
cd web

# 1. Amplify Sandbox の起動（AWSアカウントの設定が必要）
npx ampx sandbox

# 2. Next.js 開発サーバーの起動（別ターミナルで実行）
npm run dev
```

### テストの実行

```bash
# プロジェクトルートから全てのテストを実行
npm test

# または web アプリケーションのみ
cd web && npm test
```

## 📁 プロジェクト構造

```
MyRoadmap/
├── web/                       # Next.js アプリケーション（メイン）
│   ├── src/components/       # UI コンポーネント & テスト
│   ├── src/app/              # Next.js App Router ページ
│   └── package.json          # アプリ固有の依存関係
├── docs/                      # VitePress ドキュメント
│   ├── .vitepress/           # VitePress 設定
│   └── requirements.md       # 要件定義書
├── package.json              # ルート依存関係（ドキュメント・ツール用）
├── README.md                 # 英語版 README
├── README.ja.md              # このファイル（日本語版）
└── ampx.toml                 # Amplify 設定
```

---

## 📚 ドキュメント

VitePressによる包括的なプロジェクトドキュメントが利用可能です：

- **要件仕様書**: [`docs/requirements.md`](./docs/requirements.md) を参照
- **システムアーキテクチャ**: 詳細な図とデータフロー
- **API設計**: GraphQLスキーマとリゾルバー仕様
- **セキュリティガイドライン**: 認証、認可、ベストプラクティス

ローカルでドキュメントを閲覧するには：

```bash
npm run docs:dev
```

---

## 🗺️ ロードマップ

### Phase 1 - MVP ✅（完了）

- [x] 包括的な要件定義
- [x] Next.jsアプリケーションのスキャフォールド
- [x] AWS Amplify Gen 2バックエンドの実装
- [x] タスク管理UIの構築
- [x] AWSへのデプロイ

### Phase 2 - 高度な機能 🔮

- [ ] サブタスク・ネストされたタスク
- [ ] 時間追跡（見積もり時間 vs 実績時間）
- [ ] 学習リソース（URL、添付ファイル）
- [ ] 進捗分析とインサイト
- [ ] 多要素認証（MFA）

完全な機能ロードマップは [`docs/requirements.md`](./docs/requirements.md) をご覧ください。

---

## 🤝 コントリビューション

このプロジェクトはプロフェッショナルなポートフォリオを目的としています。フィードバックは歓迎しますが、標準的なオープンソースコミュニティのガイドラインに従います。

開始前に[コントリビューションガイド](./CONTRIBUTING.md)を確認してください。

- [コントリビューションガイド (Contributing)](./CONTRIBUTING.md)
- [行動規範 (Code of Conduct)](./CODE_OF_CONDUCT.md)
- [セキュリティポリシー (Security Policy)](./SECURITY.md)

---

## 📌 バージョニング

このプロジェクトは [Semantic Versioning (SemVer)](https://semver.org/lang/ja/) に準拠しています。
プルリクエストのラベルに基づき、[Release Drafter](https://github.com/release-drafter/release-drafter) を使用してリリースノートを自動生成しています。

---

## 📄 ライセンス

このプロジェクトは **MIT License** の下でライセンスされています。詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

---

## 👤 作成者

**Vanilla2412**

- GitHub: [@Vanilla2412](https://github.com/Vanilla2412)
- プロジェクトリンク: [https://github.com/Vanilla2412/MyRoadmap](https://github.com/Vanilla2412/MyRoadmap)

---

**Built with ❤️ and modern web technologies**
