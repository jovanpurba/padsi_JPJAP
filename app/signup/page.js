"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("KURIR");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function submit() {
    setErr("");
    setOk("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error || "Register gagal");
      return;
    }

    setOk("Register berhasil. Silakan login.");
    setTimeout(() => (location.href = "/"), 700);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[360px] text-center bg-white p-6 rounded shadow">
        <h1 className="text-3xl mb-6">Sign Up</h1>

        {err && <div className="text-red-600 mb-3 text-sm">{err}</div>}
        {ok && <div className="text-green-700 mb-3 text-sm">{ok}</div>}

        <input
          className="w-full p-2 mb-3 rounded border"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 rounded border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-2 mb-4 rounded border"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="KURIR">KURIR</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          onClick={submit}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded"
        >
          REGISTER
        </button>

        <div className="mt-4 text-sm">
          Sudah punya akun?{" "}
          <Link href="/" className="text-blue-600 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
