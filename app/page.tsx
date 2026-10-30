"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { apps } from "@/config/apps";
import "./home.css";

// トップページで紹介するアプリ（現在は健康ステーションのみ）
const app = apps[0];

type Store = "ios" | "android";

const STORE_URLS: Record<Store, string | undefined> = {
  ios: app.appStoreUrl,
  android: app.googlePlayUrl,
};

const STORE_NAMES: Record<Store, string> = {
  ios: "App Store",
  android: "Google Play",
};

const HeartIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
  </svg>
);

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

/** ストアへのリンク。URL未設定のストアは「近日公開」として押せない表示にする */
function StoreLink({
  store,
  label,
  className,
  children,
}: {
  store: Store;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  const url = STORE_URLS[store];
  if (!url) {
    return (
      <a className={`${className} is-soon`} aria-disabled="true">
        {children}
        <span>{STORE_NAMES[store]}（近日公開）</span>
      </a>
    );
  }
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {children}
      <span>{label}</span>
    </a>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [barShown, setBarShown] = useState(false);
  const [barClosed, setBarClosed] = useState(() => {
    try {
      return typeof window !== "undefined" && sessionStorage.getItem("dlBarClosed") === "1";
    } catch {
      return false;
    }
  });
  const [launchPlaying, setLaunchPlaying] = useState(false);
  const launchRef = useRef<HTMLElement>(null);
  const launchVisible = useRef(false);

  // ヘッダーの変化＋ダウンロードバーの表示、App Store登場アニメーション、スクロールで表示
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setBarShown(!launchVisible.current && y > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reveals = document.querySelectorAll(".th .reveal");
    const launchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          launchVisible.current = en.intersectionRatio > 0.2;
          if (en.isIntersecting && en.intersectionRatio > 0.35) setLaunchPlaying(true);
          onScroll();
        });
      },
      { threshold: [0, 0.2, 0.35, 0.6] },
    );
    if (launchRef.current) launchObserver.observe(launchRef.current);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            revealObserver.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      launchObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  // ダウンロードバーのボタン：iPhoneならApp Store、AndroidならGoogle Play、それ以外はApp Store登場欄へ
  const openDeviceStore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPhone|iPad|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(ua);
    const url = isIOS ? STORE_URLS.ios : isAndroid ? STORE_URLS.android : undefined;
    if (url) {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const closeBar = () => {
    setBarClosed(true);
    try {
      sessionStorage.setItem("dlBarClosed", "1");
    } catch {}
  };

  return (
    <div className="th">
      <div className="deco" aria-hidden="true">
        <span></span>
        <span></span>
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

      <main className="th-main">
        <section className="hero">
          <div className="wrap">
            <p className="lead fade">
              {siteConfig.operatorName}
              は、テクノロジーで暮らしを支えるアプリを開発・運営しています。
            </p>
            <div className="hero-actions fade" data-delay="1">
              <a className="btn btn-primary" href="#apps">
                アプリを見る
                <svg
                  className="arrow"
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
          <a
            className="scroll-cue fade"
            data-delay="2"
            href="#apps"
            aria-label="下へスクロール"
          ></a>
        </section>

        <section className="section" id="apps">
          <div className="wrap">
            <div className="app-panel reveal">
              <Link className="card" href={`/apps/${app.slug}`}>
                <span className="card-icon" aria-hidden="true">
                  <HeartIcon size={32} />
                </span>
                <span className="card-body">
                  <span className="card-title">{app.name}</span>
                  <span className="card-desc">{app.description}</span>
                </span>
                <svg
                  className="card-arrow"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
              <div className="stores reveal" data-delay="1">
                <StoreLink store="ios" label="App Storeでダウンロード" className="btn btn-primary">
                  <DownloadIcon size={20} />
                </StoreLink>
                <StoreLink store="android" label="Google Playで手に入れる" className="btn btn-ghost">
                  <DownloadIcon size={20} />
                </StoreLink>
              </div>
            </div>
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
              <path
                className="heart-line"
                pathLength={1}
                d="M50 84 C 26 68, 13 53, 13 37 C 13 24, 23 15, 34 15 C 42 15, 47 20, 50 26 C 53 20, 58 15, 66 15 C 77 15, 87 24, 87 37 C 87 53, 74 68, 50 84 Z"
              />
              <circle className="heart-dot d1" cx="44" cy="56" r="7.5" />
              <circle className="heart-dot d2" cx="59" cy="58" r="4.2" />
            </svg>
          </div>
          <StoreLink store="ios" label="App Storeからダウンロード" className="store-badge">
            <DownloadIcon size={18} />
          </StoreLink>
        </section>
      </main>

      {/* スクロール後に出るダウンロードバー */}
      <div
        className={`dl-bar${barShown && !barClosed ? " is-shown" : ""}`}
        role="region"
        aria-label="アプリのダウンロード"
      >
        <span className="dl-icon" aria-hidden="true">
          <HeartIcon size={22} />
        </span>
        <span className="dl-text">
          <b>{app.name}</b>
          <span>{app.description}</span>
        </span>
        <a className="btn btn-primary" href="#download" onClick={openDeviceStore}>
          ダウンロード
        </a>
        <button className="dl-close" type="button" aria-label="閉じる" onClick={closeBar}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
