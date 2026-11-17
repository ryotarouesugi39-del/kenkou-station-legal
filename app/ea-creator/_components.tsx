import Link from "next/link";

export const linkClass = "text-blue-600 hover:underline break-all";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:underline">
          ← トップに戻る
        </Link>
      </p>
      {children}
    </main>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="space-y-3 leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}
