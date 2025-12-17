"use client";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
