<script setup>
import { useLanguage } from './.vitepress/theme/composables/useLanguage'

const { currentLang } = useLanguage()
</script>

<div v-if="currentLang === 'ja'" class="lang-content ja-content">

# AWS Amplify ホスティングおよびベーシック認証セットアップ手順 (AWS Amplify Hosting Setup)

本ガイドは、Next.js フロントエンドおよび Amplify Gen 2 バックエンドを AWS Amplify ホスティング経由でデプロイし、ベーシック認証（Basic Authentication）で保護する手順をまとめたものです。

## 1. AWS Amplify へのリポジトリ接続

1. AWS マネジメントコンソールにログインし、**AWS Amplify** に移動します。
2. **新しいアプリを作成 (Create new app)** または **アプリをデプロイ** をクリック。
3. **GitHub** を選択し、AWS Amplify にリポジトリへのアクセス権限を授与します。
4. 対象リポジトリ (`anti00`) および対象ブランチ (`main`) を選択。
5. ビルド設定にて、Amplify がルートディレクトリにある `amplify.yml` を自動検出することを確認。
6. フロントエンドと共にバックエンドリソースをデプロイするオプションを選択し、適切な IAM サービスロールを割り当てます。
7. **保存してデプロイ** をクリックし、ビルド・デプロイの完了を待ちます。

## 2. ベーシック認証 (アクセス制御) の設定

開発段階での一般公開を防ぐため、アクセス制御を有効化します。

1. AWS Amplify Console にて作成したアプリを開きます。
2. 左サイドバーから **ホスティング (Hosting)** > **アクセス制御 (Access control)** をクリック。
3. **アクセス管理 (Manage access)** をクリック。
4. アクセス設定を「一般公開 (Publicly viewable)」から **「アクセス制限 (Restrict access)」** に変更。
5. 認証用の **ユーザー名 (Username)** と **パスワード (Password)** を入力。
6. **保存 (Save)** をクリック。

## 3. 動作検証 (Verification)

1. 設定保存後、発行されたライブ URL (`https://main.xxxxxx.amplifyapp.com`) にアクセス。
2. ブラウザがユーザー名とパスワードの入力を求めてくることを確認。
3. 設定した資格情報を入力し、ログイン後に以下を確認：
   - タスクダッシュボードが正常にロードされること。
   - Cognito による認証および AppSync/Amplify Data API 経由のデータ取得が正常に動作すること。

</div>

<div v-if="currentLang === 'en'" class="lang-content en-content">

# AWS Amplify Hosting & Basic Authentication Setup

This guide details how to deploy the Next.js frontend and Amplify Gen 2 backend via AWS Amplify Hosting and secure it using Basic Authentication. This fulfills the requirements of Issue #35.

## 1. Connect Repository to AWS Amplify

1. Log in to the AWS Management Console and navigate to **AWS Amplify**.
2. Click **Create new app** or **Deploy an app**.
3. Select **GitHub** and authorize AWS Amplify to access your repositories.
4. Choose the repository (e.g., `anti00`) and the branch (e.g., `main`).
5. In the Build Settings, Amplify should automatically detect the `amplify.yml` file located in the root directory. If not, verify that the App root is set to `web` if required by the console UI.
6. Check the **"Deploy updates to backend resources with your frontend"** option (if available) and select a service role that has administrative permissions for Amplify Gen 2.
7. Save and deploy. Wait for the build, test, and deploy stages to complete.

## 2. Configure Basic Authentication (Access Control)

To prevent unauthorized public access to the MVP during development, you must enable Basic Authentication on the hosted environment.

1. In the AWS Amplify Console, navigate to your newly created application.
2. On the left sidebar, click on **Hosting** > **Access control**.
3. Click **Manage access**.
4. Change the Access Setting from "Publicly viewable" to **"Restrict access"**.
5. Provide a **Username** and **Password** for the authentication.
6. (Optional) You can apply this globally to all branches, or specifically to the `main` branch.
7. Click **Save**.

## 3. Verification

1. Once the Access control settings are saved, navigate to the live URL of your branch (e.g., `https://main.xxxxxx.amplifyapp.com`).
2. The browser will immediately prompt you for a username and password.
3. Enter the credentials you configured in Step 2.
4. After successfully logging in, verify that:
   - The Task Dashboard loads correctly.
   - Protected Next.js routes operate as expected.
   - You can log in with Cognito and fetch data through the AppSync/Amplify Data API.

</div>

