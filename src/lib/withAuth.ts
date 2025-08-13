import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function withAuth(handler: Function, { adminOnly = false } = {}) {
  return async (req: Request) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as { isAdmin?: boolean };

      if (adminOnly && !decoded.isAdmin) {
        return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
      }

      // Pass the decoded token to the handler
      return handler(req, decoded);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }
  };
}
