// ストアボタンのクリックをTikTokピクセルに送る。
// ピクセルが読み込まれていない（広告ブロック等）ときは何もしない。

type Ttq = { track: (event: string, params?: Record<string, unknown>) => void };

export function trackStoreClick(store: "ios" | "android") {
  const ttq = (window as unknown as { ttq?: Ttq }).ttq;
  ttq?.track("ClickButton", { content_name: store === "ios" ? "app_store" : "google_play" });
}
