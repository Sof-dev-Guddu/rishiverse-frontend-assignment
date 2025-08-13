import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { withAuth } from "@/lib/withAuth";

async function updateStudent(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { data } = await axios.put(`${process.env.MOCKAPI_URL}/students/${id}`, body);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}

// Admin only
export const PUT = withAuth(updateStudent, { adminOnly: true });
