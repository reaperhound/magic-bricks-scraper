"use client";

import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);
  async function foo() {
    const res = await fetch("/api/test");
    const data = await res.json();
    console.log(data);
  }
  return (
    <div className='p-6'>
      <SearchBar />
      <button onClick={foo}>TEST</button>
    </div>
  );
}
