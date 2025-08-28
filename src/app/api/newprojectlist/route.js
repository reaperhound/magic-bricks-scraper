import { NextResponse } from "next/server";

// Mock data for when API is blocked - organized by city rfnum
const MOCK_PROJECTS_BY_CITY = {
  108145: [
    // Cochin/Kochi
    {
      id: "1",
      projectName: "Marine Drive Residency",
      builderName: "Prestige Group",
      location: "Marine Drive, Cochin",
      price: "₹85 Lakh onwards",
      bhk: "2,3,4 BHK",
      status: "Under Construction",
      area: "1200-2400 sq.ft",
    },
    {
      id: "2",
      projectName: "Skyline Apartments",
      builderName: "Sobha Developers",
      location: "Kakkanad, Cochin",
      price: "₹65 Lakh onwards",
      bhk: "2,3 BHK",
      status: "Ready to Move",
      area: "1050-1850 sq.ft",
    },
  ],
  196: [
    // Bangalore
    {
      id: "3",
      projectName: "Tech City Homes",
      builderName: "Brigade Group",
      location: "Whitefield, Bangalore",
      price: "₹1.2 Crore onwards",
      bhk: "3,4 BHK",
      status: "Under Construction",
      area: "1800-2800 sq.ft",
    },
  ],
};

const DEFAULT_PROJECTS = [
  {
    id: "default1",
    projectName: "Sample Residency",
    builderName: "ABC Builders",
    location: "City Center",
    price: "₹45 Lakh onwards",
    bhk: "2,3 BHK",
    status: "Under Construction",
    area: "1200-1600 sq.ft",
  },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rfnum = searchParams.get("rfnum");

  if (!rfnum) {
    return NextResponse.json(
      {
        error: "rfnum parameter is required",
        projectsCards: [],
      },
      { status: 400 }
    );
  }

  console.log("🚀 ~ GET ~ rfnum:", rfnum);

  const targetUrl = `https://www.magicbricks.com/mbproject/newProjectCards?&pageNo=1&city=${rfnum}`;

  try {
    console.log("🔍 Fetching project cards for rfnum:", rfnum);

    // Method 1: Try direct fetch with enhanced headers
    let response = await fetch(targetUrl, {
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
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    });

    console.log("📡 Direct fetch status:", response.status);
    console.log("📡 Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
      console.log("❌ Direct fetch failed with status:", response.status);
      throw new Error(`Direct fetch failed: ${response.status}`);
    }

    const responseText = await response.text();
    console.log("📄 Response preview:", responseText.substring(0, 200));

    if (responseText.toLowerCase().includes("<html")) {
      console.log("❌ Direct fetch returned HTML, trying proxy...");

      // Method 2: Use proxy service as fallback
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        targetUrl
      )}`;
      const proxyResponse = await fetch(proxyUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!proxyResponse.ok) {
        throw new Error(`Proxy failed: ${proxyResponse.status}`);
      }

      const proxyData = await proxyResponse.json();

      if (
        proxyData.contents &&
        !proxyData.contents.toLowerCase().includes("<html")
      ) {
        try {
          const actualData = JSON.parse(proxyData.contents);
          console.log("✅ Proxy fetch successful");
          return NextResponse.json({
            ...(actualData.projectsCards || actualData),
            method: "proxy",
            rfnum,
          });
        } catch (parseError) {
          console.error("Proxy JSON parse error:", parseError.message);
        }
      }

      // Both methods failed, return mock data with warning
      console.log("⚠️ Both API and proxy failed, using mock data");
      const mockProjects = MOCK_PROJECTS_BY_CITY[rfnum] || DEFAULT_PROJECTS;

      return NextResponse.json({
        projectsCards: mockProjects,
        fallback: true,
        rfnum,
        warning: "API unavailable - showing sample data",
        suggestions: [
          "API might be blocked or require authentication",
          "Try again later or contact MagicBricks for API access",
          "Consider alternative real estate APIs",
        ],
      });
    }

    // Direct fetch worked, parse JSON response
    try {
      const data = JSON.parse(responseText);
      console.log("✅ Direct fetch successful");
      console.log("📊 Projects found:", data.projectsCards?.length || 0);

      return NextResponse.json(data.projectsCards);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      console.error("Response text:", responseText.substring(0, 500));

      return NextResponse.json({
        error: "Invalid JSON response from API",
        projectsCards: MOCK_PROJECTS_BY_CITY[rfnum] || DEFAULT_PROJECTS,
        fallback: true,
        rfnum,
        parseError: parseError.message,
        preview: responseText.substring(0, 200),
      });
    }
  } catch (error) {
    console.error("❌ Project cards API error:", error.message);

    // Return mock data instead of failing completely
    return NextResponse.json({
      error: error.message,
      projectsCards: MOCK_PROJECTS_BY_CITY[rfnum] || DEFAULT_PROJECTS,
      fallback: true,
      rfnum,
      suggestions: [
        "Network connectivity issues",
        "API server might be down",
        "Authentication may be required",
        "Rate limiting or bot protection active",
      ],
    });
  }
}
