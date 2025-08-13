import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
console.log("MIDDLEWARE FIRED FOR:", req.nextUrl.pathname);
  // Routes that require a valid JWT (all students routes)
  const userProtectedRoutes = [
    "/api/students/read",
    "/api/students/readOne"
  ];

  // Routes that require valid JWT + isAdmin
  const adminOnlyRoutes = [
    "/api/students/create",
    "/api/students/update",
    "/api/students/delete"
  ];

  // Only run protection for these API routes
  if (
    userProtectedRoutes.some(route => pathname.startsWith(route)) ||
    adminOnlyRoutes.some(route => pathname.startsWith(route))
  ) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as { isAdmin?: boolean; email?: string };

      console.log("🔐 Decoded JWT in middleware:", decoded);

      // If route is admin-only, check role
      if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
        if (!decoded.isAdmin) {
          console.warn(`🚫 User ${decoded.email || ""} tried admin route without permission`);
          return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
        }
      }

      // Token valid → allow request
      return NextResponse.next();
    } catch (err) {
      console.error("❌ JWT verification failed:", err);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }
  }

  // Not a protected route → skip middleware
  return NextResponse.next();
}

// Wildcard matcher → matches ALL /api/students/* routes
export const config = {
  matcher: ["/api/:path*"], // explicitly match all API routes
};
