# Troubleshooting AWS Cognito User Pool Visibility Mismatch

## Context

When running local development with \`npx ampx sandbox\`, you may find that users created in your local app don't appear in the AWS Cognito Console, or the User Pool seems to have 0 users. This typically happens because the console is looking at the wrong Account, Region, or Sandbox instance.

## Verification Steps

### 1. Verify your local AWS Identity

Check which AWS account and Region your local development is targeting. Open your terminal and run:

\`\`\`bash
aws sts get-caller-identity
aws configure get region
\`\`\`

Ensure the \`Account\` from the first command and the Region from the second command match the Account and Region you are logged into in the AWS Console.

### 2. Identify the Active User Pool ID

The exact User Pool ID that your application is using is generated dynamically by Amplify and saved in your \`amplify_outputs.json\` file.

Look in \`web/amplify_outputs.json\` and find the \`auth.user_pool_id\` property.

\`\`\`json
{
"auth": {
"user_pool_id": "ap-northeast-1_xxxxxxxxx",
...
}
}
\`\`\`

### 3. Check the Correct User Pool in the Console

1. Log into the AWS Management Console with the account ID verified in step 1.
2. Switch your AWS Console to the correct Region (e.g., \`ap-northeast-1\`).
3. Navigate to **Amazon Cognito** > **User Pools**.
4. Search or look for the exact User Pool ID you found in step 2.

If you don't see the User Pool ID, verify you are not looking at an older sandbox or another developer's sandbox instance. Amplify sandbox scopes resources by your local username (e.g., \`amplify-admin\` or your computer username).
