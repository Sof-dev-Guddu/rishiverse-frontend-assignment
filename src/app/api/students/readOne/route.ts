
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(req:  NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const { data } = await axios.get(`${process.env.MOCKAPI_URL}/students/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}
