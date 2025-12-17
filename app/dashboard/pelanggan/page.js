"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PelangganListPage() {
  const [data, setData] = useState([]);

  async function load() {
    const d = await fetch("/api/pelanggan").then((r) => r.json());
    setData(d);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Pelanggan</h1>
        <Link
          href="/dashboard/pelanggan/tambah"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          + Tambah Pelanggan
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Alamat</th>
              <th className="p-3 text-left">No Telp</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  Belum ada pelanggan. Klik “Tambah Pelanggan”.
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{p.nama}</td>
                  <td className="p-3">{p.alamat}</td>
                  <td className="p-3">{p.notelp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
