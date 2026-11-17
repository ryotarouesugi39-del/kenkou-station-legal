import type { Metadata } from "next";
import { Page, Section, linkClass } from "../_components";

// 文章はApp Store審査・アプリ内リンク用の確定版。変更しないこと。
export const metadata: Metadata = {
  title: "プライバシーポリシー | EA CREATOR",
};

export default function EaCreatorPrivacyPage() {
  return (
    <Page>
      <h1 className="mb-2 text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mb-10 text-sm text-slate-500">
        EA CREATOR（iOSアプリ・Web版）　制定日：2026年11月17日
      </p>

      <p className="mb-8 leading-relaxed">
        株式会社トイマン（以下「当社」）は、EA CREATOR（以下「本アプリ」）における利用者の情報の取り扱いを、以下のとおり定めます。
      </p>

      <Section title="1. 収集する情報">
        <p>
          当社は、氏名・メールアドレスなどの個人情報を収集しません。アカウント登録もありません。ただし、iOSアプリでは広告表示のため、次の「3. 広告について」に記載する情報が広告配信事業者（Google）に送信されます。
        </p>
      </Section>

      <Section title="2. 端末の中に保存される情報">
        <p>
          次の情報は、利用者のiPhone（Web版はブラウザ）の中にだけ保存され、当社のサーバーや第三者に送信されることはありません。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>利用者が作成・保存した売買戦略（EAの設定）</li>
          <li>
            利用者が読み込んだ価格データ（MT4/MT5から書き出したCSVファイル）
          </li>
          <li>免責事項への同意などのアプリの設定</li>
        </ul>
        <p>これらはアプリを削除すると消去されます。</p>
      </Section>

      <Section title="3. 広告について">
        <p>
          iOSアプリでは、Google LLC が提供する広告配信サービス「Google AdMob」を利用してバナー広告を表示しています。AdMob は広告の配信・効果測定・不正防止のために、次の情報を収集することがあります。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>広告識別子（IDFA）。利用者が「トラッキングを許可」した場合のみ</li>
          <li>IPアドレスから推定されるおおよその地域</li>
          <li>
            端末の種類、OSのバージョン、広告の表示・タップの状況、アプリのクラッシュ情報など
          </li>
        </ul>
        <p>
          初回起動時に表示される「トラッキングの許可」で「Appにトラッキングしないように要求」を選ぶと、広告識別子は使われず、利用者に合わせた広告（パーソナライズ広告）は表示されません。許可の設定は、iPhoneの「設定」→「プライバシーとセキュリティ」→「トラッキング」からいつでも変更できます。
        </p>
        <p>
          Google による情報の取り扱いは、
          <a
            href="https://policies.google.com/privacy?hl=ja"
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google のプライバシーポリシー
          </a>
          および
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            広告に関するページ
          </a>
          をご覧ください。
        </p>
        <p>
          2.
          に記載した戦略・価格データは広告配信事業者を含む第三者に送信されません。当社が利用者の情報を販売することもありません。
        </p>
      </Section>

      <Section title="4. 共有機能について">
        <p>
          生成したコードを「共有」する場合、送り先（メール、メッセージ、ファイルアプリなど）は利用者が選びます。共有された内容の取り扱いは、各サービスのプライバシーポリシーに従います。
        </p>
      </Section>

      <Section title="5. Apple による統計情報">
        <p>
          利用者が端末の設定で「Appデベロッパと共有」を許可している場合、Apple からクラッシュ情報や利用状況の統計（個人を特定しない形）が当社に提供されることがあります。不具合の修正にのみ使います。
        </p>
      </Section>

      <Section title="6. 本ポリシーの変更">
        <p>
          機能の追加などにより本ポリシーを変更する場合は、このページで告知します。重要な変更（課金・サーバーとの通信の追加など）の際は、アプリ内でもお知らせします。
        </p>
      </Section>

      <Section title="7. お問い合わせ">
        <p>
          株式会社トイマン
          <br />
          メール：
          <a href="mailto:info@toiman.co.jp" className={linkClass}>
            info@toiman.co.jp
          </a>
        </p>
        <p>
          サポート：
          <a href="/ea-creator/support" className={linkClass}>
            https://toiman.co.jp/ea-creator/support
          </a>
        </p>
      </Section>
    </Page>
  );
}
