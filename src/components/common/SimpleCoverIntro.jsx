import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { LenisNavigationContext } from "../../providers/lenis-context";
import { cn } from "../../utils/cn";

const SLIDE_MIN = 0.35;
const SLIDE_MAX = 1.4;

function resolveSlideSec(value) {
  if (value == null || value === "") return 0.62;
  const n = Number(value);
  if (!Number.isFinite(n)) return 0.62;
  return Math.min(SLIDE_MAX, Math.max(SLIDE_MIN, n));
}

/**
 * Full-screen cover matching the hero palette. Dismiss slides the panel left so the page is visible underneath.
 */
export function SimpleCoverIntro({ intro, onComplete, skipAnimation }) {
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);
  const lenisNav = useContext(LenisNavigationContext);

  const openInviteLabel = intro.openInviteLabel ?? "Abrir convite";
  const coverLogoSrc = intro.coverLogoSrc ?? "/logo.png";
  const coverLogoAlt =
    intro.coverLogoAlt ?? intro.coupleLine ?? "Monograma do casal";
  const slideOutSec = resolveSlideSec(intro.slideOutSec);

  const softEase = [0.22, 1, 0.36, 1];

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (skipAnimation) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skipAnimation]);

  useEffect(() => {
    if (skipAnimation) return undefined;
    const lenis = lenisNav?.lenisRef?.current;
    if (lenis) lenis.stop();
    return () => {
      if (lenis) lenis.start();
    };
  }, [lenisNav, skipAnimation]);

  useEffect(() => {
    if (!skipAnimation) return;
    finish();
  }, [skipAnimation, finish]);

  if (skipAnimation) return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[400] flex flex-col overflow-hidden overscroll-none touch-none",
        "bg-cream-50 shadow-[12px_0_40px_-8px_rgba(47,40,32,0.18)]",
        exiting && "pointer-events-none",
      )}
      style={{ willChange: exiting ? "transform" : "auto" }}
      data-lenis-prevent
      initial={{ x: "0%" }}
      animate={{ x: exiting ? "-100%" : "0%" }}
      transition={{ duration: slideOutSec, ease: softEase }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${intro.topLabel} — ${intro.subLabel ?? intro.coupleLine}`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-champagne-200">
        <div className="absolute -left-24 top-1/4 h-[38rem] w-[38rem] rounded-full bg-butter-200/35 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-gold-400/15 blur-[100px]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]"
          aria-hidden
        />
        <FloatingParticles />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-32 pt-16 text-center sm:pb-36">
        <div className="mx-auto flex max-w-md flex-col items-center gap-8 sm:gap-10">
          <p className="font-serif text-[0.68rem] font-medium uppercase tracking-[0.42em] text-gold-500 sm:text-xs">
            {intro.topLabel}
          </p>

          <div className="flex w-full justify-center px-2">
            <img
              src={coverLogoSrc}
              alt={coverLogoAlt}
              decoding="async"
              fetchPriority="high"
              className="h-auto w-full max-w-[min(85vw,280px)] object-contain sm:max-w-[min(72vw,320px)]"
            />
          </div>

          <div className="space-y-5 sm:space-y-6">
            {intro.subLabel ? (
              <p className="font-serif text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold-500 sm:text-[0.8rem]">
                {intro.subLabel}
              </p>
            ) : null}
            <p
              className="text-[clamp(2.1rem,7vw,3.25rem)] leading-tight text-gold-500"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {intro.coupleLine}
            </p>
            <p className="font-serif text-sm text-ink-800/90 sm:text-base">
              {intro.dateLine}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          "fixed bottom-8 left-1/2 z-[410] w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2 sm:bottom-10",
          "rounded-full bg-ink-800 px-8 py-3.5 text-sm font-medium tracking-wide text-cream-50",
          "shadow-[0_0_0_1px_rgba(47,40,32,0.12),0_12px_36px_-12px_rgba(47,40,32,0.4)]",
          "transition-[box-shadow] duration-500 ease-out-soft",
          "hover:shadow-[0_0_0_1px_rgba(184,149,106,0.35),0_16px_44px_-10px_rgba(184,149,106,0.28)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
        onClick={() => setExiting(true)}
      >
        {openInviteLabel}
      </button>
    </motion.div>
  );
}
