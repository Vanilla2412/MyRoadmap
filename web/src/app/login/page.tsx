"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Hub } from "aws-amplify/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Inner component that reads search params and handles redirect after login.
 * Must be wrapped in Suspense because useSearchParams() requires it in Next.js.
 */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Listen for successful sign-in events from Amplify Auth
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        const redirectTo = searchParams.get("redirect");
        // Security: only allow internal paths (must start with "/" but not "//")
        const isInternalPath =
          redirectTo?.startsWith("/") && !redirectTo.startsWith("//");
        router.replace(isInternalPath ? redirectTo! : "/dashboard");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router, searchParams]);

  return <Authenticator />;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Suspense is required by Next.js when using useSearchParams() */}
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
