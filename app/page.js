"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit() {
    setErr("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error || "Login gagal");
      return;
    }

    location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[320px] text-center bg-white p-6 rounded shadow">
        <h1 className="text-3xl mb-6">Login</h1>

        {err && <div className="text-red-600 mb-3 text-sm">{err}</div>}

        <input
          className="w-full p-2 mb-3 rounded border"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded border"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded"
        >
          LOGIN
        </button>

        <div className="mt-4 text-sm">
          Belum punya akun?{" "}
          <Link href="/signup" className="text-blue-600 underline">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
