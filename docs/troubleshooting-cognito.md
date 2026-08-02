<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# AWS Cognito User Pool 表示ミスマッチのトラブルシューティング

## 背景・概要

`npx ampx sandbox` を使用してローカル開発を行っている際、アプリ上で作成したユーザーが AWS Cognito コンソールに表示されない、または User Pool のユーザー数が 0 と表示される現象が発生することがあります。これは通常、コンソール側で異なる AWS アカウント、リージョン、あるいは別の sandbox インスタンスを参照していることが原因です。

## 確認・検証手順

### 1. ローカルの AWS アイデンティティを確認する

ローカル開発環境がどのアカウントおよびリージョンをターゲットにしているか確認します。ターミナルで以下を実行します：

```bash
aws sts get-caller-identity
aws configure get region
```

1つ目のコマンドの `Account` ID および 2つ目のコマンドのリージョンが、AWS Console でログインしているアカウントおよびリージョンと一致していることを確認してください。

### 2. アクティブな User Pool ID を特定する

アプリケーションが現在使用している正確な User Pool ID は Amplify によって動的に生成され、`amplify_outputs.json` ファイルに保存されています。

`web/amplify_outputs.json` を開き、`auth.user_pool_id` プロパティを確認します。

```json
{
  "auth": {
    "user_pool_id": "ap-northeast-1_xxxxxxxxx"
  }
}
```

### 3. コンソール上で正しい User Pool を確認する

1. ステップ 1 で確認したアカウント ID で AWS マネジメントコンソールにログイン。
2. コンソールのリージョンを正しいリージョン (例: `ap-northeast-1`) に切り替え。
3. **Amazon Cognito** > **ユーザープール (User Pools)** に移動。
4. ステップ 2 で確認した正確な User Pool ID を検索して確認。

該当する User Pool ID が見つからない場合は、過去の古い sandbox や他の開発者の sandbox インスタンスを参照していないか確認してください。Amplify sandbox は、PC のユーザー名 (例: `amplify-admin` やローカルユーザー名) ごとにリソースを分離します。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# Troubleshooting AWS Cognito User Pool Visibility Mismatch

## Context

When running local development with `npx ampx sandbox`, you may find that users created in your local app don't appear in the AWS Cognito Console, or the User Pool seems to have 0 users. This typically happens because the console is looking at the wrong Account, Region, or Sandbox instance.

## Verification Steps

### 1. Verify your local AWS Identity

Check which AWS account and Region your local development is targeting. Open your terminal and run:

```bash
aws sts get-caller-identity
aws configure get region
```

Ensure the `Account` from the first command and the Region from the second command match the Account and Region you are logged into in the AWS Console.

### 2. Identify the Active User Pool ID

The exact User Pool ID that your application is using is generated dynamically by Amplify and saved in your `amplify_outputs.json` file.

Look in `web/amplify_outputs.json` and find the `auth.user_pool_id` property.

```json
{
  "auth": {
    "user_pool_id": "ap-northeast-1_xxxxxxxxx"
  }
}
```

### 3. Check the Correct User Pool in the Console

1. Log into the AWS Management Console with the account ID verified in step 1.
2. Switch your AWS Console to the correct Region (e.g., `ap-northeast-1`).
3. Navigate to **Amazon Cognito** > **User Pools**.
4. Search or look for the exact User Pool ID you found in step 2.

If you don't see the User Pool ID, verify you are not looking at an older sandbox or another developer's sandbox instance. Amplify sandbox scopes resources by your local username (e.g., `amplify-admin` or your computer username).

</div>

