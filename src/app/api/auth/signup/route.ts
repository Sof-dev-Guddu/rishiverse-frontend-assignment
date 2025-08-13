import { NextResponse } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    let existing: any[] = [];

    try {
      const res = await axios.get(`${process.env.MOCKAPI_URL}/users`, {
        params: { email: normalizedEmail },
      });
      existing = res.data;
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // No user found — MockAPI returns 404
        existing = [];
      } else {
        throw err; // Other errors should still break
      }
    }

    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser } = await axios.post(`${process.env.MOCKAPI_URL}/users`, {
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
