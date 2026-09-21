import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
