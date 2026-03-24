"use client";

import { useEffect } from "react";
import { initRum } from "@/lib/rum";

export default function RumProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize on the client side
    if (typeof window !== "undefined") {
      initRum();
    }
  }, []);

  return <>{children}</>;
}
