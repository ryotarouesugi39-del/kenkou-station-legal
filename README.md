# 株式会社トイマン - 各アプリ プライバシーポリシー / サポートページ

株式会社トイマンが運営する各アプリの、プライバシーポリシーとサポート
ページのみを提供する静的サイトです。会社全体のコーポレートサイトは
このリポジトリの対象外です。

現在登録済みのアプリ: 健康ステーション（今後、他アプリも追加予定）

- フレームワーク: Next.js（App Router） + TypeScript + Tailwind CSS
- 出力形式: 静的エクスポート（`output: "export"`）
- デプロイ先: Vercel

## ページ構成

| パス | 内容 |
|---|---|
| `/` | トップ（ヘッダーのみ。右側に登録アプリへのリンクが並ぶ） |
| `/apps/kenkou-station` | 健康ステーションの概要（プライバシー/サポートへの入口） |
| `/apps/kenkou-station/privacy` | 健康ステーションのプライバシーポリシー |
| `/apps/kenkou-station/support` | 健康ステーションのサポート・お問い合わせ |
| `/tokushoho` | 特定商取引法に基づく表記（全アプリ共通。全ページのフッターからリンク） |

新しいアプリを追加すると、トップのヘッダー右側にリンクが1つ増え、
`/apps/<slug>` 以下に概要・privacy・supportの3ページが増える構成です
（下記「新しいアプリを追加する手順」参照）。

## 開発

```bash
npm install
npm run dev       # http://localhost:3000
```

## ビルド（静的書き出し）

```bash
npm run build      # ./out に静的ファイルが生成される
```

## Vercelへのデプロイ

1. このプロジェクトをGitHubリポジトリにpush
2. [vercel.com](https://vercel.com) でリポジトリをImport（GitHub連携）
3. Framework Presetは自動で `Next.js` が検出される（設定変更不要）
4. Deployを押すだけで完了

`output: "export"` により静的サイトとしてビルドされるため、Vercel側の
追加設定（Build command / Output directory）はデフォルトのままでOKです。

### 独自ドメインの設定

Vercelのプロジェクト設定 → Domains から `toiman.co.jp` を追加し、
DNS側でVercelが指示するレコード（A/CNAME）を設定してください。

---

## 設定ファイルについて

### `config/site.ts` — 全アプリ共通の情報

運営者名・連絡先メール・ドメインなど、**全アプリに共通する情報**です。
ページ側のコードに固有名詞は直書きされていません。

```ts
export const siteConfig = {
  siteName: "株式会社トイマン",
  operatorName: "株式会社トイマン",
  contactEmail: "info@toiman.co.jp",
  domain: "toiman.co.jp",
};
```

### `config/apps.ts` — アプリごとの情報

登録されている各アプリの名前・説明・ポリシー日付です。トップページの
アプリ一覧はこの配列から自動生成されます。

```ts
export const apps: AppInfo[] = [
  {
    slug: "kenkou-station",
    name: "健康ステーション",
    description: "高齢者向け見守り健康管理アプリ",
    privacyEnactedDate: "2026年9月21日",
    privacyLastUpdated: "2026年9月21日",
  },
];
```

### 新しいアプリを追加する手順

1. `config/apps.ts` の `apps` 配列に新しいエントリを追加する
   → トップページのヘッダー右側に自動でリンクが追加される
2. `app/apps/kenkou-station/` フォルダをコピーして
   `app/apps/<新しいslug>/` を作る（`page.tsx`, `privacy/page.tsx`,
   `support/page.tsx` の3ファイル）
3. コピーしたページ内の `getApp("kenkou-station")` を
   `getApp("<新しいslug>")` に書き換える
4. プライバシーポリシー本文（取得する情報・利用目的など）を、
   そのアプリの実態に合わせて書き換える
   （運営者名・連絡先は `config/site.ts` から自動で入るので、
   ページ内に直書きしない）
5. `npm run build` でビルドし直し、デプロイする

トップページには自動で新アプリが一覧表示されます。

### 運営者が変わった場合（事業譲渡など）の手順

1. `config/site.ts` を開く
2. 以下の値を新しい情報に書き換える
   - `operatorName` … 新しい運営者名（個人の場合は氏名など）
   - `contactEmail` … 新しい連絡先メールアドレス
   - `domain` … 新しいドメイン（変更する場合）
3. 譲渡対象アプリの `config/apps.ts` の `privacyLastUpdated` も
   更新する
4. `npm run build` でビルドし直し、再デプロイする

これだけで全アプリの全ページの表記がすべて更新されます。
`app/` 配下のコードを編集する必要はありません。
