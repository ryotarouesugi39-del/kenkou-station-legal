import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, Card, Page, Title, linkClass } from "./_components";

export const metadata: Metadata = {
  title: APP_NAME,
};

const LINKS = [
  { href: "/apps/pro-yakyu-lineup/support", label: "サポート・よくある質問" },
  { href: "/apps/pro-yakyu-lineup/privacy", label: "プライバシーポリシー" },
];

export default function ProYakyuLineupPage() {
  return (
    <Page back={{ href: "/", label: "トップに戻る" }}>
      <Title>iPhoneアプリ</Title>

      <p className="mb-8 leading-relaxed text-slate-700">
        5人のプロ野球選手を、出題された成績の順に並べるクイズです。NPB公式記録（2026年レギュラーシーズン）の10項目（本塁打・打点・安打・盗塁・打率・勝利・奪三振・セーブ・ホールド・防御率）から出題します。ログイン・課金・広告はありません。
      </p>

      <div className="mb-10">
        <Card>
          <p className="mb-1 font-bold text-[#1C563D]">ダウンロード</p>
          <p className="text-slate-600">App Storeにて近日公開</p>
        </Card>
      </div>

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
