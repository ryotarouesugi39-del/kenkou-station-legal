import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとして書き出す（Netlifyへそのままデプロイ）
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
