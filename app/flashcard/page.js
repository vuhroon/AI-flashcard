"use client";
import { useState } from "react";
import React from "react";
import CardList from "@/components/ui/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

var fullresult = JSON.parse('[{"front":"Smart", "back":"ForTwo"}]');
const isToggled = false;

function flip(backofcard) {
  alert(backofcard);
}

export default function flashcard() {
  const [topic, setTopic] = useState("");
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "generate concise information for display on flashcards. Total of 5 flash cards",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      // history: [
      //   {
      //     role: "user",
      //     parts: [{ text: "list car brands\n" }],
      //   },
      // ],
    });

    // const result = await chatSession.sendMessage("top 5 car brands");
    const result = await chatSession.sendMessage(`${topic}`);
    fullresult = JSON.parse(result.response.text());
    console.log(fullresult);
  }

  run();

  const data = [
    {
      front: "Toyota",
      back: "Japanese manufacturer known for reliability and fuel efficiency.",
    },
    {
      front: "Honda",
      back: "Japanese manufacturer known for reliability and fuel efficiency.",
    },
    {
      front: "Volkswagen",
      back: "German manufacturer known for its wide range of models and value.",
    },
    {
      front: "Ford",
      back: "American manufacturer known for trucks and SUVs.",
    },
    {
      front: "Chevrolet",
      back: "American manufacturer known for its diverse lineup of cars and trucks.",
    },
  ];

  console.log({topic})

  return (
    <div>
      <div>
        <p>auto gen card</p>
        <CardList data={data} />
      </div>

      {/* <div>
        <p>test card</p>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Result1</CardTitle>
            <CardDescription>
              Card1
              {fullresult[0].front}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Front</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Back</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Flip</Button>
          </CardFooter>
        </Card>
      </div> */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <p>gen search box</p>
        <Input
          type="email"
          placeholder="Choose a Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={run} type="submit">Generate</Button>
      </div>

      {/* <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Front:
          </h5>
        </div>
        <div className="p-6 pt-0">
          <button
            // onClick={alert("Hi")}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Flip
          </button>
        </div>
      </div> */}
    </div>
  );
}
