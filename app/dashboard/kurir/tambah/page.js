"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahKurirPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/kurir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(payload?.error || "Gagal tambah kurir");
      return;
    }

    alert("Kurir berhasil ditambahkan ✅");
    router.push("/dashboard/kurir");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Tambah Kurir</h1>

      <form onSubmit={submit} className="bg-white rounded shadow p-4 space-y-3">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            className="w-full border p-2 rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            className="w-full border p-2 rounded"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Simpan
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/kurir")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
