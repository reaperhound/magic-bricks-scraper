import { NextResponse } from "next/server";

export async function GET() {
  const rfnum = "108145";
  const apiUrl = `https://www.magicbricks.com/mbproject/newProjectCards?&pageNo=1&city=${rfnum}`;

  try {
    console.log("🔍 Testing API accessibility...");
    console.log("URL:", apiUrl);

    // First, try a simple fetch without headers
    console.log("📡 Attempting basic fetch...");
    let response = await fetch(apiUrl, {
      method: "GET",
    });

    console.log("📊 Basic fetch response:");
    console.log("- Status:", response.status);
    console.log("- Status Text:", response.statusText);
    console.log("- Content-Type:", response.headers.get("content-type"));
    console.log("- Server:", response.headers.get("server"));
    console.log(
      "- All headers:",
      Object.fromEntries(response.headers.entries())
    );

    const basicText = await response.text();
    console.log("- Response preview:", basicText.substring(0, 500));

    // If basic fetch fails, try with full headers
    if (!response.ok || basicText.toLowerCase().includes("<html")) {
      console.log("🛠️ Basic fetch failed, trying with full headers...");

      response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.magicbricks.com/",
          Origin: "https://www.magicbricks.com",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      console.log("📊 Full headers fetch response:");
      console.log("- Status:", response.status);
      console.log("- Content-Type:", response.headers.get("content-type"));

      const fullHeadersText = await response.text();
      console.log("- Response preview:", fullHeadersText.substring(0, 500));

      return NextResponse.json({
        debug: true,
        url: apiUrl,
        basicFetch: {
          status: response.status,
          contentType: response.headers.get("content-type"),
          preview: basicText.substring(0, 300),
          isHtml: basicText.toLowerCase().includes("<html"),
        },
        fullHeadersFetch: {
          status: response.status,
          contentType: response.headers.get("content-type"),
          preview: fullHeadersText.substring(0, 300),
          isHtml: fullHeadersText.toLowerCase().includes("<html"),
        },
        analysis: {
          apiBlocked:
            basicText.toLowerCase().includes("<html") ||
            fullHeadersText.toLowerCase().includes("<html"),
          statusOk: response.ok,
          likelyIssue: basicText.toLowerCase().includes("<html")
            ? "API is returning HTML - likely blocked, requires auth, or has bot protection"
            : response.ok
            ? "API accessible but returned unexpected format"
            : "API returned error status",
        },
      });
    }

    // If we get here, the API returned something that might be JSON
    try {
      const data = JSON.parse(basicText);
      return NextResponse.json({
        success: true,
        msg: "API is working!",
        data,
        debug: {
          url: apiUrl,
          status: response.status,
          contentType: response.headers.get("content-type"),
        },
      });
    } catch (jsonError) {
      return NextResponse.json({
        error: "API returned non-JSON data",
        url: apiUrl,
        status: response.status,
        contentType: response.headers.get("content-type"),
        preview: basicText.substring(0, 300),
        jsonError: jsonError.message,
      });
    }
  } catch (error) {
    console.error("❌ Fetch error:", error);

    return NextResponse.json(
      {
        error: "Network error",
        details: error.message,
        type: error.name,
        url: apiUrl,
        suggestions: [
          "The external API might be completely unreachable",
          "Network connectivity issues from Vercel servers",
          "DNS resolution problems",
          "API server might be down",
        ],
      },
      { status: 500 }
    );
  }
}
