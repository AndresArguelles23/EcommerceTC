"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getProducts().then(setItems).catch(e => setErr(e.message)).finally(()=>setLoading(false));
  }, []);

  if (loading) return <main style={{padding:16}}>Cargando…</main>;
  if (err) return <main style={{padding:16}}>Error: {err}</main>;
  return (
    <main style={{padding:16}}>
      <h1>Productos</h1>
      <ul>
        {items.map(p => (
          <li key={p.id}>{p.name} — ${p.price} — Stock: {p.stock}</li>
        ))}
      </ul>
    </main>
  );
}
