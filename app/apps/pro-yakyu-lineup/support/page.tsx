import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { APP_NAME, Card, Page, Section, Title, linkClass } from "../_components";

export const metadata: Metadata = {
  title: `サポート | ${APP_NAME}`,
};

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "記録を消したい",
    a: "情報ボタン（ⓘ）の「記録をリセット」から削除できます。",
  },
  {
    q: "機種変更で記録は引き継げる？",
    a: "記録は端末内だけに保存しているため引き継げません。",
  },
  {
    q: "成績データが間違っている",
    a: "下記の問い合わせ先へ、項目と選手名を添えてご連絡ください。",
  },
  {
    q: "ログインや課金は？",
    a: "ありません。広告もありません。",
  },
];

export default function ProYakyuLineupSupportPage() {
  return (
    <Page>
      <Title>サポート</Title>

      <Section title="アプリについて">
        <p>
          5人のプロ野球選手を、出題された成績の順に並べるクイズです。NPB公式記録（2026年レギュラーシーズン）の10項目（本塁打・打点・安打・盗塁・打率・勝利・奪三振・セーブ・ホールド・防御率）から出題します。
        </p>
      </Section>

      <Section title="遊び方">
        <ol className="list-decimal space-y-2 pl-6">
          <li>カードを長押ししてドラッグするか、↑↓ボタンで並べ替えます。</li>
          <li>並べ終わったら「答え合わせ」をタップします。</li>
        </ol>
        <ul className="list-disc space-y-1 pl-6">
          <li>防御率だけは、数値の低い順に並べます。</li>
          <li>同じ数値の選手どうしは、順不同で正解になります。</li>
          <li>ホームの「出題項目」で、1つの項目に絞って遊べます。</li>
        </ul>
      </Section>

      <Section title="よくある質問">
        {FAQ.map(({ q, a }) => (
          <Card key={q}>
            <p className="mb-1 font-bold text-slate-800">Q. {q}</p>
            <p>A. {a}</p>
          </Card>
        ))}
      </Section>

      <Section title="動作環境">
        <p>iOS 17以降のiPhone</p>
      </Section>

      <Section title="お問い合わせ">
        <Card>
          <dl className="space-y-2">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-500">運営者</dt>
              <dd>{siteConfig.operatorName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-500">メール</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className={linkClass}
                >
                  {siteConfig.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </Card>
      </Section>

      <p className="mb-10 text-sm leading-relaxed text-slate-500">
        ※本アプリは{siteConfig.operatorName}
        が制作した非公式のクイズゲームで、日本野球機構（NPB）、各球団、選手とは関係ありません。
      </p>

      <p className="text-sm">
        <Link href="/apps/pro-yakyu-lineup/privacy" className={linkClass}>
          プライバシーポリシー →
        </Link>
      </p>
    </Page>
  );
}
