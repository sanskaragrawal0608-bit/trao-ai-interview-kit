"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [jobDescription, setJobDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-kit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          companyWebsite,
          interviewDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate interview kit");
      }

      localStorage.setItem(
        "interviewKit",
        JSON.stringify({
          jobDescription,
          companyWebsite,
          interviewDate,
          aiKit: data,
        })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">
            AI Interview Prep Kit
          </h1>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-blue-600">
            Create your interview kit
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Prepare smarter for your interview.
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Add the job details and interview timeline to generate a
            personalized preparation plan.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
        >
          {/* Job Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={8}
              required
              className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Company Website
            </label>

            <input
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://company.com"
              className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Interview Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Interview Date
            </label>

            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Generating your interview kit..."
              : "Generate Interview Kit"}
          </button>
        </form>
      </section>
    </main>
  );
}