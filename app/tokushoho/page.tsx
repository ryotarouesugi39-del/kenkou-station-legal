import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
};

const DISCLOSE_ON_REQUEST = "ご請求があれば遅滞なく開示いたします";

export default function TokushohoPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "販売業者", value: siteConfig.operatorName },
    { label: "代表者", value: siteConfig.representative },
    { label: "所在地", value: DISCLOSE_ON_REQUEST },
    { label: "電話番号", value: DISCLOSE_ON_REQUEST },
    {
      label: "メールアドレス",
      value: (
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="text-blue-600 hover:underline"
        >
          {siteConfig.contactEmail}
        </a>
      ),
    },
    {
      label: "販売価格",
      value: "各プランの価格はアプリ内の購入画面に表示された金額によります",
    },
    {
      label: "商品代金以外の必要料金",
      value: "通信費等はお客様のご負担となります",
    },
    {
      label: "お支払い方法",
      value: "App Store／Google Playを通じたアプリ内課金",
    },
    {
      label: "お支払い時期",
      value:
        "ご購入手続き完了時（以降は各プランの周期に応じて自動更新）",
    },
    {
      label: "サービス提供時期",
      value: "お支払い手続き完了後、直ちにご利用いただけます",
    },
    {
      label: "返品・キャンセルについて",
      value: (
        <>
          デジタルサービスの性質上、購入後のご返金は原則お受けできません。
          定期購入の解約は、次回更新日の前までにApp Store／Google Playの設定からお手続きください
        </>
      ),
    },
    {
      label: "動作環境",
      value:
        "iOS／Androidの対応バージョンはアプリストアの掲載ページをご確認ください",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:underline">
          ← トップに戻る
        </Link>
      </p>

      <h1 className="mb-10 text-2xl font-bold">特定商取引法に基づく表記</h1>

      <dl className="divide-y divide-slate-200 border-y border-slate-200">
        {rows.map((row) => (
          <div key={row.label} className="py-4 sm:flex sm:gap-6">
            <dt className="mb-1 shrink-0 text-sm font-semibold text-slate-500 sm:mb-0 sm:w-48">
              {row.label}
            </dt>
            <dd className="leading-relaxed text-slate-700">{row.value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
