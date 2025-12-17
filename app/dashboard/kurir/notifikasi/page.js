"use client";
import { useEffect, useState } from "react";

export default function NotifikasiPage() {
  const [kurir, setKurir] = useState([]);
  const [kurirId, setKurirId] = useState("");
  const [notif, setNotif] = useState([]);

  async function loadKurir() {
    const k = await fetch("/api/kurir").then((r) => r.json());
    setKurir(k);
    if (k.length && !kurirId) setKurirId(k[0].id);
  }

  async function loadNotif(id) {
    if (!id) return;
    const n = await fetch(`/api/kurir/notifikasi?kurirId=${id}`).then((r) =>
      r.json()
    );
    setNotif(Array.isArray(n) ? n : []);
  }

  useEffect(() => {
    loadKurir();
  }, []);

  useEffect(() => {
    loadNotif(kurirId);
    const t = setInterval(() => loadNotif(kurirId), 3000); // refresh 3 detik
    return () => clearInterval(t);
  }, [kurirId]);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          Notifikasi{" "}
          <span className="text-sm text-gray-500">
            ({notif.length} tugas)
          </span>
        </h1>

        <select
          className="border p-2 rounded bg-white"
          value={kurirId}
          onChange={(e) => setKurirId(e.target.value)}
        >
          {kurir.map((k) => (
            <option key={k.id} value={k.id}>
              {k.username}
            </option>
          ))}
        </select>
      </div>

      {notif.length === 0 ? (
        <div className="text-gray-500">Tidak ada notifikasi</div>
      ) : (
        <div className="space-y-2">
          {notif.map((n) => (
            <div key={n.id} className="bg-white border rounded p-3 shadow-sm">
              <div className="font-medium">{n.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                Status: <b>{n.status}</b> | Tanggal:{" "}
                {new Date(n.tanggal).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
