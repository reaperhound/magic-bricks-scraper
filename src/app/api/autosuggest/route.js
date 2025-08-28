import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q || q.trim().length < 2) {
    return NextResponse.json({
      locationMap: { LOCATION: [] },
      message: "Query too short",
    });
  }

  const targetUrl = `https://www.magicbricks.com/mbutility/homepageAutoSuggest?searchtxt=${encodeURIComponent(
    q
  )}&city=`;

  try {
    console.log("🔍 Fetching autosuggest for:", q);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json(); // parse JSON directly
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Autosuggest API error:", error.message);
    return NextResponse.json({
      error: error.message,
      locationMap: { LOCATION: [] },
    });
  }
}
