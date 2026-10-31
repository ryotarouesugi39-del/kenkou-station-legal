"use client";

// トップページ（会社HP）。デザイン案（design-v2.html）をそのまま移したもの。
// 演出は useEffect の中でデザイン案のスクリプトと同じように DOM を直接動かす（再描画しない）。

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { apps } from "@/config/apps";
import Loader from "./_components/Loader";
import { HEART_PATH, Timers, imeType, runLoader, startSlides, type ImeSegment } from "@/lib/intro";
import "./home.css";

// トップページで紹介するアプリ（現在は健康ステーションのみ）
const app = apps[0];

const HERO_COPY = `${siteConfig.operatorName}は、テクノロジーで暮らしを支えるアプリを開発・運営しています。`;

// タイピングの区切り：[確定後の文字, 打つローマ字]（つなげると HERO_COPY と同じ文になる）
const COPY: ImeSegment[] = [
  ["株式会社トイマンは、", "kabushikigaishatoimannha,"],
  ["テクノロジーで暮らしを支えるアプリを", "tekunoroji-dekurashiwosasaeruapuriwo"],
  ["開発・", "kaihatsu/"],
  ["運営しています。", "unneishiteimasu."],
];

// ヒーローのスマホに出すアプリ画面（数秒ごとに切り替え）
const HERO_SLIDES = [
  { src: "/images/home/hero-1.jpg", bg: "linear-gradient(#3d8263 0 30px,#f5f5f5 30px)" },
  { src: "/images/home/hero-2.jpg", bg: "#f5f5f5" },
];

const SECTIONS = [
  { id: "top", label: "TOP" },
  { id: "apps", label: "APP" },
  { id: "download", label: "DOWNLOAD" },
];

const DownloadIcon = ({ size, width }: { size: number; width: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector(sel) as T;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Timers();
    const cleanups: (() => void)[] = [];

    // 下部のダウンロードボタン：AndroidならGoogle Play、それ以外はApp Store
    const deviceUrl = /Android/.test(navigator.userAgent) ? app.googlePlayUrl : app.appStoreUrl;
    if (deviceUrl) {
      const d = $<HTMLAnchorElement>(".pill-dl");
      d.href = deviceUrl;
      d.target = "_blank";
      d.rel = "noopener noreferrer";
    }

    // ローディング → 表示開始 → ヒーローの文字を日本語入力風に表示
    cleanups.push(
      runLoader(loaderRef.current, reduce, timers, () => {
        root.classList.add("is-ready");
        if (!reduce) timers.timeout(() => imeType($(".hero-copy"), COPY, timers), 250);
      }),
    );

    // ヘッダー・下部ナビ・浮かぶモチーフ
    const hd = $(".th-header");
    const nav = $(".pill-nav");
    const floats = root.querySelectorAll<HTMLElement>(".float");
    const onScroll = () => {
      const y = window.scrollY;
      hd.classList.toggle("is-scrolled", y > 10);
      nav.classList.toggle("is-shown", y > window.innerHeight * 0.35);
      if (!reduce)
        floats.forEach((f) => {
          const r = f.parentElement!.getBoundingClientRect();
          f.style.transform = `translateY(${r.top * parseFloat(f.dataset.speed || "0")}px)`;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // 下部ナビの現在地インジケーター
    const links = root.querySelectorAll<HTMLElement>(".pills a");
    const ind = $(".indicator");
    const setActive = (id: string) => {
      links.forEach((a) => {
        const on = a.dataset.sec === id;
        a.classList.toggle("is-active", on);
        if (on) {
          ind.style.width = a.offsetWidth + "px";
          ind.style.transform = `translateX(${a.offsetLeft - 5}px)`;
        }
      });
    };
    setActive("top");

    const launch = $("#download");
    if ("IntersectionObserver" in window) {
      const secIO = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: "-45% 0px -45% 0px" },
      );
      SECTIONS.forEach(({ id }) => secIO.observe($(`#${id}`)));

      const rv = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              rv.unobserve(e.target);
            }
          }),
        { threshold: 0.2 },
      );
      root.querySelectorAll(".reveal").forEach((el) => rv.observe(el));

      const launchIO = new IntersectionObserver(
        (es) => es.forEach((e) => e.intersectionRatio > 0.35 && launch.classList.add("is-play")),
        { threshold: [0, 0.35] },
      );
      launchIO.observe(launch);
      cleanups.push(() => {
        secIO.disconnect();
        rv.disconnect();
        launchIO.disconnect();
      });
    } else {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      launch.classList.add("is-play");
    }

    // アプリ画面を数秒ごとに切り替え
    cleanups.push(startSlides(root, reduce));

    return () => {
      timers.clear();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="th" ref={rootRef}>
      <Loader ref={loaderRef} />

      <header className="th-header">
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
              <p className="hero-copy">{HERO_COPY}</p>
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

            {/* 実際のアプリ画面（スライドで切り替え・飾り） */}
            <div className="hero-visual" aria-hidden="true">
              <div className="phone">
                <div className="screen">
                  {HERO_SLIDES.map((s, i) => (
                    <div key={s.src} className={`slide${i === 0 ? " is-on" : ""}`} style={{ background: s.bg }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.src} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="slide-dots">
                {HERO_SLIDES.map((s, i) => (
                  <i key={s.src} className={i === 0 ? "is-on" : undefined}></i>
                ))}
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
            <svg width="78" height="78" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f2" data-speed="-.12" style={{ top: "18%", right: "10%" }} aria-hidden="true">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#c98b5a" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f3" data-speed=".1" style={{ bottom: "12%", left: "14%" }} aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l2-5 4 10 2-5h6" />
            </svg>
            <div className="shadow"></div>
          </div>
          <div className="float f4" data-speed="-.2" style={{ bottom: "16%", right: "12%" }} aria-hidden="true">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#c98b5a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                  <path d={HEART_PATH} stroke="#f5f0d8" strokeWidth="7" strokeLinejoin="round" />
                  <circle cx="44" cy="56" r="8" fill="#f5f0d8" />
                  <circle cx="59" cy="58" r="4.5" fill="#f5f0d8" />
                </svg>
              </span>
              <span className="card-body">
                <span className="card-title">{app.name}</span>
                <span className="card-desc">{app.description}</span>
              </span>
              <span className="card-go" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section className="launch" id="download" aria-label="App Storeに登場">
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
          {app.appStoreUrl ? (
            <a className="store-badge" href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
              <DownloadIcon size={18} width="2" />
              <span>App Storeからダウンロード</span>
            </a>
          ) : (
            <a className="store-badge">
              <DownloadIcon size={18} width="2" />
              <span>App Store（近日公開）</span>
            </a>
          )}
        </section>
      </main>

      <nav className="pill-nav" aria-label="ページ内">
        <div className="pills">
          <span className="indicator"></span>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} data-sec={id}>
              {label}
            </a>
          ))}
        </div>
        <a className="pill-dl" href="#download" aria-label="ダウンロード">
          <DownloadIcon size={16} width="2.2" />
          <span>ダウンロード</span>
        </a>
      </nav>
    </div>
  );
}
