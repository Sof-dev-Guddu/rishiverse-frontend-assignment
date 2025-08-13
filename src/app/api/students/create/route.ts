import { NextResponse } from "next/server";
import axios from "axios";
import { withAuth } from "@/lib/withAuth";

async function createStudent(req: Request) {
  try {
    const body = await req.json();
    const { name, discipline, email, img } = body;

    if (!name || !discipline || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const res = await axios.post(`${process.env.MOCKAPI_URL}/students`, body);
    return NextResponse.json(res.data, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}

// Admin only
export const POST = withAuth(createStudent, { adminOnly: true });
