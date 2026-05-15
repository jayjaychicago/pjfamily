"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";

export default function Home() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
      setStatus("Sent");
      e.currentTarget.reset();
    } else {
      setStatus("Error sending message");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <img
          src="/pjfamily.jpg"
          alt="Center"
          className="max-w-full rounded-2xl"
        />

        <form onSubmit={submit} className="w-full flex flex-col gap-3">
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
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onVerify={(token) => setToken(token)}
          />

          <button
            type="submit"
            className="bg-white text-black rounded-xl p-3 font-medium"
          >
            Send
          </button>

          <p className="text-sm text-neutral-400">{status}</p>
        </form>
      </div>
    </main>
  );
}