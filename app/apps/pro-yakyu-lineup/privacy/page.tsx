import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  APP_NAME,
  PRIVACY_ENACTED,
  Page,
  Section,
  Title,
  linkClass,
} from "../_components";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${APP_NAME}`,
};

export default function ProYakyuLineupPrivacyPage() {
  return (
    <Page>
      <Title>プライバシーポリシー</Title>

      <Section title="運営者">
        <p>{siteConfig.operatorName}</p>
      </Section>

      <Section title="収集する情報">
        <p>
          本アプリは、氏名・メールアドレス・位置情報・端末識別子などの個人情報を収集しません。開発者のサーバーへプレイ記録を送信しません。
        </p>
      </Section>

      <Section title="端末内に保存する情報">
        <p>
          パーフェクト回数と、選んだ出題項目のみを端末内に保存します。アプリ内の「記録をリセット」またはアプリの削除で消去できます。
        </p>
      </Section>

      <Section title="広告・解析・トラッキング">
        <p>
          使用していません。第三者へのデータ提供もありません。
        </p>
      </Section>

      <Section title="外部リンク">
        <p>アプリ内に外部サイトへのリンクはありません。</p>
      </Section>

      <Section title="お問い合わせ時の情報">
        <p>
          お問い合わせの際にいただいたメールアドレス等は、返信のためだけに使用します。
        </p>
      </Section>

      <Section title="本ポリシーの変更">
        <p>本ポリシーを変更する場合は、このページで告知します。</p>
      </Section>

      <Section title="お問い合わせ先">
        <p>
          {siteConfig.operatorName}
          <br />
          メール：
          <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          <Link href="/apps/pro-yakyu-lineup/support" className={linkClass}>
            サポートページ →
          </Link>
        </p>
      </Section>

      <p className="text-sm text-slate-500">制定日：{PRIVACY_ENACTED}</p>
    </Page>
  );
}
