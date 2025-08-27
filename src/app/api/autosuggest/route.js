import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const response = await fetch(
    `https://www.magicbricks.com/mbutility/homepageAutoSuggest?searchtxt=${encodeURIComponent(
      q
    )}&city=`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
