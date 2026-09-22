"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleRegister = (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!name || !email || !password) {
    setError("Please fill all fields.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  const existingUser = localStorage.getItem("interviewUser");

  if (existingUser) {
    const user = JSON.parse(existingUser);

    if (user.email === email) {
      setError("An account with this email already exists.");
      return;
    }
  }

  localStorage.setItem(
    "interviewUser",
    JSON.stringify({
      name,
      email,
      password,
    })
  );

  alert("Account created successfully!");

  router.push("/login");
};

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-5">
          <h1 className="text-xl font-bold">AI Interview Prep Kit</h1>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-2xl border bg-white p-10 shadow-sm">
          <h2 className="text-4xl font-bold tracking-tight">
            Create your account
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Start building your personalized interview preparation kit.
          </p>

          <form onSubmit={handleRegister} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}