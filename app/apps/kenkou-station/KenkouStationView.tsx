"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";
import "./kenkou-station.css";

const app = getApp("kenkou-station")!;

// アプリアイコン（public/ 配下）
const APP_ICON = "/kenkou-station-icon.png";

type Store = "ios" | "android";

// QRコード（public/ 配下）は、それぞれ下の URL を読み取れることを確認済み
const STORES: { store: Store; url: string | undefined; name: string; sub: string; qr: string }[] = [
  { store: "ios", url: app.appStoreUrl, name: "App Store", sub: "（iPhone版）", qr: "/qr-app-store.svg" },
  {
    store: "android",
    url: app.googlePlayUrl,
    name: "Google Play",
    sub: "（Android版）",
    qr: "/qr-google-play.svg",
  },
];

const SECTIONS = [
  { id: "top", label: "TOP" },
  { id: "download", label: "DOWNLOAD" },
  { id: "info", label: "INFO" },
];

const INFO_LINKS = [
  { href: `/apps/${app.slug}/terms`, label: "利用規約" },
  { href: `/apps/${app.slug}/privacy`, label: "プライバシーポリシー" },
  { href: `/apps/${app.slug}/support`, label: "サポート" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
];

// アイコン画像の元になったハートの形（イラスト・演出用）
const HEART_PATH =
  "M50 84 C 26 68, 13 53, 13 37 C 13 24, 23 15, 34 15 C 42 15, 47 20, 50 26 C 53 20, 58 15, 66 15 C 77 15, 87 24, 87 37 C 87 53, 74 68, 50 84 Z";

/** 閲覧中の端末（Android / iPhone・iPad / それ以外は空文字）。サーバー描画時は空文字 */
function detectDevice(): Store | "" {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) return "android";
  if (/iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "";
}
const noopSubscribe = () => () => {};

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function KenkouStationView() {
  const device = useSyncExternalStore(noopSubscribe, detectDevice, () => "" as const);
  // ヒーローで強調するストア（端末が分からないときは App Store）
  const mine: Store = device || "ios";

  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState(false);
  // タイトルのタイピング中に表示済みの文字数（null のときは全文をそのまま表示）
  const [typedCount, setTypedCount] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dockShown, setDockShown] = useState(false);
  const [active, setActive] = useState("top");
  const heroDlRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const titleChars = Array.from(app.name);

  // ローディング → 表示開始 → タイトルをタイピング風に表示 → 説明文とボタンを表示
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(
        () => {
          setLoaded(true);
          setReady(true);
          if (reduce) {
            setTyped(true);
            return;
          }
          let i = 0;
          const next = () => {
            i++;
            setTypedCount(i);
            if (i < titleChars.length) timers.push(window.setTimeout(next, 95 + Math.random() * 70));
            else setTyped(true);
          };
          timers.push(
            window.setTimeout(() => {
              setTypedCount(0);
              next();
            }, 900),
          );
        },
        reduce ? 0 : 800,
      ),
    );
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ヘッダーの背景、下のダウンロード導線、現在地、スクロールで表示
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ヒーローのボタンが画面から外れたら、下にダウンロード導線を自動で出す
    const dockObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => setDockShown(!e.isIntersecting && e.boundingClientRect.top < 0));
    });
    if (heroDlRef.current) dockObserver.observe(heroDlRef.current);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll(".ksp .reveal").forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      dockObserver.disconnect();
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  // 下のナビの現在地インジケーターを、選択中のリンクの位置・幅に合わせる
  useEffect(() => {
    const link = pillsRef.current?.querySelector<HTMLAnchorElement>(`a[data-sec="${active}"]`);
    const ind = indicatorRef.current;
    if (!link || !ind) return;
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  // 下の追従ボタン：スマホなら直接ストアへ、PCならQRのあるダウンロード欄へ
  const deviceStoreUrl = STORES.find((s) => s.store === device)?.url;

  const rootClass = ["ksp", ready && "is-ready", typed && "is-typed"].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <div className={`loader${loaded ? " is-done" : ""}`} aria-hidden="true">
        <span className="loader-logo">TOIMAN</span>
      </div>

      <header className={`ksp-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <Link className="logo" href="/">
            {siteConfig.siteName}
          </Link>
          <Link className="back" href="/">
            ← トップに戻る
          </Link>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="band" aria-hidden="true"></div>
          <div className="wrap">
            <div className="hero-text">
              <div className="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <path className="heart-line" pathLength={1} d={HEART_PATH} />
                  <circle className="heart-dot d1" cx="44" cy="56" r="7.5" />
                  <circle className="heart-dot d2" cx="59" cy="58" r="4.2" />
                </svg>
                <Image className="icon-img" src={APP_ICON} alt="" width={104} height={104} />
              </div>
              {typedCount === null ? (
                <h1>{app.name}</h1>
              ) : (
                <h1 aria-label={app.name}>
                  <span aria-hidden="true">{titleChars.slice(0, typedCount).join("")}</span>
                  <span
                    className={`caret${typedCount < titleChars.length ? " is-typing" : ""}`}
                    aria-hidden="true"
                  ></span>
                </h1>
              )}
              <p className="lead">{app.description}</p>
              {(app.appStoreUrl || app.googlePlayUrl) && (
                <div className="hero-dl" ref={heroDlRef}>
                  {STORES.filter((s) => s.url).map((s) => (
                    <a
                      key={s.store}
                      className={`store-btn ${s.store === mine ? "primary is-first" : "secondary"}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.name}
                      {s.sub}
                      <span className="arr" aria-hidden="true">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="phone">
                <div className="screen">
                  <div className="ph-top">
                    <span className="ph-tile">
                      <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                        <path d={HEART_PATH} stroke="#f5f0d8" strokeWidth="9" strokeLinejoin="round" />
                        <circle cx="44" cy="56" r="9" fill="#f5f0d8" />
                        <circle cx="60" cy="58" r="5" fill="#f5f0d8" />
                      </svg>
                    </span>
                    <span className="ph-lines">
                      <span className="sk d" style={{ width: "70%" }}></span>
                      <span className="sk" style={{ width: "45%" }}></span>
                    </span>
                  </div>
                  <div className="ph-card ph-chart">
                    <span className="sk d" style={{ width: "40%", marginBottom: 8 }}></span>
                    <svg viewBox="0 0 200 86" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="ksp-cf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#86b9a8" stopOpacity=".45" />
                          <stop offset="1" stopColor="#86b9a8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        className="chart-area"
                        fill="url(#ksp-cf)"
                        d="M4 60 L34 52 L64 58 L94 40 L124 46 L154 28 L184 34 L184 86 L4 86 Z"
                      />
                      <path
                        className="chart-line"
                        pathLength={1}
                        d="M4 60 L34 52 L64 58 L94 40 L124 46 L154 28 L184 34"
                      />
                    </svg>
                  </div>
                  <div className="ph-stats">
                    {["#dfe9e3", "#f3e1cf", "#e4e0f0"].map((color) => (
                      <div key={color} className="ph-stat">
                        <i style={{ background: color }}></i>
                        <span className="sk d"></span>
                        <span className="sk" style={{ width: "60%" }}></span>
                      </div>
                    ))}
                  </div>
                  <div className="ph-card ph-bars">
                    {["40%", "62%", "48%", "75%", "92%", "58%", "70%"].map((h, i) => (
                      <span key={i} style={{ "--h": h, "--i": i } as React.CSSProperties}></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {(app.appStoreUrl || app.googlePlayUrl) && (
          <section className="download" id="download">
            <div className="dl-glow" aria-hidden="true"></div>
            <div className="wrap">
              <div className="section-label reveal" aria-hidden="true">
                <i></i>DOWNLOAD<i></i>
              </div>
              <h2 className="reveal d1">ダウンロード</h2>
              <div className="dl-grid">
                {STORES.filter((s) => s.url).map((s, i) => (
                  <a
                    key={s.store}
                    className={`dl-card reveal d${i + 1}${s.store === device ? " is-mine is-first" : ""}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="qr">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.qr} alt="" />
                    </span>
                    <span className="dl-body">
                      <span className="dl-name">
                        <span>{s.name}</span>
                        <span className="sub">{s.sub}</span>
                      </span>
                      <span className="dl-go" aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="info" id="info">
          <div className="wrap">
            <div className="section-label reveal" aria-hidden="true">
              <i></i>INFORMATION
            </div>
            <ul className="info-list">
              {INFO_LINKS.map((l, i) => (
                <li key={l.href} className={`reveal${i % 3 ? ` d${i % 3}` : ""}`}>
                  <Link href={l.href}>
                    {l.label}
                    <span className="arr" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* スクロールすると自動で出てくる：ページ内ナビ＋ダウンロード */}
      <nav className={`dock${dockShown ? " is-shown" : ""}`} aria-label="ページ内ナビとダウンロード">
        <div className="pills" ref={pillsRef}>
          <span className="indicator" ref={indicatorRef}></span>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} data-sec={id} className={active === id ? "is-active" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <a
          className="dock-dl"
          href={deviceStoreUrl ?? "#download"}
          {...(deviceStoreUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="ph-tile" aria-hidden="true">
            <Image src={APP_ICON} alt="" width={32} height={32} />
          </span>
          <span>ダウンロード</span>
        </a>
      </nav>
    </div>
  );
}
