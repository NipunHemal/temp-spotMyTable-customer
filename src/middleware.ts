import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const url = request.nextUrl.clone();

    // Define the settings route pattern
    const settingsPathPattern = /^\/settings(\/.*)?$/;

    // Check if the current path matches the settings route pattern
    if (settingsPathPattern.test(url.pathname)) {
      // If the user is not authenticated, redirect to the home page
      if (!request.nextauth.token) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    // If authenticated or not accessing the settings route, allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    // Use the secret from environment variables
    secret: process.env.NEXTAUTH_SECRET,
    // Disable redirecting to the sign-in page
    pages: {
      signIn: "/", // Redirect to home page instead of sign-in page
    },
  }
);

// Apply middleware specifically to the /settings route and any sub-routes
export const config = {
  matcher: ["/settings/:path*"],
};
