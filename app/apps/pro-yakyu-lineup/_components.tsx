import Link from "next/link";

export const APP_NAME = "プロ野球成績ラインナップ";
/** プライバシーポリシーの制定日 */
export const PRIVACY_ENACTED = "2026年11月25日";

const ACCENT = "#1C563D";
const BG = "#EEF2E9";

export const linkClass =
  "font-medium text-[#1C563D] underline decoration-[#1C563D]/40 underline-offset-2 hover:decoration-[#1C563D] break-all";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: BG }}>
      <main className="mx-auto max-w-2xl px-5 py-12 text-slate-800 sm:px-6 sm:py-16">
        <p className="mb-8">
          <Link href="/" className="text-sm text-slate-500 hover:underline">
            ← トップに戻る
          </Link>
        </p>
        {children}
      </main>
    </div>
  );
}

/** 「アプリ名 + ページ名」を単語の途中で折り返さないように表示する */
export function Title({ children }: { children: string }) {
  return (
    <h1
      className="mb-8 border-l-4 pl-3 text-2xl font-bold leading-snug"
      style={{ borderColor: ACCENT, color: ACCENT }}
    >
      <span className="inline-block">{APP_NAME}</span>{" "}
      <span className="inline-block">{children}</span>
    </h1>
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
    <section className="mb-9">
      <h2 className="mb-3 text-lg font-bold" style={{ color: ACCENT }}>
        {title}
      </h2>
      <div className="space-y-3 leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#1C563D]/15 bg-white/70 p-5">
      {children}
    </div>
  );
}
