import { forwardRef } from "react";
import { HEART_PATH } from "@/lib/intro";

const WORD = ["T", "O", "I", "M", "A", "N"];

/** ローディング（ハートを描く→TOIMANが下から→幕が上がる）。動きは lib/intro.ts の runLoader */
const Loader = forwardRef<HTMLDivElement>(function Loader(_, ref) {
  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="ld-panel dark">
        <div className="ld-center">
          <svg className="ld-mark" viewBox="0 0 100 100">
            <path className="ld-heart" pathLength={1} d={HEART_PATH} />
            <circle className="ld-dot a" cx="44" cy="56" r="7.5" />
            <circle className="ld-dot b" cx="59" cy="58" r="4.2" />
          </svg>
          <div className="ld-word">
            {WORD.map((c, n) => (
              <span key={n}>
                <i style={{ "--n": n } as React.CSSProperties}>{c}</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Loader;
