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

    // Method 1: Try direct fetch with headers first
    let response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.magicbricks.com/",
        Origin: "https://www.magicbricks.com",
        "Cache-Control": "no-cache",
      },
    });

    console.log("📡 Direct fetch status:", response.status);

    if (!response.ok) {
      console.log("❌ Direct fetch failed, trying proxy...");
      // Method 2: Use proxy service as fallback
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        targetUrl
      )}`;
      response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Proxy also failed: ${response.status}`);
      }

      const proxyData = await response.json();

      try {
        const actualData = JSON.parse(proxyData.contents);
        console.log("✅ Proxy fetch successful");
        return NextResponse.json(actualData);
      } catch (parseError) {
        console.error(
          "Proxy returned HTML:",
          proxyData.contents.substring(0, 200)
        );
        throw new Error("API blocked even through proxy");
      }
    }

    // Direct fetch worked, parse response
    const responseText = await response.text();

    if (responseText.toLowerCase().includes("<html")) {
      console.error("❌ Direct fetch returned HTML");

      // Try proxy as fallback
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        targetUrl
      )}`;
      const proxyResponse = await fetch(proxyUrl);

      if (proxyResponse.ok) {
        const proxyData = await proxyResponse.json();
        try {
          const actualData = JSON.parse(proxyData.contents);
          console.log("✅ Proxy fallback successful");
          return NextResponse.json(actualData);
        } catch (parseError) {
          console.error("Proxy also returned HTML");
        }
      }

      // Both methods failed, return mock data or error
      return NextResponse.json(
        {
          error: "API blocked",
          locationMap: { LOCATION: [] },
          suggestions: [
            "Try using client-side requests",
            "API might need authentication",
            "Consider alternative location APIs",
          ],
        },
        { status: 502 }
      );
    }

    // Parse successful JSON response
    try {
      const data = JSON.parse(responseText);
      console.log("✅ Direct fetch successful");
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      return NextResponse.json(
        {
          error: "Invalid JSON response",
          locationMap: { LOCATION: [] },
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("❌ Autosuggest API error:", error.message);

    // Return empty results instead of failing completely
    return NextResponse.json(
      {
        error: error.message,
        locationMap: { LOCATION: [] },
        fallback: true,
      },
      { status: 200 }
    ); // Return 200 so the component doesn't break
  }
}
