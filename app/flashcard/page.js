// "use client";
// import { useState } from "react";
import React from "react";

export default function flashcard() {

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "generate concise information for display on flashcards. Total of 5 flash cards",
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
      history: [
        {
          role: "user",
          parts: [
            {text: "list car brands\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();

    
//   // Initialize state with useState
//   const [geminiResponse, setGeminiResponse] = useState(0);
//   const { GoogleGenerativeAI } = require("@google/generative-ai");

//   // Access your API key as an environment variable (see "Set up your API key" above)

//   //saving result as empty string
//   let result = "";
//   async function run() {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     // Using `responseMimeType` requires either a Gemini 1.5 Pro or 1.5 Flash model
//     let model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       // Set the `responseMimeType` to output JSON
//       generationConfig: { responseMimeType: "application/json" },
//     });

//     let prompt = `
//   List 5 popular car brands using this JSON schema:
//   { "type": "object",
//     "properties": {
//       "recipe_name": { "type": "string" },
//     }
//   }`;

//     result = await model.generateContent(prompt);
//     return result.response.text();
//   }
//   // extracting response for use out of function
//   run().then((response) => {
//     console.log("result: ", response);
//     setGeminiResponse(response);
//   });

  //   console.log("result: ", result);

  return ( 
  <h1>test</h1>
//   geminiResponse;
  )
}
