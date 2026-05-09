import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PassportIntro } from "./components/common/PassportIntro";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useWeddingContent } from "./hooks/useWeddingContent";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import { HeroSection } from "./sections/hero/HeroSection";

gsap.registerPlugin(ScrollTrigger);

const INTRO_STORAGE_KEY = "wedding-passport-intro-v1";

function resolveMainEnterSec(value) {
  if (value == null || value === "") return 0.88;
  const n = Number(value);
  if (!Number.isFinite(n)) return 0.88;
  return Math.min(2, Math.max(0.2, n));
}

function resolveMainOffsetY(value) {
  if (value == null || value === "") return 22;
  const n = Number(value);
  if (!Number.isFinite(n)) return 22;
  return Math.min(56, Math.max(0, n));
}

const StorySection = lazy(() =>
  import("./sections/story/StorySection").then((m) => ({ default: m.StorySection })),
);
const EventSection = lazy(() =>
  import("./sections/event/EventSection").then((m) => ({ default: m.EventSection })),
);
const QRCodesSection = lazy(() =>
  import("./sections/qr-codes/QRCodesSection").then((m) => ({
    default: m.QRCodesSection,
  })),
);
const DressCodeSection = lazy(() =>
  import("./sections/dress-code/DressCodeSection").then((m) => ({
    default: m.DressCodeSection,
  })),
);
const FooterSection = lazy(() =>
  import("./sections/footer/FooterSection").then((m) => ({ default: m.FooterSection })),
);

function BelowFoldFallback() {
  return <div className="min-h-[30vh] w-full" aria-hidden />;
}

export default function App() {
  const content = useWeddingContent();
  const reducedMotion = useReducedMotion();
  const smoothScrollEnabled = !reducedMotion;

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined" || !content.intro?.enabled) return false;
    try {
      if (
        content.intro.showOncePerSession &&
        sessionStorage.getItem(INTRO_STORAGE_KEY)
      ) {
        return false;
      }
    } catch {
      /* private mode */
    }
    return true;
  });

  const handleIntroDone = useCallback(() => {
    if (content.intro?.showOncePerSession) {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        /* noop */
      }
    }
    setShowIntro(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [content.intro?.showOncePerSession]);

  const mainEnterSec = resolveMainEnterSec(content.intro?.mainEnterDurationSec);
  const mainOffsetY = resolveMainOffsetY(content.intro?.mainEnterOffsetY);
  const easeOutSoft = [0.22, 1, 0.36, 1];

  useEffect(() => {
    document.title = content.meta.siteTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", content.meta.siteDescription);
    }
  }, [content.meta.siteDescription, content.meta.siteTitle]);

  return (
    <SmoothScrollProvider smoothScrollEnabled={smoothScrollEnabled}>
      {showIntro && content.intro?.enabled ? (
        <PassportIntro
          intro={content.intro}
          onComplete={handleIntroDone}
          skipAnimation={reducedMotion}
        />
      ) : null}
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] rounded-md bg-cream-50 px-3 py-2 text-sm font-medium text-ink-800 opacity-0 shadow-lg ring-2 ring-gold-400/80 transition focus:pointer-events-auto focus:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100"
      >
        Pular para o início
      </a>
      <div className="grain" aria-hidden />
      <motion.main
        id="main-content"
        initial={
          reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: mainOffsetY }
        }
        animate={
          reducedMotion || !showIntro
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: mainOffsetY }
        }
        transition={{
          duration: reducedMotion ? 0 : mainEnterSec,
          ease: easeOutSoft,
        }}
      >
        <HeroSection
          data={content.hero}
          coupleLine={content.intro?.coupleLine}
        />
        <Suspense fallback={<BelowFoldFallback />}>
          <StorySection data={content.story} />
          <EventSection data={content.event} />
          <QRCodesSection cards={content.qrCards} />
          <DressCodeSection data={content.dressCode} />
          <FooterSection data={content.footer} />
        </Suspense>
      </motion.main>
    </SmoothScrollProvider>
  );
}
