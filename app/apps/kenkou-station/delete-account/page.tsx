import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: `アカウント削除について | ${app.name}`,
};

export default function DeleteAccountPage() {
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

      <h1 className="mb-2 text-2xl font-bold">アカウント削除について</h1>
      <p className="mb-1 text-sm text-slate-500">対象アプリ：{app.name}</p>
      <p className="mb-1 text-sm text-slate-500">
        運営会社：{siteConfig.operatorName}
      </p>
      <p className="mb-10 text-sm text-slate-500">
        制定日：{app.deleteAccountEnactedDate}　/　最終更新日：
        {app.deleteAccountLastUpdated}
      </p>

      <p className="mb-10 leading-relaxed">
        「{app.name}」のアカウントとデータの削除（退会）には、アプリ内で削除する方法と、アプリを使わずにメールで削除を依頼する方法の2つがあります。本ページでは、それぞれの手順と、削除されるデータについてご案内します。
      </p>

      <Section title="方法1：アプリ内で削除する" highlight>
        <p className="mb-3">
          アプリにログインできる場合は、以下の手順でご自身で削除できます。
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>アプリ下部のメニューから「設定」を開く</li>
          <li>
            「アカウント」セクションにある「アカウントを削除する」を押す
          </li>
          <li>
            表示される確認ダイアログで「削除する」を押す。表示名（ユーザー名）の入力を求められた場合は、誤操作防止のため入力してから確定する（表示名を設定していないアカウントでは、この入力は表示されません）
          </li>
          <li>
            ログイン方法によっては、本人確認のため再ログイン（Google／Apple再認証、SMS確認コード、またはメール内リンクの確認）を求められることがあります。案内に従って操作してください
          </li>
        </ol>
        <p className="mt-3">
          削除操作は即時に実行され、完了後は元に戻すことはできません。
        </p>
      </Section>

      <Section title="方法2：アプリを使わずにメールで依頼する" highlight>
        <p className="mb-3">
          端末を紛失した場合など、アプリ内の操作ができない場合は、以下の宛先まで削除をご依頼ください。
        </p>
        <dl className="mb-4 space-y-2 rounded-lg border border-slate-200 p-4">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">宛先</dt>
            <dd>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">件名</dt>
            <dd>「アカウント削除依頼」などとご記載ください</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-slate-500">本文</dt>
            <dd>アプリに登録している表示名（ユーザー名）をご記載ください</dd>
          </div>
        </dl>
        <p className="mb-3">
          本人確認のため、以下の2点をいずれも満たすようお願いいたします。満たしていない場合、確認のご連絡をさせていただくことがあります。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>アプリに登録しているメールアドレスからご連絡いただくこと</li>
          <li>本文に、アプリに登録している表示名（ユーザー名）をご記載いただくこと</li>
        </ul>
        <p className="mt-3">
          確認のうえ、当社にて削除手続きを行います。手続きが完了しましたら、ご連絡したメールアドレス宛にご報告します。
        </p>
      </Section>

      <Section title="削除されるデータ・残るデータ・期間">
        <p className="mb-4">
          上記いずれの方法でも、削除される内容・保持される内容は同じです。アカウントに紐づく主なデータは、削除操作の完了後に削除されます。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left">
                <th className="py-2 pr-4 font-semibold">区分</th>
                <th className="py-2 pr-4 font-semibold">データの種類</th>
                <th className="py-2 font-semibold">削除・保持までの期間</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 align-top">
                <td className="py-3 pr-4 font-medium">削除されるデータ</td>
                <td className="py-3 pr-4">
                  健康記録（血圧・体重・食事記録等）、プロフィール情報、歩数データ、AIチャットの履歴、月間レポート、見守り（家族連携）に関する情報、食事の写真、アプリの利用に伴う端末上のキャッシュ、アカウント情報（ログイン情報）
                </td>
                <td className="py-3">削除操作の完了後、速やかに削除</td>
              </tr>
              <tr className="border-b border-slate-200 align-top">
                <td className="py-3 pr-4 font-medium">
                  当社では保存していないデータ
                </td>
                <td className="py-3 pr-4">
                  血圧計・体重計等の測定機器の表示を撮影した写真（数値の読み取りのためAIサービスに送信するのみで、当社サーバーには保存しません）
                </td>
                <td className="py-3">
                  もともと保存していないため、削除対象自体がありません
                </td>
              </tr>
              <tr className="border-b border-slate-200 align-top">
                <td className="py-3 pr-4 font-medium">
                  システムの運用ログに一定期間残るデータ
                </td>
                <td className="py-3 pr-4">
                  通知の送信処理等に伴い、運用上の記録として一時的に残る、アカウントの識別情報（ID）や通知内容
                </td>
                <td className="py-3">
                  システム基盤（Google
                  Cloud）の既定の保持期間（最長30日程度）に従い、その後消去されます
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-medium">
                  残るデータ
                  <br />
                  （保持されるデータ）
                </td>
                <td className="py-3 pr-4">
                  有料プランの購入履歴・決済記録（App
                  Store／Google
                  Play／決済管理サービス（RevenueCat）側に、各決済事業者の規約・法令に基づき保持されます）
                </td>
                <td className="py-3">
                  当社では管理していないため、各決済事業者の規約・保存期間によります
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          ※
          週間レポートおよびカスタム項目（プレミアムプランで追加できる記録項目の設定）は、現在のバージョンでは削除対象に含まれていません。アプリの次回更新（バージョン1.0.1）で削除対象に追加される予定です。
        </p>
      </Section>

      <Section title="お問い合わせ">
        <p>
          アカウント削除に関するご質問は、
          <Link
            href={`/apps/${app.slug}/support`}
            className="text-blue-600 hover:underline"
          >
            サポートページ
          </Link>
          、または下記の窓口までお願いいたします。
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

      <p className="mt-12 text-sm text-slate-500">以上</p>
    </main>
  );
}

function Section({
  title,
  children,
  highlight = false,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <section className="mb-8">
      <h2
        className={
          highlight
            ? "mb-3 text-xl font-bold text-slate-900"
            : "mb-3 text-lg font-semibold"
        }
      >
        {title}
      </h2>
      <div className="leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}
