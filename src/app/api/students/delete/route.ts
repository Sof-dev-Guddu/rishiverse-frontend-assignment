import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { withAuth } from "@/lib/withAuth";
import { Student } from "@/types/students";

async function deleteStudent(req: NextRequest,  student: Student) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
  }

  try {
    await axios.delete(`${process.env.MOCKAPI_URL}/students/${id}`);
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}

export const DELETE = withAuth(deleteStudent, { adminOnly: true });
