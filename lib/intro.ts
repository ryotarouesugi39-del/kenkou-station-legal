/*
 * トップページと健康ステーションページで共通の演出（デザイン案のスクリプトをそのまま移したもの）。
 *  - runLoader: ローディング（ハートを描く→TOIMANが下から→幕が上がる）
 *  - imeType: 日本語入力風タイピング（ローマ字→かな→変換→確定）
 * どちらも、呼び出し側の useEffect の後片付けで止められるよう、タイマーを Timers に登録する。
 */

/** setTimeout / requestAnimationFrame をまとめて止めるための入れ物 */
export class Timers {
  private timeouts = new Set<number>();
  private frames = new Set<number>();
  private stopped = false;

  timeout(fn: () => void, ms: number) {
    if (this.stopped) return;
    const id = window.setTimeout(() => {
      this.timeouts.delete(id);
      fn();
    }, ms);
    this.timeouts.add(id);
  }

  frame(fn: (now: number) => void) {
    if (this.stopped) return;
    const id = window.requestAnimationFrame((now) => {
      this.frames.delete(id);
      fn(now);
    });
    this.frames.add(id);
  }

  clear() {
    this.stopped = true;
    this.timeouts.forEach((id) => window.clearTimeout(id));
    this.frames.forEach((id) => window.cancelAnimationFrame(id));
    this.timeouts.clear();
    this.frames.clear();
  }
}

const ROMA: Record<string, string> = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ", ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  sa: "さ", shi: "し", si: "し", su: "す", se: "せ", so: "そ", za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  ta: "た", chi: "ち", ti: "ち", tsu: "つ", tu: "つ", te: "て", to: "と", da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の", ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ", pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も", ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ", wa: "わ", wo: "を", nn: "ん", xn: "ん",
  sho: "しょ", sha: "しゃ", shu: "しゅ", cho: "ちょ", cha: "ちゃ", ja: "じゃ", jo: "じょ",
  "-": "ー", ",": "、", ".": "。", "/": "・",
};

function toKana(r: string) {
  let out = "";
  let i = 0;
  while (i < r.length) {
    let hit = false;
    for (let L = 3; L >= 1; L--) {
      const k = r.substr(i, L);
      if (k.length === L && ROMA[k]) {
        out += ROMA[k];
        i += L;
        hit = true;
        break;
      }
    }
    if (hit) continue;
    const c = r[i];
    const nx = r[i + 1];
    if (c === "n" && nx && !/[aiueoyn]/.test(nx)) {
      out += "ん";
      i++;
      continue;
    }
    if (nx && c === nx && !/[aiueon]/.test(c)) {
      out += "っ";
      i++;
      continue;
    }
    out += r.slice(i); // まだ途中のローマ字はそのまま表示
    break;
  }
  return out;
}

function kata(s: string) {
  return s.replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 96));
}

/** [確定後の文字, 打つローマ字, 確定後に改行するか] */
export type ImeSegment = [string, string, boolean?];

/** 日本語入力風タイピング（ローマ字で打つ → かなになる → 変換キーで漢字/カタカナに → 確定） */
export function imeType(el: HTMLElement, segs: ImeSegment[], timers: Timers, done?: () => void) {
  const full = segs.map((s) => s[0]).join("");
  el.setAttribute("aria-label", full);
  el.innerHTML =
    '<span aria-hidden="true" class="ime-done"></span><span aria-hidden="true" class="ime"></span><span class="caret is-typing" aria-hidden="true"></span><span aria-hidden="true" class="ghost" style="visibility:hidden"></span>';
  const doneEl = el.querySelector(".ime-done") as HTMLElement;
  const comp = el.querySelector(".ime") as HTMLElement;
  const caret = el.querySelector(".caret") as HTMLElement;
  const ghost = el.querySelector(".ghost") as HTMLElement;
  let si = 0;
  let committed = "";
  const rest = () =>
    segs
      .slice(si + 1)
      .map((s) => s[0] + (s[2] ? "\n" : ""))
      .join("");

  function seg() {
    if (si >= segs.length) {
      comp.textContent = "";
      caret.classList.remove("is-typing");
      if (done) done();
      return;
    }
    const target = segs[si][0];
    const roma = segs[si][1];
    let k = 0;
    ghost.textContent = (segs[si][2] ? "\n" : "") + rest();

    function commit() {
      committed += target + (segs[si][2] ? "\n" : "");
      doneEl.textContent = committed;
      comp.textContent = "";
      comp.className = "ime";
      si++;
      timers.timeout(seg, 40);
    }

    (function key() {
      k++;
      comp.className = "ime";
      comp.textContent = toKana(roma.slice(0, k));
      if (k < roma.length) {
        timers.timeout(key, 28 + Math.random() * 32);
        return;
      }
      const finalKana = toKana(roma);
      if (finalKana === target) {
        timers.timeout(commit, /[、。]$/.test(target) ? 180 : 70);
        return;
      }
      // 変換（スペースキー）
      timers.timeout(() => {
        comp.className = "ime is-conv";
        comp.textContent = kata(finalKana) === target ? kata(finalKana) : target;
        timers.timeout(commit, 190);
      }, 110);
    })();
  }
  seg();
}

/** ローディング。2回目以降（同じタブ内）は短く再生する */
export function runLoader(ld: HTMLElement | null, reduce: boolean, timers: Timers, onReveal: () => void) {
  if (!ld) {
    onReveal();
    return () => {};
  }
  let quick = false;
  try {
    quick = sessionStorage.getItem("toimanSeen") === "1";
    sessionStorage.setItem("toimanSeen", "1");
  } catch {}
  if (reduce) {
    ld.classList.add("is-done");
    onReveal();
    return () => {};
  }
  if (quick) ld.classList.add("is-quick");
  const dur = quick ? 600 : 1400;
  const start = performance.now();
  let loaded = document.readyState === "complete";
  const onLoad = () => {
    loaded = true;
  };
  window.addEventListener("load", onLoad);
  const tick = (now: number) => {
    if (now - start < dur || !loaded) {
      timers.frame(tick);
      return;
    }
    timers.timeout(() => {
      ld.classList.add("is-leaving");
      timers.timeout(onReveal, 350);
      timers.timeout(() => ld.classList.add("is-done"), 950);
    }, 150);
  };
  tick(start);
  return () => window.removeEventListener("load", onLoad);
}

/** アプリ画面を数秒ごとに切り替え（ヒーローのスマホ） */
export function startSlides(root: HTMLElement, reduce: boolean) {
  const slides = root.querySelectorAll(".screen .slide");
  const dots = root.querySelectorAll(".slide-dots i");
  if (slides.length < 2 || reduce) return () => {};
  let n = 0;
  const id = window.setInterval(() => {
    slides[n].classList.remove("is-on");
    dots[n].classList.remove("is-on");
    n = (n + 1) % slides.length;
    slides[n].classList.add("is-on");
    dots[n].classList.add("is-on");
  }, 3800);
  return () => window.clearInterval(id);
}

// アイコン画像の元になったハートの形（イラスト・演出用）
export const HEART_PATH =
  "M50 84 C 26 68, 13 53, 13 37 C 13 24, 23 15, 34 15 C 42 15, 47 20, 50 26 C 53 20, 58 15, 66 15 C 77 15, 87 24, 87 37 C 87 53, 74 68, 50 84 Z";
