import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req) {
  try {
    const { username, email, phone, password } = await req.json();

    if (!username || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const response = await axios.post(`${process.env.BACKEND_URL}/auth/signup`, {
      name: username,
      email, phone, password
    })
    if (response.status == 200) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: true, message: response.data });

    }

  } catch (err) {
    return NextResponse.json({ success: false, message: err });
  }
}
