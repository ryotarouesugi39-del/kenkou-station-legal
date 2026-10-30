"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { apps } from "@/config/apps";
import "./home.css";

// トップページで紹介するアプリ（現在は健康ステーションのみ）
const app = apps[0];

// アプリアイコン（public/ 配下）
const APP_ICON = "/kenkou-station-icon.png";

const HERO_COPY = `${siteConfig.operatorName}は、テクノロジーで暮らしを支えるアプリを開発・運営しています。`;

type Store = "ios" | "android";

const STORE_URLS: Record<Store, string | undefined> = {
  ios: app.appStoreUrl,
  android: app.googlePlayUrl,
};

const STORE_NAMES: Record<Store, string> = {
  ios: "App Store",
  android: "Google Play",
};

const SECTIONS = [
  { id: "top", label: "TOP" },
  { id: "apps", label: "APP" },
  { id: "download", label: "DOWNLOAD" },
];

// アイコン画像の元になったハートの形（イラスト・演出用）
const HEART_PATH =
  "M50 84 C 26 68, 13 53, 13 37 C 13 24, 23 15, 34 15 C 42 15, 47 20, 50 26 C 53 20, 58 15, 66 15 C 77 15, 87 24, 87 37 C 87 53, 74 68, 50 84 Z";

const DownloadIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

/** ストアのダウンロードボタン。URL未設定のストアは「近日公開」として押せない表示にする */
function StoreBadge({ store }: { store: Store }) {
  const url = STORE_URLS[store];
  if (!url) {
    return (
      <a className="store-badge is-soon" aria-disabled="true">
        <DownloadIcon size={18} />
        <span>{STORE_NAMES[store]}（近日公開）</span>
      </a>
    );
  }
  return (
    <a className="store-badge" href={url} target="_blank" rel="noopener noreferrer">
      <DownloadIcon size={18} />
      <span>{STORE_NAMES[store]}からダウンロード</span>
    </a>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  // タイピング中に表示済みの文字数（null のときは全文をそのまま表示）
  const [typedCount, setTypedCount] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [navShown, setNavShown] = useState(false);
  const [active, setActive] = useState("top");
  const [launchPlaying, setLaunchPlaying] = useState(false);
  const launchRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const chars = Array.from(HERO_COPY);

  // ローディング → 表示開始 → ヒーローの文字をタイピング風に1文字ずつ表示
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(
        () => {
          setLoaded(true);
          setReady(true);
          if (reduce) return;
          let i = 0;
          const next = () => {
            i++;
            setTypedCount(i);
            if (i < chars.length) {
              // 句読点で少し間をあける
              const wait = /[、。]/.test(chars[i - 1]) ? 380 : 70 + Math.random() * 70;
              timers.push(window.setTimeout(next, wait));
            }
          };
          timers.push(
            window.setTimeout(() => {
              setTypedCount(0);
              next();
            }, 300),
          );
        },
        reduce ? 0 : 1400,
      ),
    );
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ヘッダー・下部ナビ・浮かぶモチーフ、現在地、スクロールで表示、App Store登場アニメーション
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const floats = document.querySelectorAll<HTMLElement>(".th .float");
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setNavShown(y > window.innerHeight * 0.35);
      if (!reduce) {
        floats.forEach((f) => {
          const r = f.parentElement!.getBoundingClientRect();
          f.style.transform = `translateY(${r.top * parseFloat(f.dataset.speed ?? "0")}px)`;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

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
    document.querySelectorAll(".th .reveal").forEach((el) => revealObserver.observe(el));

    const launchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio > 0.35) setLaunchPlaying(true);
        });
      },
      { threshold: [0, 0.35] },
    );
    if (launchRef.current) launchObserver.observe(launchRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
      revealObserver.disconnect();
      launchObserver.disconnect();
    };
  }, []);

  // 下部ナビの現在地インジケーターを、選択中のリンクの位置・幅に合わせる
  useEffect(() => {
    const link = pillsRef.current?.querySelector<HTMLAnchorElement>(`a[data-sec="${active}"]`);
    const ind = indicatorRef.current;
    if (!link || !ind) return;
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft - 5}px)`;
  }, [active]);

  // 下部のダウンロードボタン：AndroidならGoogle Play、それ以外はApp Store
  const openDeviceStore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = /Android/.test(navigator.userAgent) ? STORE_URLS.android : STORE_URLS.ios;
    if (url) {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`th${ready ? " is-ready" : ""}`}>
      <div className={`loader${loaded ? " is-done" : ""}`} aria-hidden="true">
        <span className="loader-logo">TOIMAN</span>
        <span className="loader-bar"></span>
      </div>

      <header className={`th-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <Link className="logo" href="/">
            {siteConfig.siteName}
          </Link>
          {apps.map((a) => (
            <Link key={a.slug} className="nav-link" href={`/apps/${a.slug}`}>
              {a.name}
            </Link>
          ))}
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="band" aria-hidden="true"></div>
          <div className="wrap">
            <div className="hero-text">
              {typedCount === null ? (
                <p className="hero-copy">{HERO_COPY}</p>
              ) : (
                <p className="hero-copy" aria-label={HERO_COPY}>
                  <span className="typed" aria-hidden="true">
                    {chars.slice(0, typedCount).join("")}
                  </span>
                  <span
                    className={`caret${typedCount < chars.length ? " is-typing" : ""}`}
                    aria-hidden="true"
                  ></span>
                  {/* 残りの文字を透明で置いて、行の折り返し位置がずれないようにする */}
                  <span className="ghost" aria-hidden="true">
                    {chars.slice(typedCount).join("")}
                  </span>
                </p>
              )}
              <div className="hero-meta" aria-hidden="true">
                TOIMAN<i></i>APPS
              </div>
              <div className="hero-actions">
                <a className="btn" href="#apps">
                  アプリを見る
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* アプリ画面風のイラスト（文字なし・飾り） */}
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
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#86b9a8" stopOpacity=".45" />
                          <stop offset="1" stopColor="#86b9a8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        className="chart-area"
                        d="M4 60 L34 52 L64 58 L94 40 L124 46 L154 28 L184 34 L184 86 L4 86 Z"
                      />
                      <path
                        className="chart-line"
                        pathLength={1}
                        d="M4 60 L34 52 L64 58 L94 40 L124 46 L154 28 L184 34"
                      />
                      <circle className="chart-dot" cx="184" cy="34" r="5" />
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
                      <span key={i} style={{ "--h": h } as React.CSSProperties}></span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bubble">
                <span className="ph-tile">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f5f0d8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </span>
                <span className="ph-lines">
                  <span className="sk d" style={{ width: "80%" }}></span>
                  <span className="sk" style={{ width: "55%" }}></span>
                </span>
              </div>
              <div className="bubble bubble2">
                <span className="pulse">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c98b5a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12h4l2-5 4 10 2-5h6" />
                  </svg>
                </span>
                <span className="ph-lines">
                  <span className="sk d" style={{ width: "90%" }}></span>
                  <span className="sk" style={{ width: "60%" }}></span>
                </span>
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">
            SCROLL<i></i>
          </div>
        </section>

        <section className="apps" id="apps">
          {/* 浮かぶモチーフ（スクロールでゆっくり動く） */}
          <div className="float f1" data-speed=".18" style={{ top: "12%", left: "8%" }} aria-hidden="true">
            <svg
              width="78"
              height="78"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f2" data-speed="-.12" style={{ top: "18%", right: "10%" }} aria-hidden="true">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c98b5a"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f3" data-speed=".1" style={{ bottom: "12%", left: "14%" }} aria-hidden="true">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h4l2-5 4 10 2-5h6" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f4" data-speed="-.2" style={{ bottom: "16%", right: "12%" }} aria-hidden="true">
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c98b5a"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f5" data-speed=".25" style={{ top: "50%", left: "3%" }} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="6" />
            </svg>
          </div>

          <div className="wrap">
            <div className="section-label reveal" aria-hidden="true">
              <i></i>APP<i></i>
            </div>
            <Link className="card reveal" href={`/apps/${app.slug}`}>
              <span className="card-icon" aria-hidden="true">
                <Image src={APP_ICON} alt="" width={84} height={84} />
              </span>
              <span className="card-body">
                <span className="card-title">{app.name}</span>
                <span className="card-desc">{app.description}</span>
              </span>
              <span className="card-go" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section
          ref={launchRef}
          className={`launch${launchPlaying ? " is-play" : ""}`}
          id="download"
          aria-label="App Storeに登場"
        >
          <div className="launch-glow" aria-hidden="true"></div>
          <p className="launch-title">App Storeに登場</p>
          <p className="launch-sub">{app.name}</p>
          <div className="app-tile" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <path className="heart-line" pathLength={1} d={HEART_PATH} />
              <circle className="heart-dot d1" cx="44" cy="56" r="7.5" />
              <circle className="heart-dot d2" cx="59" cy="58" r="4.2" />
            </svg>
          </div>
          <div className="store-badges">
            <StoreBadge store="ios" />
            <StoreBadge store="android" />
          </div>
        </section>
      </main>

      <nav className={`pill-nav${navShown ? " is-shown" : ""}`} aria-label="ページ内">
        <div className="pills" ref={pillsRef}>
          <span className="indicator" ref={indicatorRef}></span>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} data-sec={id} className={active === id ? "is-active" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <a className="pill-dl" href="#download" aria-label="ダウンロード" onClick={openDeviceStore}>
          <DownloadIcon size={16} />
          <span>ダウンロード</span>
        </a>
      </nav>
    </div>
  );
}
