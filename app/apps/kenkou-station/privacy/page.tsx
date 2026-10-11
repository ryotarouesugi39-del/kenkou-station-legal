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
            アカウント情報（メールアドレス、電話番号、Googleアカウント・Apple IDの識別子）
          </li>
          <li>
            健康データ（血圧、体重、体温、体脂肪、筋肉量、食事記録その他ユーザーが本サービスに記録する健康関連情報）
          </li>
          <li>
            歩数データ（HealthKit（iOS）またはHealth Connect（Android）経由で取得）
          </li>
          <li>
            食事の写真、および体重計・血圧計等の測定機器の表示を撮影した写真
          </li>
          <li>AIチャットに入力された文章</li>
          <li>ご家族との連携情報（招待コード、連携相手、共有設定）</li>
          <li>
            AI機能の利用に関する同意の記録（同意した日時、同意した内容のバージョン）
          </li>
          <li>位置情報（第3条に定める範囲に限ります）</li>
          <li>
            購入情報（有料プランの契約・課金状態。クレジットカード番号等の決済情報は各ストアが管理し、当社は取得しません）
          </li>
          <li>
            端末情報、広告識別子、プッシュ通知用の識別子（通知トークン）、アプリの利用ログ
          </li>
        </ul>
      </Section>

      <Section title="第2条（要配慮個人情報の取得についての同意）">
        <p>
          本サービスでは、血圧・体重・歩数等の健康データその他、個人情報の保護に関する法律上の要配慮個人情報に該当しうる情報を取得します。当社は、アカウント登録時に、ユーザーが本ポリシーの内容に同意する操作を行っていただくことをもって、これらの情報の取得についてご本人の同意を得るものとします。
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
            AIによる食事写真の栄養素の推定、測定機器の写真からの数値の読み取り、AIチャットの回答、週間・月間のレポートや健康アドバイスの生成のため
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
          1.
          当社は、法令に基づく場合を除き、ユーザー本人の同意を得ることなく、取得した個人情報を第三者に提供することはありません。ただし、本サービスの提供に必要な範囲で、以下の外部サービスに情報の取扱いを委託しています。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Google Firebase（認証、データベース、ファイル保存、通知）</li>
          <li>RevenueCat（有料プランの契約管理）</li>
          <li>
            Groq, Inc.（AIによる写真の解析、AIチャット、レポート・健康アドバイスの生成）
          </li>
          <li>Google AdMob（広告配信）</li>
          <li>Open-Meteo（天気情報の取得。送信するのは緯度・経度のみです）</li>
        </ul>

        <p className="mt-6 mb-3">2. AI機能について</p>
        <p className="mb-3">
          本サービスのAI機能では、次の情報を、米国の事業者Groq, Inc.に送信して処理します。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>食事や測定機器の写真</li>
          <li>AIチャットに入力された文章</li>
          <li>体重、血圧、体温、体脂肪、筋肉量、歩数などの記録</li>
          <li>
            ご家族とつながっている場合は、ご家族への通知文などを作成するための、ご本人の記録
          </li>
        </ul>
        <p className="mt-3">
          これらの送信は、アプリ内の同意画面で、ユーザーが同意した場合に限って行います。同意しない場合でも、AIを使用しない機能（記録、グラフ、通知など）はご利用いただけます。同意は、設定画面からいつでも取り消すことができ、取り消した後は、AI機能への情報の送信を行いません。
        </p>
        <p className="mt-3">
          ご家族を見守る機能では、見守られる方の記録は、その方ご本人が同意した場合に限り、AI機能に使用します。
        </p>
        <p className="mt-3">
          当社は、Groq, Inc.に対して、送信した入力と出力を保存しない設定（Zero Data Retention）を有効にしています。
        </p>

        <p className="mt-6">
          3.
          ご家族との共有機能を利用した場合、ユーザーが共有を設定した相手に、健康データ等の一部が表示されます。
        </p>
      </Section>

      <Section title="第6条（外国にある第三者への情報の移転）">
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            前条の外部サービスのうち、Groq, Inc.、Google（Firebase、AdMob）、RevenueCatは、米国の事業者であり、個人データを米国のサーバーで取り扱う場合があります。
          </li>
          <li>
            米国の個人情報の保護に関する制度の概要は、個人情報保護委員会が公表している資料をご参照ください。【入力：個人情報保護委員会の「外国における個人情報の保護に関する制度等の調査」のURLを入れる】
          </li>
          <li>
            当社は、これらの事業者に、本サービスの提供に必要な範囲に限って、情報を取り扱わせています。Groq, Inc.については、入力と出力を保存しない設定を有効にしています。
          </li>
          <li>
            Open-Meteoに送信するのは、緯度・経度のみで、ユーザーを特定する情報は含みません。【入力：Open-Meteoの所在国を確認して、必要なら書く】
          </li>
        </ol>
      </Section>

      <Section title="第7条（広告識別子について）">
        <p>
          無料でご利用いただく場合、広告配信のために広告識別子（IDFA／AAID等）が利用されることがあります。有料プランのご契約中は広告が表示されないため、広告識別子は利用されません。広告識別子の利用は、端末の設定から制限することができます。【入力：iOSで、トラッキングの許可（ATT）の確認を出している場合は、その旨を一文足す】
        </p>
      </Section>

      <Section title="第8条（個人情報の管理）">
        <p>
          当社は、取得した個人情報について、漏えい、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
        </p>
      </Section>

      <Section title="第9条（個人情報の開示・訂正・削除等）">
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            ユーザーは、当社が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を請求することができます。アプリ内のアカウント削除機能、または下記お問い合わせ先よりご連絡ください。
          </li>
          <li>
            アプリ内のアカウント削除機能により退会した場合、アカウントに紐づく健康記録・プロフィール・家族との連携等のデータは削除されます。
          </li>
          <li>AI機能への同意は、設定画面からいつでも取り消すことができます。</li>
        </ol>
      </Section>

      <Section title="第10条（本ポリシーの変更）">
        <p>
          当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。利用目的や外部サービスへの送信内容に関わる重要な変更を行う場合は、本サービス内でお知らせし、必要に応じて、改めて同意をお願いします。
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
            <dt className="w-24 shrink-0 text-slate-500">代表者</dt>
            <dd>{siteConfig.representative}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">所在地</dt>
            <dd>
              ご請求があれば遅滞なく開示いたします（{siteConfig.contactEmail}
              　までご連絡ください）
            </dd>
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
