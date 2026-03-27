import { AwsRum, AwsRumConfig, TelemetryEnum } from "aws-rum-web";

let rum: AwsRum | null = null;

export const initRum = () => {
  // 1. Global Kill Switch via Environment Variable
  if (process.env.NEXT_PUBLIC_ENABLE_RUM === "false") {
    console.log("RUM is globally disabled via environment variable.");
    return null;
  }

  // 2. User Opt-out Check
  if (typeof window !== "undefined") {
    const isOptedOut = localStorage.getItem("telemetry-opt-out") === "true";
    if (isOptedOut) {
      console.log("RUM is disabled by user preference.");
      return null;
    }
  }

  // 3. Prevent double initialization
  if (rum) return rum;

  try {
    const APPLICATION_ID = process.env.NEXT_PUBLIC_RUM_APPLICATION_ID || "";
    const APPLICATION_VERSION = "1.0.0";
    const APPLICATION_REGION = process.env.NEXT_PUBLIC_RUM_REGION || "";

    const config: AwsRumConfig = {
      sessionSampleRate: parseFloat(process.env.NEXT_PUBLIC_RUM_SAMPLE_RATE || "1"),
      // Note: guestRoleArn is omitted as it caused STS client errors (TypeError: split)
      // and is not strictly required when using identityPoolId.
      identityPoolId: process.env.NEXT_PUBLIC_RUM_IDENTITY_POOL_ID || undefined,
      endpoint: `https://dataplane.rum.${APPLICATION_REGION}.amazonaws.com`,
      telemetries: [TelemetryEnum.Errors, TelemetryEnum.Performance, TelemetryEnum.Http],
      allowCookies: true,
      enableXRay: true,
    };

    if (!APPLICATION_ID || !APPLICATION_REGION || !config.identityPoolId) {
      console.warn("CloudWatch RUM configuration incomplete. Skipping initialization.");
      return null;
    }

    rum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
    return rum;
  } catch (error) {
    console.error("Failed to initialize CloudWatch RUM:", error);
    return null;
  }
};

/**
 * Safely logs a custom event, respecting user's privacy preference.
 */
export const logEvent = (name: string, attributes?: Record<string, string | number | boolean>) => {
  if (rum) {
    rum.recordEvent(name, attributes || {});
  }
};
