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
