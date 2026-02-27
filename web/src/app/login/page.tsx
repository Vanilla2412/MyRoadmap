"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Authenticator />
      </div>
    </div>
  );
}
