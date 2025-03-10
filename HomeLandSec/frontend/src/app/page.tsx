"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  function loadQuestions() {
    console.log("Loading questions");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-neutral-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/inquiry" className="text-blue-500">
        Inquiry
      </Link>
      <Button onClick={loadQuestions}>Test Button</Button>
    </div>
  );
}

