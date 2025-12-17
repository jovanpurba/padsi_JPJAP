"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function KurirPage() {
  const [data, setData] = useState([]);

  async function load() {
    const d = await fetch("/api/kurir").then((r) => r.json());
    setData(d);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Kurir</h1>

        <Link
          href="/dashboard/kurir/tambah"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          + Tambah Kurir
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  Belum ada kurir. Klik “Tambah Kurir”.
                </td>
              </tr>
            ) : (
              data.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
