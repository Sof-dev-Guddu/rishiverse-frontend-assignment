import { NextResponse } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });

  try {
    const { data } = await axios.get(`${process.env.MOCKAPI_URL}/users?email=${encodeURIComponent(email)}`);
    const user = Array.isArray(data) ? data[0] : data;
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

   const token = signToken({ id: user.id, email: user.email, isAdmin: user.isAdmin, name: user.name });
 return NextResponse.json({ token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, name: user.name } });

  } catch (err) {
    return NextResponse.json({ error: "Login error" }, { status: 500 });
  }
}
