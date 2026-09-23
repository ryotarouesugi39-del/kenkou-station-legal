import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";

const app = getApp("kenkou-station")!;

export const metadata: Metadata = {
  title: `利用規約 | ${app.name}`,
};

export default function TermsPage() {
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

      <h1 className="mb-2 text-2xl font-bold">利用規約</h1>
      <p className="mb-1 text-sm text-slate-500">対象アプリ：{app.name}</p>
      <p className="mb-10 text-sm text-slate-500">
        制定日：{app.termsEnactedDate}　/　最終更新日：{app.termsLastUpdated}
      </p>

      <p className="mb-8 leading-relaxed">
        この利用規約（以下「本規約」といいます）は、{siteConfig.operatorName}
        （以下「当社」といいます）が提供するスマートフォンアプリケーション
        「{app.name}」（以下「本サービス」といいます）の利用条件を定めるものです。
        本サービスをご利用になる方（以下「利用者」といいます）は、本規約に
        同意のうえご利用ください。
      </p>

      <Section title="第1条（規約への同意）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            利用者は、本サービスを利用することにより、本規約に同意したものと
            みなされます。
          </li>
          <li>
            未成年の方が本サービスを利用する場合は、親権者等の法定代理人の
            同意を得たうえでご利用ください。
          </li>
          <li>
            当社が本サービス内で掲示する個別の案内・注意事項は、本規約の一部を
            構成するものとします。
          </li>
        </ol>
      </Section>

      <Section title="第2条（サービスの内容）">
        <p className="mb-3">
          本サービスは、主にご高齢のご家族の健康状態を日々の記録を通じて
          見守ることを目的とした健康管理アプリであり、以下の機能を含みます。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>血圧・体重等の健康記録の入力・グラフ表示</li>
          <li>HealthKit／Health Connectと連携した歩数データの取得</li>
          <li>食事写真を撮影・選択して行う、AIによる栄養素の推定</li>
          <li>位置情報に基づく、地域の天気に応じた健康アドバイスの表示</li>
          <li>家族間で健康記録を共有する見守り機能</li>
          <li>アラート・通知機能</li>
        </ul>
        <p className="mt-3">
          機能の内容は、改善等のため予告なく追加・変更される場合があります。
        </p>
      </Section>

      <Section title="第3条（医療行為ではないことの確認）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            本サービスは、利用者ご自身およびご家族による健康管理を補助する
            ことを目的とするものであり、医師等による診断・治療・医学的助言に
            代わるものではありません。
          </li>
          <li>
            本サービスが表示するグラフ、AIによる栄養素の推定、健康アドバイス、
            数値に関する通知等は、一般的な情報の提供または目安であり、
            病気の有無や健康状態を判定するものではありません。
          </li>
          <li>
            体調に不安がある場合や、記録した数値が普段と大きく異なる場合は、
            本サービスの表示にかかわらず、医療機関にご相談ください。
            緊急の場合は119番通報等、適切な手段をとってください。
          </li>
          <li>
            本サービスの見守り機能・通知機能は、ご家族の状態を常時監視したり、
            異変を確実に検知したりすることを保証するものではありません。
          </li>
        </ol>
      </Section>

      <Section title="第4条（アカウント）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            本サービスの一部機能の利用には、アカウントの登録が必要です。
            登録には、メールアドレスのほか、Googleアカウント・Apple IDによる
            ログインを利用できます。
          </li>
          <li>
            利用者は、登録情報を正確かつ最新の状態に保つものとします。
          </li>
          <li>
            利用者は、自己のアカウントを自らの責任で管理するものとし、
            第三者に利用させ、または譲渡・貸与してはなりません。
          </li>
        </ol>
      </Section>

      <Section title="第5条（有料プラン）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            本サービスは、無料で利用できる機能に加え、有料の「個人プレミアム
            プラン」および「ペアプラン」（以下あわせて「有料プラン」といいます）を
            提供します。
          </li>
          <li>
            個人プレミアムプランの特典（広告の非表示、プレミアム機能の利用）は、
            購入されたご本人のみを対象とします。
          </li>
          <li>
            ペアプランの特典（広告の非表示、個人プレミアムプランの全機能、
            相互共有機能）は、相互共有リンクで結ばれたお二人の双方に及びます。
          </li>
          <li>
            個人プレミアムプランとペアプランは別個の契約です。両方を購入された
            場合は、それぞれの料金が別々に請求されます。不要になったプランは、
            第10条に従い利用者ご自身で解約してください。
          </li>
          <li>
            有料プランの料金、支払方法、更新周期は、アプリ内の購入画面および
            <Link href="/tokushoho" className="text-blue-600 hover:underline">
              特定商取引法に基づく表記
            </Link>
            のとおりとします。料金はApp Store／Google Playの決済システムを
            通じて請求され、解約手続きを行わない限り自動で更新されます。
          </li>
        </ol>
      </Section>

      <Section title="第6条（見守り（相互共有）機能）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            利用者は、相互共有リンクを結んだ相手に、健康記録・食事記録・
            アラート等の情報の一部が共有されることを理解したうえで、
            本機能を利用するものとします。共有される情報の範囲は、
            アプリ内の説明に従います。
          </li>
          <li>
            ご家族等の健康情報を記録・共有する場合は、事前にご本人の同意を
            得てください。
          </li>
          <li>
            共有相手との関係や共有する内容は、利用者ご自身の責任において
            管理してください。
          </li>
        </ol>
      </Section>

      <Section title="第7条（禁止事項）">
        <p className="mb-3">
          利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>
            他人の健康情報その他の個人情報を、ご本人の同意なく登録・取得・
            共有する行為
          </li>
          <li>他人になりすまして本サービスを利用する行為</li>
          <li>
            本サービスのサーバーやネットワークに過度な負荷をかける行為、
            不正アクセス、その他本サービスの運営を妨げる行為
          </li>
          <li>
            本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル
          </li>
          <li>当社または第三者の知的財産権、プライバシー等を侵害する行為</li>
          <li>本サービスを商業目的で第三者に利用させる行為</li>
          <li>その他、前各号に準じる行為として当社が不適切と判断する行為</li>
        </ul>
      </Section>

      <Section title="第8条（利用停止等）">
        <p>
          当社は、利用者が本規約に違反した場合、または本サービスの運営上
          やむを得ない事由がある場合には、事前の通知なく、当該利用者による
          本サービスの利用を停止し、またはアカウントを削除することができます。
        </p>
      </Section>

      <Section title="第9条（広告・外部サービス）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            本サービスの無料機能には、Google AdMob等の第三者配信事業者による
            広告が表示される場合があります。有料プランのご契約中は、広告は
            表示されません。
          </li>
          <li>
            本サービスは、Firebase（Google）、RevenueCat、AI画像解析サービス、
            HealthKit／Health Connect等の外部サービスと連携して機能を提供して
            います。これらの外部サービスの利用には、各提供者の定める利用条件が
            適用されます。
          </li>
          <li>
            利用者の情報の取扱いについては、別途定める
            <Link
              href={`/apps/${app.slug}/privacy`}
              className="text-blue-600 hover:underline"
            >
              プライバシーポリシー
            </Link>
            によるものとします。
          </li>
        </ol>
      </Section>

      <Section title="第10条（有料プランの解約・返金）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            有料プランの解約は、次回更新日の前までに、ご購入元のストア
            （App Store／Google Play）のアカウント設定から行ってください。
            アプリの削除やアカウントの削除だけでは、有料プランは解約されません。
          </li>
          <li>
            解約した場合でも、すでにお支払いいただいた期間の終了までは
            有料プランの特典をご利用いただけます。
          </li>
          <li>
            デジタルサービスの性質上、購入後の返金は原則としてお受けできません。
            返金の可否は、各ストアの定める規約・返金ポリシーに従います。
          </li>
        </ol>
      </Section>

      <Section title="第11条（退会）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            利用者は、アプリ内のアカウント削除機能により、いつでも退会する
            ことができます。
          </li>
          <li>
            退会すると、健康記録・プロフィール・家族との連携等、アカウントに
            関するデータは削除され、元に戻すことはできません。
          </li>
          <li>
            有料プランをご契約中の場合は、退会前に第10条に従って解約手続きを
            行ってください。
          </li>
        </ol>
      </Section>

      <Section title="第12条（知的財産権）">
        <p>
          本サービスに関する著作権その他の知的財産権は、当社または正当な
          権利を有する第三者に帰属します。利用者が本サービスに記録したデータの
          権利は、利用者に帰属します。
        </p>
      </Section>

      <Section title="第13条（サービスの変更・停止・終了）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            当社は、システムの保守、障害への対応、天災その他やむを得ない事由が
            ある場合、本サービスの全部または一部の提供を一時的に停止することが
            あります。
          </li>
          <li>
            当社は、本サービスの全部または一部を終了する場合、相当の期間を
            おいて事前に本サービス内等で通知します。
          </li>
        </ol>
      </Section>

      <Section title="第14条（免責事項）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            当社は、本サービスが利用者の特定の目的に適合すること、期待する
            正確性・有用性を有すること、および不具合が生じないことを保証
            しません。
          </li>
          <li>
            当社は、本サービスに関して利用者に生じた損害について、当社の故意
            または重大な過失による場合を除き、責任を負いません。
          </li>
          <li>
            前項にかかわらず、利用者が消費者契約法上の消費者に該当する場合で
            あって、当社の過失（重大な過失を除きます）により利用者に損害が
            生じたときは、当社は、利用者に現実に生じた通常の損害に限り、
            当該損害が生じた月に利用者が当社に支払った有料プランの料金の額を
            上限として賠償します。
          </li>
        </ol>
      </Section>

      <Section title="第15条（規約の変更）">
        <p>
          当社は、民法の定型約款の変更に関する規定に基づき、本規約を変更する
          ことがあります。変更する場合は、変更後の内容と効力発生日を、
          効力発生日までに相当な期間をおいて本サービス内または本ページで
          お知らせします。
        </p>
      </Section>

      <Section title="第16条（準拠法・管轄裁判所）">
        <ol className="list-decimal space-y-1 pl-6">
          <li>本規約は、日本法に準拠して解釈されるものとします。</li>
          <li>
            本サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の
            専属的合意管轄裁判所とします。
          </li>
        </ol>
      </Section>

      <Section title="第17条（お問い合わせ窓口）">
        <p>本規約に関するお問い合わせは、下記の窓口までお願いいたします。</p>
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
