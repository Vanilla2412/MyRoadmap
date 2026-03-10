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
