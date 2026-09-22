import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      jobDescription,
      companyWebsite,
      interviewDate,
    } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert interview preparation assistant.

Create a personalized interview preparation kit from the following job description.

Job Description:
${jobDescription}

Company Website:
${companyWebsite || "Not provided"}

Interview Date:
${interviewDate || "Not provided"}

Return ONLY valid JSON with this exact structure:

{
  "summary": "Short summary of the role",
  "keySkills": ["skill 1", "skill 2", "skill 3"],
  "companyResearch": [
    "Research point 1",
    "Research point 2",
    "Research point 3"
  ],
  "technicalQuestions": [
    "Technical question 1",
    "Technical question 2",
    "Technical question 3",
    "Technical question 4",
    "Technical question 5"
  ],
  "behavioralQuestions": [
    "Behavioral question 1",
    "Behavioral question 2",
    "Behavioral question 3"
  ],
  "systemDesignQuestions": [
    "System design question 1",
    "System design question 2"
  ],
  "studySchedule": [
    {
      "day": "Day 1",
      "focus": "Topic to study"
    },
    {
      "day": "Day 2",
      "focus": "Topic to study"
    },
    {
      "day": "Day 3",
      "focus": "Topic to study"
    }
  ]
}
`;

    const response = await openai.responses.create({
     model: "gpt-5.6-luna",
      input: prompt,
    });

    const text = response.output_text;

    const kit = JSON.parse(text);

    return NextResponse.json(kit);
  } catch (error) {
    console.error("Generate kit error:", error);

    return NextResponse.json(
      { error: "Failed to generate interview kit" },
      { status: 500 }
    );
  }
}