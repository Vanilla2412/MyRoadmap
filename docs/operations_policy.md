<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# AWS コスト設計および運用ポリシー (AWS Cost & Operations Policy)

本ポリシーは、「My Roadmap」における AWS 運用コストの管理手順、リソースのクリーン状態保持（ハイジーン）、および事業継続性（DR/バックアップ）に関する運用指針を定めるものです。

## 1. AWS 予算アラート (AWS Budget Alerts)

予期せぬ請求を防ぐため、バックエンドの AWS CDK 経由で予算アラートが事前設定されています。

| アラート名 | しきい値 (USD) | 判定基準タイプ | 状態 |
| :--- | :--- | :--- | :--- |
| **月間予算 (Monthly Budget)** | $5.00 | 実績 (100%) | **自動化 (CDK)** |
| **予測アラート (Forecasted Alert)** | $5.00 | 予測 (100%) | **自動化 (CDK)** |

### 設定構造 (自動化)
アラートは `web/amplify/backend.ts` 内で `aws-cdk-lib/aws-budgets` を使用して定義されています。

### 通知宛先 Eメールの設定手順
通知用 Eメールアドレスは環境変数 **`BUDGET_NOTIFICATION_EMAIL`** から取得されます。

**設定手順:**
1. **AWS Amplify Console** にログイン。
2. 対象アプリを選択 -> **App settings (アプリ設定)** -> **Environment variables (環境変数)**。
3. **Manage variables (変数の管理)** をクリックし、以下を追加：
   - 変数名: `BUDGET_NOTIFICATION_EMAIL`
   - 値: `your-email@example.com`
4. アプリケーションを再デプロイして変更を適用。

---

## 2. コストモニタリング戦略

- **月次レビュー**: 毎月最初の月曜日に AWS Cost Explorer の月次レポートを確認。
- **異常検知**: AppSync クエリ量や DynamoDB の読み書きキャパシティにおける異様なスパイクの有無を確認。
- **リソースタグ付け**: コスト配分を追跡するため、すべてのプロジェクトリソースに `Project: MyRoadmap` タグを付与。

## 3. リソース管理とクリーンネス (Hygiene)

### CloudWatch ログ
- **保持ポリシー**: Amplify/Lambda によって作成された全ロググループの保持期間を **14日** に設定。
- **理由**: 標準ログはトラブルシューティングのみに必要なため、長期保存による不要なコストをカット。

### データベース運用
- **DynamoDB バックアップ**: 本番環境の `Task` テーブルに対して **Points-in-Time Recovery (PITR)** を有効化。
- **クリーンアップ**: 未使用の S3 バケットや Amplify の検証用プレビューブランチを定期的に点検・削除。

## 4. 障害復旧 (DR) およびバックアップ戦略

| コンポーネント | 復旧戦略 | 目標復旧時点 (RPO) |
| :--- | :--- | :--- |
| **フロントエンド** | コードベース復旧 (GitHub Actions 再デプロイ) | < 1時間 |
| **バックエンド API** | IaC 復旧 (Amplify Gen 2 / CDK) | < 1時間 |
| **データベース** | DynamoDB PITR (継続的バックアップ) | 1秒 |

### 復旧手順 (Disaster Recovery Procedure)
リージョン障害または誤削除が発生した場合：
1. `npx ampx pipeline-deploy` (または GitHub Actions) 経由でバックエンドを再デプロイ。
2. AWS Console の Point-in-Time バックアップから最新の DynamoDB テーブルを復元。
3. エンドポイント URL が変更された場合、フロントエンドの `amplify_outputs.json` を更新。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# AWS Cost Design and Operations Policy

This policy outlines the procedures and configurations for managing AWS costs, resource hygiene, and business continuity for "My Roadmap".

## 1. AWS Budget Alerts

To prevent unexpected charges, budget alerts are configured via AWS CDK in the backend.

| Alert Name | Threshold (USD) | Type | Status |
| :--- | :--- | :--- | :--- |
| **Monthly Budget** | $5.00 | Actual (100%) | **Automated (CDK)** |
| **Forecasted Alert** | $5.00 | Forecasted (100%) | **Automated (CDK)** |

### Configuration (Automated)
The alerts are defined in `web/amplify/backend.ts` using `aws-cdk-lib/aws-budgets`. 

### Setting the Notification Email
The notification email is retrieved from the environment variable **`BUDGET_NOTIFICATION_EMAIL`**.

**How to set it:**
1. Log in to the **AWS Amplify Console**.
2. Select your app -> **App settings** -> **Environment variables**.
3. Click **Manage variables** and add:
   - Variable: `BUDGET_NOTIFICATION_EMAIL`
   - Value: `your-email@example.com`
4. Re-deploy the application for the changes to take effect.


## 2. Cost Monitoring Strategy

- **Monthly Review**: On the first Monday of every month, review the AWS Cost Explorer monthly report.
- **Anomaly Detection**: Check for unusual spikes in AppSync query volume or DynamoDB read/write capacity.
- **Tagging**: Ensure all project resources are tagged with `Project: MyRoadmap` for accurate cost allocation (handled by Amplify Gen 2 default tagging).

## 3. Resource Management & Hygiene

### CloudWatch Logs
- **Retention Policy**: All log groups created by Amplify/Lambda must have a retention period of **14 days**.
- **Reasoning**: Standard logs are only needed for immediate troubleshooting; long-term storage adds unnecessary costs.

### Database Operations
- **DynamoDB Backups**: Enable **Point-in-Time Recovery (PITR)** for the production `Task` table.
- **Cleanup**: Regularly review and delete unused S3 buckets or Amplify playground branches.

## 4. Disaster Recovery (DR) & Backup

| Component | Strategy | Recovery Point Objective (RPO) |
| :--- | :--- | :--- |
| **Frontend** | Code-based (GitHub Actions Redeploy) | < 1 hour |
| **Backend API** | IaC (Amplify Gen 2 / CDK) | < 1 hour |
| **Database** | DynamoDB PITR (Continuous Backup) | 1 second |

### Recovery Procedure
In case of regional failure or accidental deletion:
1. Re-deploy the backend using `npx ampx pipeline-deploy` (or via GitHub Actions).
2. Restore the DynamoDB table from the latest Point-in-Time backup in the AWS Console.
3. Update the `amplify_outputs.json` in the frontend if endpoint URLs change.

</div>

