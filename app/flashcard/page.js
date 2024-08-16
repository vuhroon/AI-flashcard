import React from 'react';

export default function flashcard() {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run() {
// Using `responseMimeType` requires either a Gemini 1.5 Pro or 1.5 Flash model
let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
  });
  
  let prompt = `
  List 5 popular cookie recipes using this JSON schema:
  { "type": "object",
    "properties": {
      "recipe_name": { "type": "string" },
    }
  }`;
  
  let result = await model.generateContent(prompt)
  console.log(result.response.text());
  }
  
  run();


    return (
    <h1>test</h1>

    )
    
}