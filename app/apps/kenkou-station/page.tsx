import type { Metadata } from "next";
import Link from "next/link";
import { getApp } from "@/config/apps";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: app.name,
};

export default function KenkouStationPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:underline">
          ← トップに戻る
        </Link>
      </p>

      <h1 className="mb-2 text-2xl font-bold">{app.name}</h1>
      <p className="mb-12 text-slate-500">{app.description}</p>

      <nav className="space-y-3">
        <Link
          href={`/apps/${app.slug}/terms`}
          className="block text-blue-600 hover:underline"
        >
          利用規約 →
        </Link>
        <Link
          href={`/apps/${app.slug}/privacy`}
          className="block text-blue-600 hover:underline"
        >
          プライバシーポリシー →
        </Link>
        <Link
          href={`/apps/${app.slug}/support`}
          className="block text-blue-600 hover:underline"
        >
          サポート →
        </Link>
        <Link href="/tokushoho" className="block text-blue-600 hover:underline">
          特定商取引法に基づく表記 →
        </Link>
      </nav>
    </main>
  );
}
