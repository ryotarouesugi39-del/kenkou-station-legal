import type { Metadata } from "next";
import { Page, Section, linkClass } from "../_components";

// 文章はApp Store審査・アプリ内リンク用の確定版。変更しないこと。
export const metadata: Metadata = {
  title: "サポート | EA CREATOR",
};

function Qa({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-1 font-semibold text-slate-800">Q. {q}</p>
      <p>{children}</p>
    </div>
  );
}

export default function EaCreatorSupportPage() {
  return (
    <Page>
      <h1 className="mb-2 text-2xl font-bold">サポート</h1>
      <p className="mb-10 text-sm text-slate-500">EA CREATOR（iOSアプリ）</p>

      <p className="mb-10 leading-relaxed">
        EA CREATOR は、条件を選ぶだけで MT4/MT5
        用のEA（自動売買プログラム）のコードを作り、手元の価格データで簡易バックテストができる開発ツールです。注文・取引は一切行いません。
      </p>

      <Section title="よくある質問">
        <Qa q="バックテスト用の価格データはどうやって用意しますか？">
          パソコンのMT4/MT5で、アプリに同梱の書き出しスクリプトを使ってCSVを書き出し、iPhoneに送って読み込みます。詳しい手順はアプリの「バックテスト」→「データの用意のしかた」をご覧ください。iPhone版のMT4/MT5からは書き出せないため、パソコンが必要です。
        </Qa>
        <Qa q="生成したEAはそのまま使えますか？">
          MetaEditorでコンパイルし、ストラテジーテスターとデモ口座で十分に検証してからご利用ください。アプリの「エラーを修正」タブで、コンパイルエラーの修正もできます。
        </Qa>
        <Qa q="アプリ内のバックテストとMT4/MT5の結果が違います。">
          アプリのバックテストは足の始値・高値・安値・終値を使う簡易テストのため、ストラテジーテスターと少し違うことがあります。
        </Qa>
        <Qa q="料金はかかりますか？">
          現在のバージョンはすべての機能を無料でご利用いただけます（画面下に広告が表示されます）。
        </Qa>
      </Section>

      <section className="mb-8 rounded-lg border border-slate-200 p-6">
        <h2 className="mb-3 text-lg font-semibold">お問い合わせ</h2>
        <div className="space-y-3 leading-relaxed text-slate-700">
          <p>
            不具合・ご要望は、下記までメールでお送りください。お使いのiPhoneの機種・iOSのバージョン・アプリのバージョンを書いていただけると助かります。
          </p>
          <p>
            株式会社トイマン
            <br />
            メール：
            <a href="mailto:info@toiman.co.jp" className={linkClass}>
              info@toiman.co.jp
            </a>
          </p>
        </div>
      </section>

      <Section title="ご注意">
        <p>
          本アプリは投資助言・売買推奨を行うものではありません。FXは元本を上回る損失が生じる可能性があります。過去の検証結果は将来の利益を保証しません。
        </p>
        <p>
          プライバシーポリシー：
          <a href="/ea-creator/privacy" className={linkClass}>
            https://toiman.co.jp/ea-creator/privacy
          </a>
        </p>
      </Section>
    </Page>
  );
}
