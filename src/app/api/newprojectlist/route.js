import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rfnum = searchParams.get("rfnum");
  console.log("🚀 ~ GET ~ rfnum:", rfnum);
  const response = await fetch(
    `https://www.magicbricks.com/mbproject/newProjectCards?&pageNo=1&city=${rfnum}`
  );
  const data = await response.json();
  return NextResponse.json(data.projectsCards);
}
