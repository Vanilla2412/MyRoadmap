import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { mockRunWithAmplifyServerContext } = vi.hoisted(() => {
  return {
    mockRunWithAmplifyServerContext: vi.fn(),
  };
});

vi.mock("@aws-amplify/adapter-nextjs", () => ({
  createServerRunner: () => ({
    runWithAmplifyServerContext: mockRunWithAmplifyServerContext,
  }),
}));

vi.mock("aws-amplify/auth/server", () => ({
  fetchAuthSession: vi.fn(),
}));

import { middleware } from "./middleware";

describe("Middleware authentication gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow public routes like /login without checking auth", async () => {
    const req = new NextRequest("http://localhost:3000/login");
    const res = await middleware(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(mockRunWithAmplifyServerContext).not.toHaveBeenCalled();
  });

  it("should redirect unauthenticated users accessing protected routes to /login", async () => {
    mockRunWithAmplifyServerContext.mockResolvedValue(false);

    const req = new NextRequest("http://localhost:3000/dashboard");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login");
    expect(location).toContain("redirect=%2Fdashboard");
  });

  it("should allow authenticated users with valid session tokens to pass through", async () => {
    mockRunWithAmplifyServerContext.mockResolvedValue(true);

    const req = new NextRequest("http://localhost:3000/dashboard");
    const res = await middleware(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(mockRunWithAmplifyServerContext).toHaveBeenCalledOnce();
  });

  it("should treat failed auth session checks as unauthenticated and redirect", async () => {
    mockRunWithAmplifyServerContext.mockRejectedValue(new Error("Auth error"));

    const req = new NextRequest("http://localhost:3000/dashboard");
    const res = await middleware(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login");
  });
});
