import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import * as budgets from 'aws-cdk-lib/aws-budgets';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

// Create a custom stack for Budget Alerts
const budgetStack = backend.createStack('BudgetAlertStack');

// Use environment variable for the notification email
// This can be set in the Amplify Console -> App Settings -> Environment Variables
const notificationEmail = process.env.BUDGET_NOTIFICATION_EMAIL || 'owner@example.com';

new budgets.CfnBudget(budgetStack, 'MyRoadmapMonthlyBudget', {
  budget: {
    budgetName: 'MyRoadmapMonthlyBudget',
    budgetType: 'COST',
    timeUnit: 'MONTHLY',
    budgetLimit: {
      amount: 5, // $5 budget
      unit: 'USD',
    },
  },
  notificationsWithSubscribers: [
    {
      notification: {
        comparisonOperator: 'GREATER_THAN',
        notificationType: 'ACTUAL',
        threshold: 100, // 100% of $5
        thresholdType: 'PERCENTAGE',
      },
      subscribers: [
        {
          address: notificationEmail,
          subscriptionType: 'EMAIL',
        },
      ],
    },
    {
      notification: {
        comparisonOperator: 'GREATER_THAN',
        notificationType: 'FORECASTED',
        threshold: 100, // 100% of $5 forecasted
        thresholdType: 'PERCENTAGE',
      },
      subscribers: [
        {
          address: notificationEmail,
          subscriptionType: 'EMAIL',
        },
      ],
    },
  ],
});



