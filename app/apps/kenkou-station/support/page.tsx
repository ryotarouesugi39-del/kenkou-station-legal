import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: `サポート | ${app.name}`,
};

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link
          href={`/apps/${app.slug}`}
          className="text-sm text-slate-500 hover:underline"
        >
          ← {app.name}トップに戻る
        </Link>
      </p>

      <h1 className="mb-10 text-2xl font-bold">サポート</h1>

      <section className="mb-10 leading-relaxed">
        <p>
          「{app.name}」に関するご質問・不具合報告・ご要望などは、
          下記のお問い合わせ窓口までご連絡ください。
        </p>
      </section>

      <section className="mb-10 rounded-lg border border-slate-200 p-6">
        <h2 className="mb-4 text-lg font-semibold">お問い合わせ窓口</h2>
        <dl className="space-y-2">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">運営会社</dt>
            <dd>{siteConfig.operatorName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">メール</dt>
            <dd>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="leading-relaxed text-slate-600">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          よくあるお問い合わせ
        </h2>
        <p>
          お問い合わせの際は、ご利用の端末（iOS / Android）とOSバージョン、
          発生している症状を可能な範囲でご記載いただけますと、対応がスムーズ
          です。
        </p>
      </section>
    </main>
  );
}
