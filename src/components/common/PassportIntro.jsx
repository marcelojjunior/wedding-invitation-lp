import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { LenisNavigationContext } from "../../providers/lenis-context";
import { cn } from "../../utils/cn";

/** Clamp bounds for JSON-driven duration values (seconds). */
const OPEN_SEC_MIN = 0.2;
const OPEN_SEC_MAX = 6;
const FADE_IN_SEC_MIN = 0.12;
const FADE_IN_SEC_MAX = 2.5;

function resolveOpenSec(value) {
  if (value == null || value === "") return 1.38;
  const n = Number(value);
  if (!Number.isFinite(n)) return 1.38;
  return Math.min(OPEN_SEC_MAX, Math.max(OPEN_SEC_MIN, n));
}

function resolveFadeInSec(value) {
  if (value == null || value === "") return 0.48;
  const n = Number(value);
  if (!Number.isFinite(n)) return 0.48;
  return Math.min(FADE_IN_SEC_MAX, Math.max(FADE_IN_SEC_MIN, n));
}

/**
 * Passport-style cover that opens in 3D after the user taps the open CTA.
 * Timing: `introFadeInSec`, `openDurationSec`. Button copy: `openInviteLabel`. Logo: `coverLogoSrc`, `coverLogoAlt`.
 */
export function PassportIntro({ intro, onComplete, skipAnimation }) {
  const [hingeOpen, setHingeOpen] = useState(false);
  const finishedRef = useRef(false);
  const lenisNav = useContext(LenisNavigationContext);

  const openDurationSec = resolveOpenSec(intro.openDurationSec);
  const introFadeInSec = resolveFadeInSec(intro.introFadeInSec);
  const openInviteLabel = intro.openInviteLabel ?? "Abrir convite";
  const coverLogoSrc = intro.coverLogoSrc ?? "/logo.png";
  const coverLogoAlt =
    intro.coverLogoAlt ?? intro.coupleLine ?? "Monograma do casal";

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

  /** Lock Lenis while overlay is open so wheel/touch does not scroll the page beneath. */
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
    <div
      className="fixed inset-0 z-[400] overscroll-none touch-none"
      style={{ perspective: "1700px", perspectiveOrigin: "left center" }}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${intro.topLabel} — ${intro.subLabel}`}
    >
      {/* Match hero: gradient, soft blobs, floating particles */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-champagne-200/90">
        <div className="absolute -left-24 top-1/4 h-[38rem] w-[38rem] rounded-full bg-butter-200/35 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-gold-400/15 blur-[100px]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]"
          aria-hidden
        />
        <FloatingParticles />
      </div>

      <motion.button
        type="button"
        className={cn(
          "fixed bottom-8 left-1/2 z-[410] w-[min(calc(100vw-2rem),24rem)] sm:bottom-10",
          "rounded-full bg-ink-800 px-8 py-3.5 text-sm font-medium tracking-wide text-cream-50",
          "shadow-[0_0_0_1px_rgba(47,40,32,0.12),0_12px_36px_-12px_rgba(47,40,32,0.4)]",
          "transition-[box-shadow] duration-500 ease-out-soft",
          "hover:shadow-[0_0_0_1px_rgba(184,149,106,0.35),0_16px_44px_-10px_rgba(184,149,106,0.28)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
          "disabled:pointer-events-none disabled:opacity-0",
        )}
        initial={{ opacity: 1, y: 0, x: "-50%" }}
        animate={{
          opacity: hingeOpen ? 0 : 1,
          y: hingeOpen ? 24 : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3, ease: softEase }}
        disabled={hingeOpen}
        onClick={() => setHingeOpen(true)}
      >
        {openInviteLabel}
      </motion.button>

      <motion.div
        className="absolute inset-0 origin-left will-change-transform"
        style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: hingeOpen ? -88 : 0 }}
        transition={{
          duration: openDurationSec,
          ease: softEase,
        }}
        onAnimationComplete={() => {
          if (hingeOpen) finish();
        }}
      >
        {/* Front face: transparent so the hero-matched gradient + particles behind show through */}
        <motion.div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center bg-transparent px-6 pb-28 pt-16 text-center sm:pb-32",
            "border-r border-gold-500/25 shadow-[16px_0_48px_-12px_rgba(47,40,32,0.12),inset_0_0_0_1px_rgba(184,149,106,0.18)]",
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: Math.min(introFadeInSec, 0.38),
            ease: softEase,
          }}
        >
          <div className="mx-auto flex max-w-md flex-col items-center gap-10 sm:gap-12">
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
              <p className="font-serif text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold-500 sm:text-[0.8rem]">
                {intro.subLabel}
              </p>
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
        </motion.div>
      </motion.div>
    </div>
  );
}
