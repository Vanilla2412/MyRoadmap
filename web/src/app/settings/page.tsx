"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserAttributes, signOut, deleteUser } from "aws-amplify/auth";
import { logEvent } from "@/lib/rum";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/dashboard/Header";
import { toast } from "sonner";
import { ArrowLeft, User, AlertTriangle, LogOut } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTelemetryEnabled, setIsTelemetryEnabled] = useState(true);

  useEffect(() => {
    // Load telemetry preference
    const savedPreference = localStorage.getItem("telemetry-opt-out");
    setIsTelemetryEnabled(savedPreference !== "true");
    const loadUser = async () => {
      try {
        const attrs = await fetchUserAttributes();
        setUserEmail(attrs.email ?? null);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  const handleTelemetryChange = (enabled: boolean) => {
    setIsTelemetryEnabled(enabled);
    localStorage.setItem("telemetry-opt-out", (!enabled).toString());
    toast.success(enabled ? "Analytics enabled" : "Analytics disabled");
  };

  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      logEvent('user_signout');
      router.push("/login");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      logEvent('user_account_deleted');
      toast.success("Account deleted successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to delete account");
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn("min-h-screen bg-gray-50 flex flex-col")}>
      <Header />
      
      <main className={cn("flex-1 max-w-3xl mx-auto w-full px-4 pt-8 pb-12")}>
        <Button 
          variant="ghost" 
          onClick={() => router.push("/dashboard")} 
          className="mb-6 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Account Profile</h2>
                <p className="text-sm text-gray-500">Your personal information</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</label>
                <p className="mt-1 text-gray-900 font-medium">
                  {isLoadingUser ? "Loading..." : userEmail || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-gray-900">Analytics & Telemetry</h3>
                  <p className="text-xs text-gray-500">Help us improve the app by sharing anonymous usage data.</p>
                </div>
                <Switch 
                  checked={isTelemetryEnabled}
                  onCheckedChange={handleTelemetryChange}
                />
              </div>

              <Button variant="outline" onClick={handleSignOut} className="text-gray-700">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </section>

          {/* Danger Zone Section */}
          <section className={cn(
            "bg-white p-6 rounded-lg border border-red-200 shadow-sm overflow-hidden relative"
          )}>
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Danger Zone</h2>
                <p className="text-sm text-gray-500">Irreversible actions for your account</p>
              </div>
            </div>

            <div className="bg-red-50/50 rounded-md p-4 mb-6 border border-red-100">
              <h3 className="text-sm font-semibold text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. All your tasks, settings, and roadmap data will be permanently removed from our servers.
              </p>
              
              <div className="flex items-start space-x-3 mb-6">
                <Checkbox 
                  id="agree" 
                  checked={isAgreed} 
                  onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                  className="mt-1"
                />
                <label 
                  htmlFor="agree" 
                  className="text-sm font-medium text-red-900 leading-tight cursor-pointer select-none"
                >
                  I understand that deleting my account is permanent and all my data will be irrecoverably lost.
                </label>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    disabled={!isAgreed || isDeleting}
                    className="w-full sm:w-auto"
                  >
                    {isDeleting ? "Deleting..." : "Delete My Account"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      Permanently Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
