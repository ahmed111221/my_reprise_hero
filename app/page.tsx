'use client'

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/hero/hero";

export default function Home() {
  useEffect(() => {
    console.log("Home");
  }, []);
  return (
    <div className="bg-white h-screen w-screen text-black">
        <Link href="/about">About</Link>
        <Hero />
    </div>
  );
}
