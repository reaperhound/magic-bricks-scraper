"use client";

import LocationMap from "@/components/LocationMap";
import PropertyDetails from "@/components/PropertyDetails";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);

  const imageUrls = convertToImageUrls(image);

  useEffect(() => {
    async function fetchProjectDetails() {
      setLoading(true);
      const res = await fetch(`/api/projectData?lt=${lt}&psmid=${psmid}`);
      const data = await res.json();
      console.log("🚀 ~ fetchProjectDetails ~ data:", data);
      setMapData(data.mapDetails);
      setLoading(false);
    }
    fetchProjectDetails();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='flex flex-col justify-center items-center gap-6 pb-10'>
      <h1>{projectName}</h1>
      <PropertyDetails prptyDetails={{ imageUrls }} />
      <div className='w-[50%] h-30%'>
        <LocationMap
          lat={mapData.lat}
          long={mapData.long}
          locName={mapData.locName}
        />
      </div>
    </div>
  );
}

function convertToImageUrls(input) {
  const baseUrl = "https://img.staticmb.com/mbimages/project/Photo_h470_w1080/";

  return input.split(",").map((path) => {
    // path is like: 2021/08/12/Project-Photo-1-ORIANA-Hyderabad-5296639_345_1366.jpg
    const parts = path.split("/");
    const filename = parts.pop(); // Project-Photo-1-...jpg
    const datePath = parts.join("/"); // 2021/08/12

    // Remove original extension
    const filenameWithoutExt = filename.replace(/\.jpg$/, "");

    // Append required suffix before .jpg.webp
    return `${baseUrl}${datePath}/${filenameWithoutExt}_470_1080.jpg.webp`;
  });
}
