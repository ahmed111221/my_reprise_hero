'use client'

import { useEffect } from "react";
import Test from "../../components/test";
import { products } from "@/data/products";
import Image from "next/image";



export default function About() {

    const productsData = products;

    return (
        <div className="bg-gray-200 h-screen w-screen text-black">
            hello world
            <Test />
            <Image src="/vercel.svg" alt="image" width={100} height={100} />
        </div>
    );
}