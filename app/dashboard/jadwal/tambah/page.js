"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahJadwalPage() {
  const router = useRouter();
  const [pelanggan, setPelanggan] = useState([]);
  const [kurir, setKurir] = useState([]);

  const [form, setForm] = useState({
    pelangganId: "",
    tanggal: "",
    kurirId: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/pelanggan").then((r) => r.json()),
      fetch("/api/kurir").then((r) => r.json()),
    ]).then(([p, k]) => {
      setPelanggan(p);
      setKurir(k);
    });
  }, []);

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/jadwal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pelangganId: form.pelangganId,
        tanggal: form.tanggal,
        kurirId: form.kurirId || null,
      }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(payload?.error || "Gagal tambah jadwal");
      return;
    }

    alert("Jadwal dibuat & notifikasi dikirim ✅");
    router.push("/dashboard/jadwal");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Tambah Jadwal</h1>

      <form onSubmit={submit} className="bg-white rounded shadow p-4 space-y-3">
        <div>
          <label className="block text-sm mb-1">Pelanggan</label>
          <select
            className="w-full border p-2 rounded"
            value={form.pelangganId}
            onChange={(e) => setForm({ ...form, pelangganId: e.target.value })}
            required
          >
            <option value="">Pilih pelanggan</option>
            {pelanggan.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama} - {p.notelp}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Tanggal</label>
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Kurir (opsional)</label>
          <select
            className="w-full border p-2 rounded"
            value={form.kurirId}
            onChange={(e) => setForm({ ...form, kurirId: e.target.value })}
          >
            <option value="">Auto assign kurir</option>
            {kurir.map((k) => (
              <option key={k.id} value={k.id}>
                {k.username}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Simpan
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/jadwal")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
