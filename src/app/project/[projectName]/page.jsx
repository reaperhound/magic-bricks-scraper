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
  console.log("🚀 ~ ProjectPage ~ lt:", lt);
  let { projectName } = params;
  projectName = decodeURIComponent(projectName);

  const [mapData, setMapData] = useState({});
  const [loading, setLoading] = useState(true);

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
    <div>
      <h1>{projectName}</h1>
      <PropertyDetails />
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
