import Link from "next/link";

export const APP_NAME = "お土産図鑑";
/** プライバシーポリシーの日付（内容を変えたら最終更新日を更新する） */
export const PRIVACY_ENACTED = "2026年11月23日";
export const PRIVACY_UPDATED = "2026年11月23日";

export const linkClass = "text-blue-600 hover:underline break-all";

export function Page({
  children,
  back = { href: "/omiyagezukan", label: `${APP_NAME}トップに戻る` },
}: {
  children: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link href={back.href} className="text-sm text-slate-500 hover:underline">
          ← {back.label}
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
