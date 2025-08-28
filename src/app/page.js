"use client";

import HomePageButton from "@/components/HomePageButton";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className='p-6 w-[100%] grid place-items-center'>
      {/* <SearchBar /> */}
      <Link href='/city/Hyderabad'>
        <HomePageButton btnText={"Explore Hyderabad"} />
      </Link>
    </div>
  );
}
