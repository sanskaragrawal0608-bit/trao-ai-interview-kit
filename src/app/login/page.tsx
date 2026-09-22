"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill all fields.");
    return;
  }

  const savedUser = localStorage.getItem("interviewUser");

  if (!savedUser) {
    setError("No account found. Please register first.");
    return;
  }

  const user = JSON.parse(savedUser);

  if (user.email !== email || user.password !== password) {
    setError("Invalid email or password.");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");

  router.push("/dashboard");
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
            Welcome back
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Login to continue your interview preparation.
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Password
              </label>

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
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}