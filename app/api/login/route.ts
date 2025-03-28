import { NextRequest, NextResponse } from "next/server";
import data from "@/data/data.json";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = data.users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
