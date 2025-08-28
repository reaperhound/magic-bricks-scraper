import { NextResponse } from "next/server";

export async function GET() {
  const rfnum = "108145";
  const response = await fetch(
    `https://www.magicbricks.com/mbproject/newProjectCards?&pageNo=1&city=${rfnum}`,
    {
      //   headers,
      body: null,
      method: "GET",
    }
  );
  const data = await response.json();
  return NextResponse.json({ msg: "Hii", data });
}
