/**
 * ============================================================
 *  アプリ一覧の設定
 * ============================================================
 *
 * 株式会社トイマンが運営する各アプリの基本情報をここに登録します。
 * トップページの一覧表示は、この配列から自動生成されます。
 *
 * 【新しいアプリを追加する手順】
 * 1. 下の配列に新しいエントリを追加する（slug, name, 日付）
 * 2. app/apps/<slug>/privacy/page.tsx と
 *    app/apps/<slug>/support/page.tsx を、
 *    既存の app/apps/kenkou-station/ 配下をコピーして作成し、
 *    取得する情報・利用目的など、そのアプリ固有の内容に書き換える
 *    （運営者名・連絡先は config/site.ts から自動で反映されるので
 *      ページ側に直書きしない）
 *
 * 運営者名・連絡先メール・ドメインなど「全アプリ共通の情報」は
 * config/site.ts の方にあります。
 * ============================================================
 */

export type AppInfo = {
  /** URLに使われる識別子（英数字・ハイフン推奨） */
  slug: string;
  /** アプリ名 */
  name: string;
  /** アプリの簡単な説明（トップページ一覧に表示） */
  description: string;
  /** プライバシーポリシーの制定日 */
  privacyEnactedDate: string;
  /** プライバシーポリシーの最終更新日 */
  privacyLastUpdated: string;
};

export const apps: AppInfo[] = [
  {
    slug: "kenkou-station",
    name: "健康ステーション",
    description: "高齢者向け見守り健康管理アプリ",
    privacyEnactedDate: "2026年9月21日",
    privacyLastUpdated: "2026年9月23日",
  },
  // 新しいアプリはここに追加していく
  // {
  //   slug: "new-app",
  //   name: "新しいアプリ名",
  //   description: "アプリの説明",
  //   privacyEnactedDate: "2027年X月X日",
  //   privacyLastUpdated: "2027年X月X日",
  // },
];

export function getApp(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}
