import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import amplifyOutputs from "../amplify_outputs.json";

// Initialize the Amplify server runner once
const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyOutputs,
});

/**
 * Public routes that do NOT require authentication.
 * Everything else is protected by default (deny-by-default).
 */
const PUBLIC_ROUTES = ["/login"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes without auth check
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Deny-by-default: all other routes require authentication
  const response = NextResponse.next();

  let isAuthenticated = false;

  try {
    isAuthenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        const session = await fetchAuthSession(contextSpec);
        return !!session.tokens;
      },
    });
  } catch {
    // If session check fails, treat as unauthenticated
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the original URL as a redirect parameter after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - static assets (svg, png, jpg, jpeg, gif, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
