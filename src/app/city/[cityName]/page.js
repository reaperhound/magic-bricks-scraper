"use client";

import ProjectCard from "@/components/ProjectCard";
import useSearchList from "@/hooks/useSearchList";
import { useSearchParams, useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CityPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const rfnum = searchParams.get("rfnum");
  let { cityName } = params;
  cityName = decodeURIComponent(cityName);

  const [pgNum, setPgNum] = useState(1);

  const [loading, error, list, hasMore] = useSearchList(rfnum, pgNum);

  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("🚀 ~ CityPage ~ VISIBLE");
          setPgNum((prevPgNum) => prevPgNum + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log("🚀 ~ CityPage ~ observer:", observer);
    },
    [loading, hasMore]
  );

  console.log("🚀 ~ CityPage ~ list:", list);
  return (
    <>
      <h1>{cityName}</h1>
      {/* {list.map((l, i) => (
          <ProjectCard key={i} projectData={l} />
        ))} */}
      {list.map((prj, i) => {
        if (list.length === i + 1)
          return (
            <div ref={lastElementRef} key={prj.psmid + i}>
              <ProjectCard projectData={prj} />
            </div>
          );
        else {
          return <ProjectCard key={prj.psmid + i} projectData={prj} />;
        }
      })}
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </>
  );
}
