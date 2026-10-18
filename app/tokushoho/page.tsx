import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
};

const DISCLOSE_ON_REQUEST = (
  <>
    ご請求があれば遅滞なく開示いたします（{siteConfig.contactEmail}
    　までご連絡ください）
  </>
);

// Android版では、現在プレミアムプランを購入できない旨の注意。
// 「お支払い方法」「返品・キャンセルについて」の両方に、目立つ枠で出す。
// 購入できるようになった際は、この定数とconfig/apps.tsの最終更新日を更新して
// 注意枠を外す。
const ANDROID_PURCHASE_NOTICE = (
  <p
    role="note"
    className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900"
  >
    Android版（Google Play）では、現在、プレミアムプランをご購入いただけません。購入できるようになった際は、本ページを更新します。
  </p>
);

export default function TokushohoPage() {
  const app = getApp("kenkou-station");
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
      value: (
        <>
          プレミアムプラン：月額600円（税込）
          <br />
          ※実際の価格は、アプリ内の購入画面に表示された金額によります
        </>
      ),
    },
    {
      label: "商品代金以外の必要料金",
      value: "通信費等はお客様のご負担となります",
    },
    {
      label: "お支払い方法",
      value: (
        <>
          App Store／Google Playを通じたアプリ内課金
          {ANDROID_PURCHASE_NOTICE}
        </>
      ),
    },
    {
      label: "お支払い時期",
      value: "ご購入手続き完了時（以降は、1か月ごとに自動更新）",
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
          定期購入の解約は、次回更新日の前までに、App Store／Google
          Playの設定からお手続きください。アプリやアカウントを削除しても、解約にはなりません。
          {ANDROID_PURCHASE_NOTICE}
        </>
      ),
    },
    {
      label: "動作環境",
      value:
        "iOS／Androidの対応バージョンは、アプリストアの掲載ページをご確認ください",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-slate-800">
      <p className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:underline">
          ← トップに戻る
        </Link>
      </p>

      <h1 className="mb-2 text-2xl font-bold">特定商取引法に基づく表記</h1>
      {app && (
        <p className="mb-10 text-sm text-slate-500">
          最終更新日：{app.tokushohoLastUpdated}
        </p>
      )}

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
