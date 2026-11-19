import type { Metadata } from "next";
import Link from "next/link";
import { Page, linkClass } from "./_components";

export const metadata: Metadata = {
  title: "EA CREATOR",
};

const LINKS = [
  { href: "/ea-creator/support", label: "サポート・よくある質問" },
  { href: "/ea-creator/privacy", label: "プライバシーポリシー" },
];

export default function EaCreatorPage() {
  return (
    <Page back={{ href: "/", label: "トップに戻る" }}>
      <h1 className="mb-2 text-2xl font-bold">EA CREATOR</h1>
      <p className="mb-8 text-sm text-slate-500">iOSアプリ</p>

      <p className="mb-8 leading-relaxed">
        EA CREATOR は、条件を選ぶだけで MT4/MT5
        用のEA（自動売買プログラム）のコードを作り、手元の価格データで簡易バックテストができる開発ツールです。注文・取引は一切行いません。
      </p>

      <section className="mb-10 rounded-lg border border-slate-200 p-6">
        <h2 className="mb-3 text-lg font-semibold">使ってみる</h2>
        <ul className="space-y-2 leading-relaxed">
          <li className="text-slate-600">iOSアプリ：App Storeにて近日公開</li>
        </ul>
      </section>

      <ul className="space-y-3">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-slate-500">
        本アプリは投資助言・売買推奨を行うものではありません。FXは元本を上回る損失が生じる可能性があります。
      </p>
    </Page>
  );
}
