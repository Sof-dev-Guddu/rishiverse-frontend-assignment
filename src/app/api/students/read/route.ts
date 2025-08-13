import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req:NextRequest) {
    console.log(req)
  try {
    const { data } = await axios.get(`${process.env.MOCKAPI_URL}/students`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
