import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, Page, linkClass } from "./_components";

export const metadata: Metadata = {
  title: APP_NAME,
};

const LINKS = [
  { href: "/omiyagezukan/support", label: "サポート・お問い合わせ" },
  { href: "/omiyagezukan/privacy", label: "プライバシーポリシー" },
];

export default function OmiyagezukanPage() {
  return (
    <Page back={{ href: "/", label: "トップに戻る" }}>
      <h1 className="mb-2 text-2xl font-bold">{APP_NAME}</h1>
      <p className="mb-8 text-sm text-slate-500">iPhoneアプリ</p>

      <p className="mb-8 leading-relaxed">
        日本のお土産を集める図鑑アプリです。お土産のパッケージを撮ると、写っている文字から商品を見つけて図鑑に登録できます。もらったお土産も、自分で買ったお土産も記録できます。無料・広告なしでご利用いただけます。
      </p>

      <section className="mb-10 rounded-lg border border-slate-200 p-6">
        <h2 className="mb-3 text-lg font-semibold">ダウンロード</h2>
        <p className="text-slate-600">App Storeにて近日公開</p>
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
    </Page>
  );
}
