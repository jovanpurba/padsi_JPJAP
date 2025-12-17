"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahPelangganPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", alamat: "", notelp: "" });

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/pelanggan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(payload?.error || "Gagal tambah pelanggan");
      return;
    }

    alert("Pelanggan berhasil ditambahkan ✅");
    router.push("/dashboard/pelanggan");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Tambah Pelanggan</h1>

      <form onSubmit={submit} className="bg-white rounded shadow p-4 space-y-3">
        <div>
          <label className="block text-sm mb-1">Nama</label>
          <input
            className="w-full border p-2 rounded"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Alamat</label>
          <input
            className="w-full border p-2 rounded"
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">No Telp</label>
          <input
            className="w-full border p-2 rounded"
            value={form.notelp}
            onChange={(e) => setForm({ ...form, notelp: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Simpan
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/pelanggan")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
