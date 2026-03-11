"use client";

import { useState, useEffect } from "react";
import { signOut, fetchUserAttributes } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const attrs = await fetchUserAttributes();
        setUserEmail(attrs.email ?? null);
      } catch {
        // Graceful degradation: sign out still works even if email fetch fails
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">My Roadmap</h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoadingUser ? (
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse hidden sm:block" />
            ) : userEmail ? (
              <span className="text-sm text-gray-600 hidden sm:block truncate max-w-[200px]">
                {userEmail}
              </span>
            ) : null}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-9 px-4 py-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
