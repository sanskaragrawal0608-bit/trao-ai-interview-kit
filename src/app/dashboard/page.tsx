"use client";

import { useEffect, useState } from "react";

type AIKit = {
  summary: string;
  keySkills: string[];
  companyResearch: string[];
  technicalQuestions: string[];
  behavioralQuestions: string[];
  systemDesignQuestions: string[];
  studySchedule: {
    day: string;
    focus: string;
  }[];
};

type InterviewKit = {
  jobDescription: string;
  companyWebsite: string;
  interviewDate: string;
  aiKit?: AIKit;
};

export default function DashboardPage() {
  const [kit, setKit] = useState<InterviewKit | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const savedKit = localStorage.getItem("interviewKit");
    const savedProgress = localStorage.getItem("questionProgress");
    const savedScheduleProgress =
      localStorage.getItem("scheduleProgress");

    if (savedKit) {
      setKit(JSON.parse(savedKit));
    }

    if (savedProgress) {
      setCompletedQuestions(JSON.parse(savedProgress));
    }

    if (savedScheduleProgress) {
      setCompletedDays(JSON.parse(savedScheduleProgress));
    }
  }, []);

  const ai = kit?.aiKit;

  const technicalCount = ai?.technicalQuestions.length ?? 0;
  const behavioralCount = ai?.behavioralQuestions.length ?? 0;
  const systemDesignCount = ai?.systemDesignQuestions.length ?? 0;

  const totalQuestions =
    technicalCount +
    behavioralCount +
    systemDesignCount;

  const completedCount = completedQuestions.length;

  const progress =
    totalQuestions > 0
      ? Math.round((completedCount / totalQuestions) * 100)
      : 0;

  const toggleQuestion = (id: number) => {
    setCompletedQuestions((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem(
        "questionProgress",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const toggleDay = (id: number) => {
    setCompletedDays((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem(
        "scheduleProgress",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const createNewKit = () => {
    localStorage.removeItem("interviewKit");
    localStorage.removeItem("questionProgress");
    localStorage.removeItem("scheduleProgress");

    window.location.href = "/create";
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-xl font-bold text-gray-900">
            AI Interview Prep Kit
          </h1>

          <button
            onClick={createNewKit}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            New Kit
          </button>

        </div>
      </header>

      {/* Main Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Heading */}
        <div className="mb-10">

          <p className="text-sm font-medium text-blue-600">
            Dashboard
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Your Interview Kit
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Your personalized AI-powered interview preparation plan.
          </p>

        </div>

        {/* Interview Details */}
        {kit && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Interview Preparation
                </p>

                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  Software Engineer
                </h3>

                <p className="mt-2 text-gray-600">
                  {kit.companyWebsite}
                </p>

              </div>

              <div className="rounded-xl bg-blue-50 px-6 py-4">

                <p className="text-xs text-gray-500">
                  Interview Date
                </p>

                <p className="mt-1 font-semibold text-blue-600">
                  {kit.interviewDate}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Preparation Progress */}
        {ai && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold text-gray-900">
                  Preparation Progress
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Complete interview questions to improve your progress.
                </p>

              </div>

              <span className="text-2xl font-bold text-blue-600">
                {progress}%
              </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>

            <p className="mt-3 text-sm text-gray-500">
              {completedCount} of {totalQuestions} questions completed
            </p>

          </div>
        )}

        {/* AI Content */}
        {ai && (
          <>

            {/* AI Role Summary */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-4 flex items-center gap-3">

                <span className="text-2xl">
                  🤖
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  AI Role Summary
                </h3>

              </div>

              <p className="leading-7 text-gray-600">
                {ai.summary}
              </p>

            </div>

            {/* Key Skills */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                🎯 Key Skills to Prepare
              </h3>

              <div className="mt-5 flex flex-wrap gap-3">

                {ai.keySkills.map((skill, index) => (

                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Company Research */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                🏢 Company Research
              </h3>

              <ul className="mt-5 space-y-3">

                {ai.companyResearch.map((item, index) => (

                  <li
                    key={index}
                    className="rounded-xl bg-gray-50 p-4 leading-6 text-gray-700"
                  >
                    {item}
                  </li>

                ))}

              </ul>

            </div>

            {/* Technical Questions */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                💻 Technical Questions
              </h3>

              <div className="mt-5 space-y-3">

                {ai.technicalQuestions.map((question, index) => {

                  const id = index;
                  const completed =
                    completedQuestions.includes(id);

                  return (

                    <label
                      key={index}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                        completed
                          ? "border-green-200 bg-green-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >

                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleQuestion(id)}
                        className="mt-1 h-5 w-5"
                      />

                      <span
                        className={
                          completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }
                      >
                        {index + 1}. {question}
                      </span>

                    </label>

                  );
                })}

              </div>

            </div>

            {/* Behavioral Questions */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                🧠 Behavioral Questions
              </h3>

              <div className="mt-5 space-y-3">

                {ai.behavioralQuestions.map((question, index) => {

                  const id =
                    technicalCount + index;

                  const completed =
                    completedQuestions.includes(id);

                  return (

                    <label
                      key={index}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                        completed
                          ? "border-green-200 bg-green-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >

                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleQuestion(id)}
                        className="mt-1 h-5 w-5"
                      />

                      <span
                        className={
                          completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }
                      >
                        {index + 1}. {question}
                      </span>

                    </label>

                  );
                })}

              </div>

            </div>

            {/* System Design */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                🏗️ System Design Questions
              </h3>

              <div className="mt-5 space-y-3">

                {ai.systemDesignQuestions.map((question, index) => {

                  const id =
                    technicalCount +
                    behavioralCount +
                    index;

                  const completed =
                    completedQuestions.includes(id);

                  return (

                    <label
                      key={index}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                        completed
                          ? "border-green-200 bg-green-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >

                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleQuestion(id)}
                        className="mt-1 h-5 w-5"
                      />

                      <span
                        className={
                          completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }
                      >
                        {index + 1}. {question}
                      </span>

                    </label>

                  );
                })}

              </div>

            </div>

            {/* Study Schedule */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    📚 Study Schedule
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Complete each study day to stay on track.
                  </p>

                </div>

                <span className="text-sm font-semibold text-blue-600">
                  {completedDays.length}/
                  {ai.studySchedule.length} completed
                </span>

              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">

                {ai.studySchedule.map((item, index) => {

                  const completed =
                    completedDays.includes(index);

                  return (

                    <label
                      key={index}
                      className={`cursor-pointer rounded-xl border p-5 transition ${
                        completed
                          ? "border-green-200 bg-green-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >

                      <div className="flex items-start gap-3">

                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => toggleDay(index)}
                          className="mt-1 h-5 w-5"
                        />

                        <div>

                          <p
                            className={`text-sm font-semibold ${
                              completed
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            {item.day}
                          </p>

                          <p
                            className={`mt-2 ${
                              completed
                                ? "text-gray-500 line-through"
                                : "text-gray-800"
                            }`}
                          >
                            {item.focus}
                          </p>

                          {completed && (
                            <p className="mt-3 text-sm font-semibold text-green-600">
                              ✓ Completed
                            </p>
                          )}

                        </div>

                      </div>

                    </label>

                  );

                })}

              </div>

            </div>

            {/* Job Description */}
            {kit?.jobDescription && (
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h3 className="text-xl font-bold text-gray-900">
                  📄 Job Description
                </h3>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                  {kit.jobDescription}
                </p>

              </div>
            )}

          </>
        )}

        {/* No AI Data */}
        {!ai && (

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              🤖
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Your AI interview kit is ready to generate
            </h3>

            <p className="mt-2 text-gray-600">
              Create a new kit to generate personalized preparation.
            </p>

            <button
              onClick={() => {
                window.location.href = "/create";
              }}
              className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Create Interview Kit
            </button>

          </div>

        )}

      </section>

    </main>
  );
}