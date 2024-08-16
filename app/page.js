"use client";
import Link from "next/link";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkmodeToggle";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>My API Key: {apiKey}</h1>
      </div>
      <ModeToggle/>
      <div>
        <Link href="/flashcard">
          <Button variant="outline">flashcard</Button>
        </Link>
        <Link href="/Notes">
          <Button variant="outline">Notes</Button>
        </Link>
      </div>
    </main>
  );
}