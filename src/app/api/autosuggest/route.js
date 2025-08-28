import { NextResponse } from "next/server";

const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ml;q=0.6",
  "cache-control": "no-cache",
  pragma: "no-cache",
  priority: "u=1, i",
  "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "sec-gpc": "1",
  cookie:
    "trackerCookie=Google_Organic; firstInteractionCookie=P; paidInteractionCookie=Y; npsId=946628; userNTrackId=e752ece6-7e9c-45d1-a32d-82eb9e0297c5; NOEU=new; previousTab=tabBUY; semAttributesCookie=Direct%23; JSESSIONID=79C6EEB3122A9C8D5209692AEAE39020-n1.32211; alertRaisedCount=1; luxuryCookie=N; propertyExcludeId=; projectCategory=B; subPropertyTypeCookie=10002%2C10003%2C10021%2C10022%2C10001%2C10017; subPropertyType=Multistorey-Apartment%2CBuilder-Floor-Apartment%2CPenthouse%2CStudio-Apartment%2CResidential-House%2CVilla; propertyTypeCookie=Multistorey-Apartment%2CBuilder-Floor-Apartment%2CPenthouse%2CStudio-Apartment%2CResidential-House%2CVilla; propCategory=Residential; SRPSESSIONID=YTUxNmYyNWItNDVkYi00NTM5LTg3ZDYtMjAzZDZkMDUxZDE3; SEARCHSESSIONID=ac3e2889-59ff-4c2c-9d8d-988e5c4dd4f7; psmIds=; cityNameTTvl=Kozhikode; SS_RMB=; jacketAdCookie=Y; uniqUserSearchId=97e521d4f24d458999e66aa9232ed572a516f25b_1756286747158; cityCookie=2060; cityCode=2060; cityNameCookie=Hyderabad; mbRecommendationCookies=pageType%3Dproperty%7ClistType%3DS%7CpropType%3D10002%2C10003%2C10021%2C10022%2C10001%2C10017%7Ccity%3D2060%7CcompleteCityCode%3D2060; rs-data=%5B%7B%22searchParams%22%3A%7B%22city%22%3A%22Hyderabad%22%2C%22ltName%22%3Anull%2C%22cityCode%22%3A%222060%22%2C%22ltCode%22%3Anull%2C%22category%22%3A%22Buy%22%2C%22propTy%22%3A%22Flat%2C%20House%2FVilla%22%7D%2C%22bhk%22%3Anull%2C%22propCt%22%3A%2232498%22%2C%22url%22%3A%22https%3A%2F%2Fwww.magicbricks.com%2Fproperty-for-sale%2Fresidential-real-estate%3Fbedroom%3D%26proptype%3DMultistorey-Apartment%2CBuilder-Floor-Apartment%2CPenthouse%2CStudio-Apartment%2CResidential-House%2CVilla%26cityName%3DHyderabad%22%2C%22budMin%22%3Anull%2C%22budMax%22%3Anull%2C%22date%22%3A%222025-08-27T14%3A55%3A47Z%22%2C%22propCat%22%3A%22Residential%22%7D%2C%7B%22searchParams%22%3A%7B%22city%22%3A%22Kozhikode%22%2C%22ltName%22%3A%22Cheruvannur%22%2C%22cityCode%22%3A%223649%22%2C%22ltCode%22%3A%2257112%22%2C%22category%22%3A%22Buy%22%2C%22propTy%22%3A%22Flat%2C%20House%2FVilla%22%7D%2C%22bhk%22%3Anull%2C%22propCt%22%3A%221%22%2C%22url%22%3A%22https%3A%2F%2Fmagicbricks.com%2Fproperty-for-sale%2Fresidential-real-estate%3F%26proptype%3DMultistorey-Apartment%2CBuilder-Floor-Apartment%2CPenthouse%2CStudio-Apartment%2CResidential-House%2CVilla%26cityName%3DKozhikode%26Locality%3D57112%26page%3D1%26sortBy%3DpremiumRecent%26isNRI%3DN%22%2C%22budMin%22%3Anull%2C%22budMax%22%3Anull%2C%22date%22%3A%222025-08-27T14%3A55%3A01Z%22%2C%22propCat%22%3A%22Residential%22%7D%2C%7B%22searchParams%22%3A%7B%22city%22%3A%22Kozhikode%22%2C%22ltName%22%3Anull%2C%22cityCode%22%3A%223649%22%2C%22ltCode%22%3Anull%2C%22category%22%3A%22Buy%22%2C%22propTy%22%3A%22Flat%2C%20House%2FVilla%22%7D%2C%22bhk%22%3Anull%2C%22propCt%22%3A%22324%22%2C%22url%22%3A%22https%3A%2F%2Fmagicbricks.com%2Fproperty-for-sale%2Fresidential-real-estate%3F%26proptype%3DMultistorey-Apartment%2CBuilder-Floor-Apartment%2CPenthouse%2CStudio-Apartment%2CResidential-House%2CVilla%26cityName%3DKozhikode%26sortBy%3DpremiumRecent%26isNRI%3DN%22%2C%22budMin%22%3Anull%2C%22budMax%22%3Anull%2C%22date%22%3A%222025-08-27T14%3A54%3A51Z%22%2C%22propCat%22%3A%22Residential%22%7D%5D; SHWN_GEN_RMB=null; HDSESSIONID=c75f3e8d-2b08-400b-88de-60de3e571aa5; MBPDPSESSIONID=NGI4NTlmNmYtNDFlYi00MDIyLWI2NGEtNTAxNzE1MzY3N2Yy; cookieDtfirstIntr=20250828; MBPROJECTSESSIONID=ZTNhMDQxNmQtZWYwZC00MTNlLTkyMTQtZTI2NmI1YmI2YmEx",
  Referer: "https://www.magicbricks.com/new-projects-Hyderabad",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const response = await fetch(
    `https://www.magicbricks.com/mbutility/homepageAutoSuggest?searchtxt=${encodeURIComponent(
      q
    )}&city=`,
    {
      headers,
      body: null,
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(
    "🚀 ~ GET ~ url:",
    `https://www.magicbricks.com/mbutility/homepageAutoSuggest?searchtxt=${encodeURIComponent(
      q
    )}&city=`
  );
  return NextResponse.json(data);
}
