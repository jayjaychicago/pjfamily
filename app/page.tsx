"use client";

import React, { useState } from "react";
import Turnstile from "react-turnstile";

export default function Home() {
  const [token, setToken] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("loading");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
        token,
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src={showForm ? "/pjfamily.jpg" : "/crest.png"}
            alt={showForm ? "PJ Family" : "PJ Family crest"}
            className="max-w-full rounded-2xl"
          />

          <h1 className="text-4xl font-light tracking-wide text-center">
            une maison, mille mondes
          </h1>
        </div>

        {status === "success" ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Message sent
            </h2>

            <p className="text-neutral-400">
              We’ll get back to you soon.
            </p>
          </div>
        ) : !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-black rounded-xl px-8 py-3 font-medium hover:opacity-90 transition"
          >
            Contact Us for a playdate
          </button>
        ) : (
          <form
            onSubmit={submit}
            className="w-full flex flex-col gap-3"
          >
            <input
              name="name"
              placeholder="Name"
              required
              className="bg-neutral-900 border border-neutral-700 p-3 rounded-xl"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-neutral-900 border border-neutral-700 p-3 rounded-xl"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              className="bg-neutral-900 border border-neutral-700 p-3 rounded-xl"
            />

            <Turnstile
              sitekey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
              }
              onVerify={(token) => setToken(token)}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-black rounded-xl p-3 font-medium disabled:opacity-50"
            >
              {status === "loading"
                ? "Sending..."
                : "Send"}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Something went wrong.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}