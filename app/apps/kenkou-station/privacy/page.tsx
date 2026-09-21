import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${app.name}`,
};

export default function PrivacyPolicyPage() {
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

      <h1 className="mb-2 text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mb-1 text-sm text-slate-500">対象アプリ：{app.name}</p>
      <p className="mb-10 text-sm text-slate-500">
        制定日：{app.privacyEnactedDate}　/　最終更新日：
        {app.privacyLastUpdated}
      </p>

      <p className="mb-8 leading-relaxed">
        {siteConfig.operatorName}（以下「当社」といいます）は、当社が提供する
        アプリ「{app.name}」（以下「本サービス」といいます）における、
        ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー
        （以下「本ポリシー」といいます）を定めます。
      </p>

      <Section title="第1条（取得する情報）">
        <p className="mb-3">
          本サービスは、サービス提供にあたり以下の情報を取得します。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>ご本人およびご家族の氏名</li>
          <li>
            健康データ（血圧、体重、食事記録その他ユーザーが本サービスに
            記録する健康関連情報）
          </li>
          <li>メールアドレス</li>
        </ul>
      </Section>

      <Section title="第2条（利用目的）">
        <p className="mb-3">当社は、取得した情報を以下の目的で利用します。</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>本サービスの提供・維持・改善のため</li>
          <li>AIによる健康アドバイスの生成のため</li>
          <li>お問い合わせへの対応のため</li>
        </ul>
      </Section>

      <Section title="第3条（第三者提供）">
        <p>
          当社は、法令に基づく場合を除き、ユーザー本人の同意を得ることなく、
          取得した個人情報を第三者に提供することはありません。
        </p>
      </Section>

      <Section title="第4条（個人情報の管理）">
        <p>
          当社は、取得した個人情報について、漏えい、滅失または毀損の防止その他
          の個人情報の安全管理のために必要かつ適切な措置を講じます。
        </p>
      </Section>

      <Section title="第5条（個人情報の開示・訂正・削除等）">
        <p>
          ユーザーは、当社が保有する自己の個人情報について、開示、訂正、追加、
          削除、利用停止を請求することができます。ご希望の場合は、下記
          お問い合わせ先までご連絡ください。
        </p>
      </Section>

      <Section title="第6条（本ポリシーの変更）">
        <p>
          当社は、必要に応じて本ポリシーの内容を変更することがあります。
          変更後のプライバシーポリシーは、本ページに掲載した時点から効力を
          生じるものとします。
        </p>
      </Section>

      <Section title="第7条（お問い合わせ窓口）">
        <p>
          本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
        </p>
        <dl className="mt-3 space-y-1">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">運営者</dt>
            <dd>{siteConfig.operatorName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">連絡先</dt>
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
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}
