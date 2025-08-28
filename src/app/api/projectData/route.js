import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
// `https://www.magicbricks.com/mbprojectdetail/topProjectAdvertisersList.html?psmid=${psmid}`

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lt = searchParams.get("lt");
  const psmid = searchParams.get("psmid");
  const pdpUrl = searchParams.get("pdpUrl");

  const response = await fetch(`https://www.magicbricks.com/${pdpUrl}`);
  const responseMaps = await fetch(
    `https://www.magicbricks.com/mbprojectdetail/getLocalityMapImg?locid=${lt}`
  );
  const projectPageResponse = await response.text();
  const mapDetails = await responseMaps.json();
  let propertyInfo = extractPropertyDetails(projectPageResponse);
  console.log("🚀 ~ GET ~ prptyDetails:", propertyInfo);
  return NextResponse.json({
    propertyInfo,
    mapDetails,
  });
}

function extractPropertyDetails(html) {
  const $ = cheerio.load(html);

  const name = $(".pdp__name h1")
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim();
  const location = $(".pdp__location").text().trim();
  const developer = $(".pdp__developerName").text().trim();
  const reraId = $("#reraId").text().trim();
  const priceRange = $(".pdp__pricecard--price").text().trim();
  const bhk = $(".pdp__bhkposs--bhk").text().trim();
  const possession = $(".pdp__bhkposs--time").text().trim();
  const emi =
    $(".pdp__pricecard--data span.text-semibold").text().trim() ||
    $(".pdp__pricecard--data").last().text().trim();

  return {
    name,
    location,
    developer,
    reraId,
    priceRange,
    bhk,
    possession,
    emi,
  };
}
