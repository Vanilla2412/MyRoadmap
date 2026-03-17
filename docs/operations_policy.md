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
