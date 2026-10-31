"use client";

// 健康ステーションの概要ページ。デザイン案（kenkou-station.html）をそのまま移したもの。
// 演出は useEffect の中でデザイン案のスクリプトと同じように DOM を直接動かす（再描画しない）。

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getApp } from "@/config/apps";
import Loader from "../../_components/Loader";
import { HEART_PATH, Timers, imeType, runLoader, startSlides, type ImeSegment } from "@/lib/intro";
import "./kenkou-station.css";

const app = getApp("kenkou-station")!;

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

// タイトルのタイピングの区切り：[確定後の文字, 打つローマ字]
const TITLE: ImeSegment[] = [
  ["健康", "kenkou"],
  ["ステーション", "sute-shonn"],
];

const IMG = "/images/kenkou-station";

// ヒーローのスマホに出すアプリ画面（数秒ごとに切り替え）
const HERO_SLIDES = [
  { src: `${IMG}/screen-measure.jpg`, bg: "linear-gradient(#3d8263 0 30px,#f5f5f5 30px)" },
  { src: `${IMG}/screen-graph.jpg`, bg: "linear-gradient(#188462 0 30px,#f5f5f5 30px)" },
  { src: `${IMG}/screen-home.jpg`, bg: "linear-gradient(#3e8264 0 30px,#f5f5f5 30px)" },
];

// フック＋特徴
const HOOK = ["毎日の健康記録を、", "家族の安心に。"];
const FEATURES = [
  {
    title: "かんたん記録",
    text: "血圧計や体重計の画面を撮るか、話すだけで入力。",
    img: `${IMG}/feature-record.jpg`,
    alt: "測定画面",
    bg: "linear-gradient(#3d8263 0 26px,#f5f5f5 26px)",
  },
  {
    title: "家族に共有",
    text: "招待コードでつながって、離れた家族も記録を確認。",
    img: `${IMG}/feature-family.jpg`,
    alt: "家族が見る健康データ画面",
    bg: "linear-gradient(#3e8264 0 26px,#f5f5f5 26px)",
  },
  {
    title: "食事分析",
    text: "料理の写真から、カロリーや栄養のバランスをAIがチェック。",
    img: `${IMG}/feature-meal.jpg`,
    alt: "食事の分析結果画面",
    bg: "linear-gradient(#f5f5f5 0 26px,#f5f5f5 26px)",
  },
  {
    title: "AI分析",
    text: "記録をもとに、AIが週・月のふりかえりレポートを作成。",
    img: `${IMG}/feature-ai.jpg`,
    alt: "健康データのグラフ画面",
    bg: "linear-gradient(#3e8264 0 26px,#f5f5f5 26px)",
  },
];

// 画面ギャラリー（--ar は画像の縦横比）
const GALLERY = [
  { src: `${IMG}/screen-measure.jpg`, alt: "測定画面", r: "-2deg", y: "-30px", ar: "1.652" },
  { src: `${IMG}/screen-graph.jpg`, alt: "健康データのグラフ画面", r: "1.5deg", y: "40px", ar: "1.898" },
  { src: `${IMG}/screen-home.jpg`, alt: "健康データ（ホーム）画面", r: "-1deg", y: "-20px", ar: "2.020" },
  { src: `${IMG}/screen-alerts.jpg`, alt: "警告履歴の画面", r: "2deg", y: "30px", ar: "1.898" },
  { src: `${IMG}/screen-meal-log.jpg`, alt: "食事記録の画面", r: "-1.5deg", y: "-35px", ar: "1.898" },
  { src: `${IMG}/screen-meal-result.jpg`, alt: "食事の分析結果の画面", r: "1deg", y: "25px", ar: "1.241" },
  { src: `${IMG}/screen-ai-chat.jpg`, alt: "家族専用AIチャットの画面", r: "-2deg", y: "-15px", ar: "1.993" },
];

const SECTIONS = [
  { id: "top", label: "TOP" },
  { id: "features", label: "FEATURES" },
  { id: "download", label: "DOWNLOAD" },
  { id: "info", label: "INFO" },
];

const INFO_LINKS = [
  { href: `/apps/${app.slug}/terms`, label: "利用規約" },
  { href: `/apps/${app.slug}/privacy`, label: "プライバシーポリシー" },
  { href: `/apps/${app.slug}/support`, label: "サポート" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export default function KenkouStationView() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector(sel) as T;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Timers();
    const cleanups: (() => void)[] = [];

    // 端末を判定して、その端末のストアを先頭＆強調に
    const ua = navigator.userAgent;
    const device: Store | "" = /Android/.test(ua)
      ? "android"
      : /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        ? "ios"
        : "";
    const mine = device || "ios";
    const heroDl = $(".hero-dl");
    heroDl.querySelectorAll<HTMLElement>(".store-btn").forEach((b) => {
      b.classList.add(b.dataset.store === mine ? "primary" : "secondary");
      if (b.dataset.store === mine) heroDl.prepend(b);
    });
    root.querySelectorAll<HTMLElement>(".dl-card").forEach((c) => {
      if (device && c.dataset.store === device) {
        c.classList.add("is-mine");
        c.parentNode!.prepend(c);
      }
    });
    // 下の追従ボタン：スマホなら直接ストアへ、PCならQRのあるダウンロード欄へ
    const deviceUrl = device ? STORES.find((s) => s.store === device)?.url : undefined;
    if (deviceUrl) {
      const dock = $<HTMLAnchorElement>(".dock-dl");
      dock.href = deviceUrl;
      dock.target = "_blank";
      dock.rel = "noopener noreferrer";
    }

    // ローディング → 表示開始 → タイトルを日本語入力風に表示 → 説明文とボタンを表示
    cleanups.push(
      runLoader(loaderRef.current, reduce, timers, () => {
        root.classList.add("is-ready");
        const finish = () => root.classList.add("is-typed");
        if (reduce) finish();
        else timers.timeout(() => imeType($("h1"), TITLE, timers, finish), 700);
      }),
    );

    // ヘッダーの背景
    const hd = $("header");
    const onHeader = () => hd.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onHeader, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onHeader));

    const dockEl = $(".dock");
    const links = root.querySelectorAll<HTMLElement>(".pills a");
    const ind = $(".indicator");
    const setActive = (id: string) => {
      links.forEach((a) => {
        const on = a.dataset.sec === id;
        a.classList.toggle("is-active", on);
        if (on) {
          ind.style.width = a.offsetWidth + "px";
          ind.style.transform = `translateX(${a.offsetLeft}px)`;
        }
      });
    };

    if ("IntersectionObserver" in window) {
      // ヒーローのボタンが画面から外れたら、下にダウンロード導線を自動で出す
      const dockIO = new IntersectionObserver((es) =>
        es.forEach((e) => dockEl.classList.toggle("is-shown", !e.isIntersecting && e.boundingClientRect.top < 0)),
      );
      dockIO.observe(heroDl);

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
      cleanups.push(() => {
        dockIO.disconnect();
        secIO.disconnect();
        rv.disconnect();
      });
    } else {
      dockEl.classList.add("is-shown");
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    }
    setActive("top");

    // アプリ画面を数秒ごとに切り替え
    cleanups.push(startSlides(root, reduce));

    // 特徴・画面ギャラリー：縦スクロールに合わせて横に送る
    // スクロール量をそのまま横の位置にすると、iPhoneではスクロールの細かい揺れがそのまま横の揺れになるので、
    // スクロール量からは「何枚目か」だけを決め、横への移動はCSSのトランジション（時間で動くアニメーション）で行う。
    // 画面の高さは固定部分（100svh＝ツールバーの出し入れで変わらない高さ）から取り、横幅が変わったときだけ測り直す。
    if (!reduce) {
      // stepVh: 1枚ぶん進むのに必要な縦スクロール量（画面の高さに対する割合）。スマホで速く流れすぎないようにする
      const horizontal = (sec: HTMLElement, track: HTMLElement, items: string, centerClass?: string, stepVh = 0) => {
        const sticky = sec.firstElementChild as HTMLElement;
        const bar = sec.querySelector(".g-bar i") as HTMLElement;
        const now = sec.querySelector(".g-count b") as HTMLElement;
        const cards = track.querySelectorAll<HTMLElement>(items);
        const last = cards.length - 1;
        let dist = 0;
        let len = 0;
        let width = 0;
        let index = -1;
        let raf = 0;
        const show = (i: number, force = false) => {
          if (i === index && !force) return;
          index = i;
          const c = cards[i];
          // i枚目が画面の真ん中に来る位置（両端ははみ出さないように）
          const x = Math.min(dist, Math.max(0, c.offsetLeft + c.offsetWidth / 2 - width / 2));
          track.style.transform = `translate3d(${-x}px,0,0)`;
          bar.style.transform = `scaleX(${last ? i / last : 0})`;
          if (centerClass) cards.forEach((card, j) => card.classList.toggle(centerClass, j === i));
          now.textContent = pad2(i + 1);
        };
        const update = () => {
          raf = 0;
          const top = sec.getBoundingClientRect().top;
          const p = len ? Math.min(1, Math.max(0, -top / len)) : 0;
          show(Math.round(p * last));
        };
        const onScroll = () => {
          if (!raf) raf = requestAnimationFrame(update);
        };
        const size = (force?: unknown) => {
          if (force !== true && window.innerWidth === width) return; // 高さだけの変化（ツールバーの出し入れ）は無視
          width = window.innerWidth;
          const vh = sticky.offsetHeight;
          dist = Math.max(0, track.scrollWidth - width);
          len = Math.max(dist, last * vh * stepVh);
          sec.style.height = vh + len + "px";
          const top = sec.getBoundingClientRect().top;
          const p = len ? Math.min(1, Math.max(0, -top / len)) : 0;
          show(Math.round(p * last), true);
        };
        const onLoad = () => size(true);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", size);
        window.addEventListener("load", onLoad);
        size(true);
        cleanups.push(() => {
          if (raf) cancelAnimationFrame(raf);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", size);
          window.removeEventListener("load", onLoad);
        });
      };
      horizontal($(".feat-scroll"), $(".feat-list"), ".feat", undefined, 0.8);
      horizontal($("#gallery"), $(".g-track"), ".hcard", "is-center", 0.5);
    }

    return () => {
      timers.clear();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="ksp" ref={rootRef}>
      <Loader ref={loaderRef} />

      <header>
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
              </div>
              <h1>{app.name}</h1>
              <p className="lead">{app.description}</p>
              <div className="hero-dl">
                {STORES.filter((s) => s.url).map((s) => (
                  <a
                    key={s.store}
                    className="store-btn"
                    data-store={s.store}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.name}${s.sub}`}
                  >
                    <span className="shine-clip" aria-hidden="true"></span>
                    <span className="si" aria-hidden="true">
                      <DownloadIcon />
                    </span>
                    <span className="st" aria-hidden="true">
                      <b>{s.name}</b>
                      <small>{s.sub}</small>
                    </span>
                    <span className="arr" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

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
        </section>

        <section className="features" id="features">
          <div className="wrap">
            <p className="hook reveal">
              {HOOK.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </div>
          <div className="feat-scroll">
            <div className="f-sticky">
              <div className="feat-list">
                {FEATURES.map((f, i) => (
                  <article key={f.title} className={`feat${i % 2 ? " rev" : ""}`}>
                    <div className="feat-text reveal">
                      <span className="feat-num" aria-hidden="true">
                        {pad2(i + 1)}
                      </span>
                      <h3>
                        <span className="sr">{i + 1}. </span>
                        {f.title}
                      </h3>
                      <p>{f.text}</p>
                    </div>
                    <div className="feat-media reveal d1">
                      <div className="feat-blob" aria-hidden="true"></div>
                      <div className="fphone">
                        <div className="fscreen" style={{ background: f.bg }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={f.img} alt={f.alt} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="wrap f-foot">
                <div className="g-bar" aria-hidden="true">
                  <i></i>
                </div>
                <div className="g-count" aria-hidden="true">
                  <b className="f-now">01</b> / {pad2(FEATURES.length)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="g-sticky">
            <div className="wrap g-head">
              <div className="section-label" aria-hidden="true">
                <i></i>SCREENS
              </div>
              <div className="g-count" aria-hidden="true">
                <b className="g-now">01</b> / {pad2(GALLERY.length)}
              </div>
            </div>
            <div className="g-track">
              {GALLERY.map((g, i) => (
                <figure
                  key={g.src}
                  className="hcard"
                  style={{ "--r": g.r, "--y": g.y, "--ar": g.ar } as React.CSSProperties}
                >
                  <span className="hnum" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} />
                </figure>
              ))}
            </div>
            <div className="wrap">
              <div className="g-bar" aria-hidden="true">
                <i></i>
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
                    className={`dl-card reveal d${i + 1}`}
                    data-store={s.store}
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
      <nav className="dock" aria-label="ページ内ナビとダウンロード">
        <div className="pills">
          <span className="indicator"></span>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} data-sec={id}>
              {label}
            </a>
          ))}
        </div>
        <a className="dock-dl" href="#download">
          <span className="ph-tile" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
              <path d={HEART_PATH} stroke="#f5f0d8" strokeWidth="10" strokeLinejoin="round" />
              <circle cx="44" cy="56" r="9" fill="#f5f0d8" />
              <circle cx="60" cy="58" r="5" fill="#f5f0d8" />
            </svg>
          </span>
          <span className="dock-label">ダウンロード</span>
        </a>
      </nav>
    </div>
  );
}
