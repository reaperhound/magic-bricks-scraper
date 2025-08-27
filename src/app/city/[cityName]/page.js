"use client";

import ProjectCard from "@/components/ProjectCard";
import { useSearchParams, useParams } from "next/navigation";

export default function CityPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const rfnum = searchParams.get("rfnum");
  let { cityName } = params;
  cityName = decodeURIComponent(cityName);
  console.log(rfnum);

  return (
    <>
      <h1>{cityName}</h1>
      <ProjectCard />
    </>
  );
}
