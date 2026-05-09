import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { HeroFlightMap } from "../../components/common/HeroFlightMap";
import { FloatingParticles } from "../../components/common/FloatingParticles";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../utils/cn";

export function HeroSection({ data }) {
  const reduced = useReducedMotion();
  const ctaUrl = data.ctaUrl ?? "https://noivos.casar.com/marilia-e-davy";
  const showFlightMap = data.flightMap?.enabled !== false;
  const coupleLine = data.coupleLine;
  const hasCoupleBlockAboveMap = Boolean(coupleLine || data.subLabel);
  const showNamesClusterAboveMap = Boolean(
    showFlightMap && hasCoupleBlockAboveMap,
  );

  const softFade = reduced
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
      };

  const ticket = data.boardingTicket;

  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      className="flex min-h-dvh flex-col gap-10 pb-16 pt-20 sm:gap-12 sm:pt-24 sm:pb-20 lg:min-h-[60dvh]"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-champagne-200/90">
        <div className="absolute -left-24 top-1/4 h-[38rem] w-[38rem] rounded-full bg-butter-200/35 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-gold-400/15 blur-[100px]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]"
          aria-hidden
        />
        <FloatingParticles />
      </div>

      <Container className="relative z-0 flex min-h-0 w-full flex-1 flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:gap-14">
        {showFlightMap ? (
          <div className="order-1 flex w-full max-w-full flex-col gap-2 max-lg:flex-1 max-lg:min-h-[200px] shrink-0 lg:order-2 lg:max-h-[min(52vh,520px)] lg:w-[min(42%,440px)] lg:max-w-[460px] xl:w-[min(40%,500px)]">
            {showNamesClusterAboveMap ? (
              <motion.div
                className="flex flex-col gap-0.5 text-center sm:gap-1"
                {...(reduced
                  ? { initial: false, animate: { opacity: 1, y: 0 } }
                  : {
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: {
                        duration: 1,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    })}
              >
                {data.subLabel ? (
                  <p className="font-serif text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold-500 sm:text-[0.75rem]">
                    {data.subLabel}
                  </p>
                ) : null}
                {coupleLine ? (
                  <p
                    className="text-[clamp(2.1rem,7vw,3.25rem)] leading-[1.1] text-gold-500"
                    style={{ fontFamily: "var(--font-script)" }}
                  >
                    {coupleLine}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
            <div className="min-h-0 min-w-0 flex-1">
              <HeroFlightMap
                reducedMotion={reduced}
                durationSec={data.flightMap?.durationSec ?? 22}
                mapSrc={data.flightMap?.mapSrc ?? "/2831458.svg"}
              />
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "order-2 flex flex-col gap-10 lg:order-1 lg:max-w-xl xl:max-w-2xl",
            !showFlightMap && "mx-auto w-full max-w-3xl",
          )}
        >
          <motion.div {...softFade} className="max-w-3xl space-y-2">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-gold-500/90">
              {data.routeCaption}
            </p>
            <h1
              id="hero-heading"
              className="font-serif text-[clamp(2.25rem,6vw,3.75rem)] font-medium leading-[1.12] text-ink-900"
            >
              <Balancer>{data.headlineLine1}</Balancer>
              <span className="mt-2 block text-nude-400">
                <Balancer>{data.headlineLine2}</Balancer>
              </span>
            </h1>
          </motion.div>

          <motion.div
            {...(reduced
              ? { initial: false, animate: { opacity: 1 } }
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: 0.2,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                })}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="w-full min-w-0 lg:max-w-none lg:flex-1">
              {ticket ? (
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-ink-800/12",
                    "bg-cream-100/92 shadow-[0_1px_0_rgba(47,40,32,0.06),inset_0_1px_0_rgba(255,255,255,0.45)]",
                  )}
                  role="group"
                  aria-label="Cartão de embarque"
                >
                  <div className="grid grid-cols-3 divide-x divide-dotted divide-ink-800/18">
                    <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2.5 py-4 text-center sm:gap-1 sm:px-5 sm:py-5 sm:pl-6 sm:pr-5 lg:py-4">
                      <span className="font-serif text-xl font-medium leading-none text-ink-800 sm:text-[clamp(1.45rem,3.2vw,1.7rem)] lg:text-[clamp(1.2rem,1.35vw,1.35rem)]">
                        {ticket.originCode}
                      </span>
                      <span className="max-w-[6rem] font-sans text-[0.64rem] font-medium uppercase leading-snug tracking-[0.08em] text-ink-700/85 sm:max-w-[12rem] sm:text-[0.7rem] sm:tracking-[0.12em] lg:text-[0.65rem] lg:tracking-[0.1em]">
                        {ticket.originCityLine}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-col items-center justify-center gap-1.5 px-2.5 py-4 text-center sm:gap-3 sm:px-6 sm:py-5 lg:gap-2 lg:py-4">
                      <p className="font-sans text-[0.58rem] font-medium uppercase tracking-[0.11em] text-ink-700/65 sm:text-[0.65rem] sm:tracking-[0.22em] lg:text-[0.6rem] lg:tracking-[0.18em]">
                        {ticket.midLabel}
                      </p>
                      <p className="font-serif text-[0.74rem] font-medium uppercase leading-tight tracking-[0.04em] text-ink-800 sm:text-base sm:tracking-[0.06em] lg:text-sm">
                        {ticket.midHeadline}
                      </p>
                      <div
                        className="flex w-full max-w-[3.5rem] items-center gap-0.5 sm:max-w-[13rem] sm:gap-2"
                        aria-hidden
                      >
                        <span className="h-px min-w-0 flex-1 bg-ink-800/[0.22]" />
                        <Plane className="size-3 shrink-0 text-ink-800/55 sm:size-3.5 lg:size-3" />
                        <span className="h-px min-w-0 flex-1 bg-ink-800/[0.22]" />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2.5 py-4 text-center sm:gap-1 sm:px-5 sm:py-5 sm:pl-5 sm:pr-6 lg:py-4">
                      <span className="font-serif text-base font-medium text-ink-800 sm:text-base lg:text-sm">
                        {ticket.gateLabel}
                      </span>
                      <span className="font-serif text-lg font-medium tabular-nums leading-none text-ink-800 sm:text-[clamp(1.15rem,2.6vw,1.45rem)] lg:text-[clamp(1rem,1.2vw,1.15rem)]">
                        {ticket.gateDate}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${data.ctaLabel} (abre em outra aba)`}
              className={cn(
                "group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full",
                "whitespace-nowrap bg-ink-800 px-8 py-3.5 text-sm font-medium tracking-wide text-cream-50",
                "shadow-[0_0_0_1px_rgba(47,40,32,0.12),0_16px_42px_-12px_rgba(47,40,32,0.45)]",
                "transition-[transform,box-shadow] duration-500 ease-out-soft",
                "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(184,149,106,0.35),0_20px_50px_-10px_rgba(184,149,106,0.35)]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
              )}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {data.ctaLabel}
                <Plane className="size-3.5 shrink-0 opacity-90" aria-hidden />
              </span>
              <span
                className="absolute inset-0 -z-0 bg-gradient-to-tr from-gold-500/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
            </a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
