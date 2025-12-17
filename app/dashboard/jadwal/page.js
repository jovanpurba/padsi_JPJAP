"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function JadwalListPage() {
  const [jadwal, setJadwal] = useState([]);

  async function load() {
    const data = await fetch("/api/jadwal").then((r) => r.json());
    setJadwal(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Jadwal</h1>

        <Link
          href="/dashboard/jadwal/tambah"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          + Tambah Jadwal
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Alamat</th>
              <th className="p-3 text-left">No Telp</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Kurir</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Belum ada jadwal. Klik “Tambah Jadwal”.
                </td>
              </tr>
            ) : (
              jadwal.map((j) => (
                <tr key={j.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{j.pelanggan?.nama || "-"}</td>
                  <td className="p-3">{j.pelanggan?.alamat || "-"}</td>
                  <td className="p-3">{j.pelanggan?.notelp || "-"}</td>
                  <td className="p-3">
                    {j.tanggal ? new Date(j.tanggal).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3">{j.kurir?.username || "-"}</td>
                  <td className="p-3 font-medium">{j.status || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
