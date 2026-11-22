import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  APP_NAME,
  PRIVACY_ENACTED,
  PRIVACY_UPDATED,
  Page,
  Section,
  linkClass,
} from "../_components";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${APP_NAME}`,
};

export default function OmiyagezukanPrivacyPage() {
  return (
    <Page>
      <h1 className="mb-2 text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mb-1 text-sm text-slate-500">
        対象アプリ：{APP_NAME}（iPhoneアプリ）
      </p>
      <p className="mb-10 text-sm text-slate-500">
        制定日：{PRIVACY_ENACTED}　/　最終更新日：{PRIVACY_UPDATED}
      </p>

      <p className="mb-8 leading-relaxed">
        {siteConfig.operatorName}（以下「当社」）は、iPhoneアプリ「{APP_NAME}」（以下「本アプリ」）における利用者の情報の取り扱いを、以下のとおり定めます。
      </p>

      <Section title="1. 収集する情報">
        <p>
          本アプリにはアカウント登録がありません。当社は、氏名・メールアドレス・位置情報などの個人情報を収集しません。
        </p>
      </Section>

      <Section title="2. カメラの利用">
        <p>
          お土産のパッケージを撮影するためにカメラを使います。写った文字の読み取りはiPhoneの中だけで行い、撮影した写真を外部に送信することはありません。
        </p>
      </Section>

      <Section title="3. 写真ライブラリの利用">
        <p>写真ライブラリは、次の場合にのみ使います。</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>図鑑に登録する写真を、利用者が選ぶとき</li>
          <li>
            達成画像を写真ライブラリに保存するとき（写真の追加のみを行い、既存の写真を読み取ることはありません）
          </li>
        </ul>
      </Section>

      <Section title="4. 端末の中に保存される情報">
        <p>
          次の情報は、すべて利用者のiPhoneの中だけに保存されます。当社のサーバーに送信されることはありません。
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>図鑑に登録した記録</li>
          <li>登録した写真</li>
          <li>メモ</li>
          <li>「食べたい」リスト</li>
          <li>利用者が追加・名前変更したお土産</li>
        </ul>
        <p>
          本アプリを削除すると、これらの保存データもすべて消去されます。
        </p>
      </Section>

      <Section title="5. アクセス解析・広告・外部サービス">
        <p>
          本アプリは、アクセス解析、広告、外部の計測サービス（Firebaseなど）を使用していません。
        </p>
      </Section>

      <Section title="6. 達成画像のシェア">
        <p>
          達成画像のシェアは、利用者がiPhoneの共有機能を使ってSNSなどに送信したときにのみ行われます。送信先での情報の取り扱いは、各サービスの規約・プライバシーポリシーに従います。
        </p>
      </Section>

      <Section title="7. 本ポリシーの変更">
        <p>
          今後、利用状況の計測や情報の送信を伴う機能を追加する場合は、その機能の提供前に本ページを更新します。
        </p>
      </Section>

      <Section title="8. お問い合わせ">
        <p>
          {siteConfig.operatorName}
          <br />
          メール：
          <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          サポートページ：
          <Link href="/omiyagezukan/support" className={linkClass}>
            {siteConfig.siteUrl}/omiyagezukan/support
          </Link>
        </p>
      </Section>
    </Page>
  );
}
