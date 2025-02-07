"use client";

import dynamic from "next/dynamic";

const Home = dynamic(() => import("./index"), { ssr: false });

export default function DynamicHome() {
  return <Home />;
}
