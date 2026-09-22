"use client";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">
            AI Interview Prep Kit
          </h1>

          <div className="flex gap-3">
            <button
  onClick={() => {
    window.location.href = "/login";
  }}
  className="cursor-pointer rounded-lg border px-4 py-2 transition hover:bg-gray-100"
>
  Login
</button>

            <button
  onClick={() => {
    window.location.href = "/register";
  }}
  className="cursor-pointer rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
>
  Register
</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium text-blue-600">
            AI-Powered Interview Preparation
          </p>

          <h2 className="text-5xl font-bold tracking-tight">
            Turn any job description into your
            <span className="text-blue-600"> interview prep kit.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Add a job description, company website and interview timeline.
            Get a personalised company brief, role breakdown, questions,
            flashcards and study schedule.
          </p>

          <button
  onClick={() => {
    window.location.href = "/create";
  }}
  className="group cursor-pointer rounded-xl bg-black px-7 py-4 font-semibold text-white transition-all duration-200 hover:bg-gray-800"
>
  <span className="inline-flex items-center gap-2">
    Create Interview Kit
    <span className="transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  </span>
</button>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 pb-20 md:grid-cols-3">
        <Feature
          title="Company Research"
          description="Research the company and understand how they hire."
        />

        <Feature
          title="Question Bank"
          description="Generate role-specific technical and behavioural questions."
        />

        <Feature
          title="Study Schedule"
          description="Get a day-by-day preparation plan based on your timeline."
        />
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}