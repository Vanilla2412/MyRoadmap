<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# 財務コスト試算および試算分析 (Financial Cost Estimation)

本ドキュメントは、「My Roadmap」アプリケーションにおける AWS 運用コストの内訳試算を提供します。MVPフェーズおよび AWS 無料利用枠（Free Tier）を超過した後の移行ポイントに焦点を当てています。

## 1. AWS サービス別コスト内訳 (MVP規模)

適度なタスク管理アクティビティを行う月間アクティブユーザー数約 100人 (100 MAU) を想定。

| サービス名 | コンポーネント | 無料利用枠 (Free Tier) | 推定月額コスト (無料枠超過後) |
| :--- | :--- | :--- | :--- |
| **AWS Amplify** | ホスティング & ビルド | 月 1,000 ビルド分, 5GB ストレージ, 15GB 転送量 | ビルド $0.01/分, ストレージ $0.023/GB, 転送量 $0.15/GB |
| **AWS Cognito** | 認証機能 | 月 50,000 MAU | 50,000 MAU 超過分 $0.0055/MAU |
| **Amazon DynamoDB** | データストレージ | 25GB ストレージ, 25 WCU/RCU | ストレージ ~$0.25/GB, 100万書き込み ~$1.25 (オンデマンド) |
| **AWS AppSync** | GraphQL API | 月 250,000 クエリ (最初の12か月) | 100万クエリあたり $4.00 |
| **CloudWatch** | ログ & メトリクス | 5GB ログ, 3 ダッシュボード, 10 アラーム | 5GB 超過分 $0.50/GB |

## 2. 推定月額合計コスト

- **AWS 無料利用枠内**: **$0.00**
- **無料枠わずかに超過時 (小規模運用)**: **$5.00 未満**
- **成長フェーズ (1,000+ ユーザー)**: **$10.00 - $30.00** (主に Amplify データ転送量および AppSync クエリ数による)

## 3. コストのしきい値と最適化戦略

### コスト影響の大きいしきい値
- **Amplify データ転送量**: 大容量画像アセットや高トラフィックにより 15GB 無料枠を早期消費するリスク。
- **AppSync クエリボリューム**: 高頻度のポーリングを行う複雑なフロントエンドは最適化が必要。

### 最適化戦略
- **ログ保持期間**: CloudWatch ログの保持期間を 14日 に制限しストレージ費用を抑制。
- **DynamoDB キャパシティ**: 予想しにくいトラフィックにはオンデマンドキャパシティを使用。
- **Amplify ビルド**: ビルドスクリプトを最適化し、デプロイごとのビルド時間を 5分以内 に保持。

## 4. ステークホルダー向け要約

本プロジェクトは極めて費用対効果が高く設計されており、開発および初期運用フェーズ全体を通じて **AWS 無料利用枠** 内に収まります。AWS Budgets による継続的モニタリングにより、予期せぬスケールや設定ミスを早期発見します。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Financial Cost Estimation and Analysis

This document provides a breakdown of the estimated operating costs for "My Roadmap" on AWS, focusing on the MVP phase and transition points beyond the AWS Free Tier.

## 1. AWS Service Cost Breakdown (MVP Scale)

Estimated for ~100 monthly active users (MAU) with moderate task management activity.

| Service | Component | Free Tier Coverage | Estimated Monthly Cost (Post-Free Tier / Over Limit) |
| :--- | :--- | :--- | :--- |
| **AWS Amplify** | Hosting & Build | 1,000 build mins/mo, 5GB storage, 15GB transfer | $0.01 per build min, $0.023/GB storage, $0.15/GB transfer |
| **AWS Cognito** | Authentication | 50,000 MAUs per month | $0.0055 per MAU beyond 50,000 |
| **Amazon DynamoDB** | Data Storage | 25GB Storage, 25 WCU/RCU (Provisioned) | ~$0.25 per GB, ~$1.25 per million write units (On-Demand) |
| **AWS AppSync** | GraphQL API | 250,000 queries/mo (first 12 months) | $4.00 per million queries |
| **CloudWatch** | Logs & Metrics | 5GB logs, 3 dashboards, 10 alarms | $0.50 per GB ingested beyond 5GB |

## 2. Total Estimated Monthly Cost

- **Under AWS Free Tier**: **$0.00**
- **Slightly Beyond Free Tier (Small Scale)**: **<$5.00**
- **Growth Phase (1,000+ users)**: **$10.00 - $30.00** (primarily driven by Amplify data transfer and AppSync queries)

## 3. Cost Transition Points & Optimization

### High-Impact Thresholds
- **Amplify Data Transfer**: Large image assets or high traffic can quickly exceed the 15GB free tier.
- **AppSync Query Volume**: Complex frontends with frequent polling can hit the 250k limit if not optimized.

### Optimization Strategies
- **Log Retention**: Limit CloudWatch log retention to 14 days to avoid storage costs.
- **DynamoDB Capacity**: Use On-Demand capacity for unpredictable traffic to pay only for what is used.
- **Amplify Builds**: Optimize build scripts to keep build times under 5 minutes per deployment.

## 4. Summary for Stakeholders

The project is designed to be highly cost-effective, remaining within the **AWS Free Tier** for the entire development and initial launch phase. Ongoing monitoring via AWS Budgets will ensure that any unexpected scaling or misconfiguration is caught before significant charges are incurred.

</div>

