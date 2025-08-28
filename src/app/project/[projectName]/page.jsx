"use client";

import Loader from "@/components/Loader";
import LocationMap from "@/components/LocationMap";
import PropertyDetails from "@/components/PropertyDetails";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import jsonData from "../../../data/scraped.json";
console.log("🚀 ~ jsonData:", jsonData);

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const lt = searchParams.get("lt");
  const psmid = searchParams.get("psmid");
  const pdpUrl = searchParams.get("pdpUrl");
  const image = searchParams.get("image");
  let { projectName } = params;
  projectName = decodeURIComponent(projectName);

  const [mapData, setMapData] = useState({});
  const [prjDetails, setPrjDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const imageUrls = convertToImageUrls(image);

  useEffect(() => {
    setLoading(true);
    const prjData = jsonData.filter((d) => {
      if (d.lt == lt && d.psmid == psmid) {
        return d;
      }
    });
    setMapData(prjData[0].mapDetails);
    setPrjDetails(prjData[0]);
    setLoading(false);

    // async function fetchProjectDetails() {
    //   const res = await fetch(
    //     `/api/projectData?lt=${lt}&psmid=${psmid}&pdpUrl=${pdpUrl}`
    //   );
    //   const data = await res.json();
    //   console.log("🚀 ~ fetchProjectDetails ~ data:", data);
    //   setLoading(false);
    // }
    // fetchProjectDetails();
  }, []);

  console.log("🚀 ~ ProjectPage ~ prjDetails:", prjDetails);
  if (loading) return <Loader />;

  return (
    <div className='flex flex-col justify-center items-center gap-6 pb-10'>
      <h1>{projectName}</h1>
      <PropertyDetails prptyDetails={{ imageUrls, prjDetails }} />
      <div className='w-[50%] h-30%'>
        <LocationMap
          lat={mapData?.lat}
          long={mapData?.long}
          locName={mapData?.locName}
        />
      </div>
    </div>
  );
}

function convertToImageUrls(input) {
  const baseUrl = "https://img.staticmb.com/mbimages/project/Photo_h470_w1080/";

  return input.split(",").map((path) => {
    const parts = path.split("/");
    const filename = parts.pop(); // Project-Photo-1-...jpg
    const datePath = parts.join("/"); // 2021/08/12

    // Remove original extension
    const filenameWithoutExt = filename.replace(/\.jpg$/, "");

    // Append required suffix before .jpg.webp
    return `${baseUrl}${datePath}/${filenameWithoutExt}_470_1080.jpg.webp`;
  });
}
