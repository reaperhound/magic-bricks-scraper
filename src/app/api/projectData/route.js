import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lt = searchParams.get("lt");
  const psmid = searchParams.get("psmid");

  const response = await fetch(
    `https://www.magicbricks.com/mbprojectdetail/topProjectAdvertisersList.html?psmid=${psmid}`
  );
  const responseMaps = await fetch(
    `https://www.magicbricks.com/mbprojectdetail/getLocalityMapImg?locid=${lt}`
  );
  const projectDetails = await response.json();
  const mapDetails = await responseMaps.json();
  return NextResponse.json({
    projectDetails,
    mapDetails,
  });
}
