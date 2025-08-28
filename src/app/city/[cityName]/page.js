"use client";

import ProjectCard from "@/components/ProjectCard";
import useSearchList from "@/hooks/useSearchList";
import { useSearchParams, useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

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
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-200 text-center mb-6'>
        {cityName}
        <span className='block w-20 h-1 bg-red-500 mx-auto mt-2 rounded-full'></span>
      </h1>
      <div className='w-[100%] flex flex-col gap-4 justify-center items-center'>
        {list.map((prj, i) => {
          if (list.length === i + 1)
            return (
              <div
                ref={lastElementRef}
                key={prj.psmid + i}
                className='w-[100%] grid place-items-center'
              >
                <ProjectCard projectData={prj} />
              </div>
            );
          else {
            return (
              <div
                key={prj.psmid + i}
                className='w-[100%] grid place-items-center'
              >
                <ProjectCard projectData={prj} />;
              </div>
            );
          }
        })}
      </div>
      {loading && <Loader />}
      {error && <div>Error</div>}
    </>
  );
}
