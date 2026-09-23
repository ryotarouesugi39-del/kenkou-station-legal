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
        {siteConfig.operatorName}（以下「当社」といいます）は、当社が提供するアプリ「{app.name}」（以下「本サービス」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
      </p>

      <Section title="第1条（取得する情報）">
        <p className="mb-3">
          本サービスは、サービス提供にあたり以下の情報を取得します。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>ご本人およびご家族の氏名</li>
          <li>
            アカウント情報（メールアドレス、Googleアカウント・Apple IDの識別子）
          </li>
          <li>
            健康データ（血圧、体重、食事記録その他ユーザーが本サービスに記録する健康関連情報）
          </li>
          <li>
            歩数データ（HealthKit（iOS）またはHealth Connect（Android）経由で取得）
          </li>
          <li>
            食事の写真、および体重計・血圧計等の測定機器の表示を撮影した写真
          </li>
          <li>位置情報（第3条に定める範囲に限ります）</li>
          <li>
            購入情報（有料プランの契約・課金状態。クレジットカード番号等の決済情報は各ストアが管理し、当社は取得しません）
          </li>
          <li>端末情報、広告識別子、アプリの利用ログ</li>
        </ul>
      </Section>

      <Section title="第2条（要配慮個人情報の取得についての同意）">
        <p>
          本サービスでは、血圧・体重・歩数等の健康データその他、個人情報の保護に関する法律上の要配慮個人情報に該当しうる情報を取得します。当社は、ユーザーが本ポリシーの内容に同意のうえ本サービスを利用することをもって、これらの情報の取得についてご本人の同意を得るものとします。
        </p>
      </Section>

      <Section title="第3条（位置情報の取扱い）">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            取得目的：地域の天気情報を表示し、健康アドバイスに反映するためにのみ取得します。
          </li>
          <li>
            取得方法：端末の位置情報機能（GPS等）を使用して、アプリの利用時におおよその位置を取得します。位置情報の利用を許可しない場合でも、天気に関する機能以外は通常どおりご利用いただけます。
          </li>
          <li>
            保存・提供：位置情報は天気情報の取得のためにのみ使用し、当社のサーバーや端末に保存しません。天気情報の取得にあたっては、緯度・経度のみ（氏名等のユーザーを特定する情報は含みません）を天気予報サービス（Open-Meteo）に送信します。これ以外に、位置情報を第三者に提供することはありません。
          </li>
        </ul>
      </Section>

      <Section title="第4条（利用目的）">
        <p className="mb-3">当社は、取得した情報を以下の目的で利用します。</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>本サービスの提供・維持・改善のため</li>
          <li>健康データ・歩数データの記録、グラフ表示、傾向の把握のため</li>
          <li>
            AIによる食事写真の栄養素の推定、測定機器の写真からの数値の読み取り、健康アドバイスの生成のため
          </li>
          <li>天気情報に応じた健康アドバイスの表示のため</li>
          <li>ご家族との記録の共有（見守り）機能の提供のため</li>
          <li>有料プランの契約管理のため</li>
          <li>広告の配信のため</li>
          <li>お問い合わせへの対応、重要なお知らせの通知のため</li>
        </ul>
      </Section>

      <Section title="第5条（第三者提供・外部サービスへの委託）">
        <p className="mb-3">
          当社は、法令に基づく場合を除き、ユーザー本人の同意を得ることなく、取得した個人情報を第三者に提供することはありません。ただし、本サービスの提供に必要な範囲で、以下の外部サービスに情報の取扱いを委託しています。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Google Firebase（認証、データベース、ファイル保存、通知）</li>
          <li>RevenueCat（有料プランの契約管理）</li>
          <li>Groq（AIによる写真の解析、健康アドバイスの生成）</li>
          <li>Google AdMob（広告配信）</li>
          <li>Open-Meteo（天気情報の取得。送信するのは緯度・経度のみです）</li>
        </ul>
        <p className="mt-3">
          ご家族との共有機能を利用した場合、ユーザーが共有を設定した相手に、健康データ等の一部が表示されます。
        </p>
      </Section>

      <Section title="第6条（外国にある第三者への情報の移転）">
        <p>
          前条の外部サービスは、米国等の外国に所在するサーバーで情報を取り扱う場合があります。これらの国には、日本と同等の個人情報保護制度が整備されていない場合がありますが、当社は、各事業者が自社のセキュリティ基準に基づき適切に情報を管理していることを確認したうえで利用しています。
        </p>
      </Section>

      <Section title="第7条（広告識別子について）">
        <p>
          無料でご利用いただく場合、広告配信のために広告識別子（IDFA／AAID等）が利用されることがあります。有料プランのご契約中は広告が表示されないため、広告識別子は利用されません。広告識別子の利用は、端末の設定から制限することができます。
        </p>
      </Section>

      <Section title="第8条（個人情報の管理）">
        <p>
          当社は、取得した個人情報について、漏えい、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
        </p>
      </Section>

      <Section title="第9条（個人情報の開示・訂正・削除等）">
        <p>
          ユーザーは、当社が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を請求することができます。アプリ内のアカウント削除機能、または下記お問い合わせ先よりご連絡ください。
        </p>
      </Section>

      <Section title="第10条（本ポリシーの変更）">
        <p>
          当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
        </p>
      </Section>

      <Section title="第11条（お問い合わせ窓口）">
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
