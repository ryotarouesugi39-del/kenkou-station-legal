import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { APP_NAME, Page, Section, linkClass } from "../_components";

export const metadata: Metadata = {
  title: `サポート | ${APP_NAME}`,
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "機種変更すると記録は消えますか？",
    a: "現在のバージョンでは、記録を新しいiPhoneに引き継ぐことはできません。記録はすべてお使いのiPhoneの中だけに保存されています。",
  },
  {
    q: "アプリを削除するとどうなりますか？",
    a: "登録した記録・写真・メモ・「食べたい」リストなど、アプリに保存したデータはすべて消えます。",
  },
  {
    q: "パッケージを撮っても商品が見つかりません。",
    a: "商品名が大きく写るように、明るい場所でパッケージの正面を撮ってみてください。見つからない場合は、お土産を自分で追加して登録することもできます。",
  },
  {
    q: "料金はかかりますか？",
    a: "無料でご利用いただけます。広告も表示されません。",
  },
];

export default function OmiyagezukanSupportPage() {
  return (
    <Page>
      <h1 className="mb-2 text-2xl font-bold">サポート・お問い合わせ</h1>
      <p className="mb-10 text-sm text-slate-500">{APP_NAME}（iPhoneアプリ）</p>

      <p className="mb-10 leading-relaxed">
        「{APP_NAME}」は、日本のお土産を集める図鑑アプリです。お土産のパッケージを撮ると、写っている文字から商品を見つけて図鑑に登録できます。もらったお土産も、自分で買ったお土産も記録できます。
      </p>

      <section className="mb-10 rounded-lg border border-slate-200 p-6">
        <h2 className="mb-3 text-lg font-semibold">お問い合わせ</h2>
        <div className="space-y-3 leading-relaxed text-slate-700">
          <p>
            不具合・ご要望などは、下記までメールでお送りください。お使いのiPhoneの機種・iOSのバージョン・アプリのバージョンを書いていただけると、対応がスムーズです。
          </p>
          <dl className="space-y-2">
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-slate-500">運営会社</dt>
              <dd>{siteConfig.operatorName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 text-slate-500">メール</dt>
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
        </div>
      </section>

      <Section title="よくある質問">
        {FAQ.map(({ q, a }) => (
          <div key={q} className="mb-4">
            <p className="mb-1 font-semibold text-slate-800">Q. {q}</p>
            <p>{a}</p>
          </div>
        ))}
      </Section>

      <Section title="地図の出典">
        <p>
          地図：「地球地図日本」（国土地理院）
          <a
            href="https://www.gsi.go.jp/kankyochiri/gm_jpn.html"
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.gsi.go.jp/kankyochiri/gm_jpn.html
          </a>{" "}
          をもとに加工して作成。地球地図日本 © 国土地理院
        </p>
      </Section>

      <p className="text-sm">
        <Link href="/omiyagezukan/privacy" className={linkClass}>
          プライバシーポリシー →
        </Link>
      </p>
    </Page>
  );
}
