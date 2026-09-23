import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: `${siteConfig.operatorName}が運営する各アプリのプライバシーポリシー・サポートページ`,
  metadataBase: new URL(siteConfig.siteUrl),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white font-sans">
        {children}
        <footer className="mx-auto mt-auto w-full max-w-3xl border-t border-slate-200 px-6 py-8 text-sm text-slate-500">
          <nav className="mb-2 flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/tokushoho" className="hover:underline">
              特定商取引法に基づく表記
            </Link>
          </nav>
          <p>© {siteConfig.operatorName}</p>
        </footer>
      </body>
    </html>
  );
}
