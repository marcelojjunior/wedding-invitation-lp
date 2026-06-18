import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Balancer from "react-wrap-balancer";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/** Lucide `Plane` path (viewBox 24×24), scaled for story SVG viewBox */
const LUCIDE_PLANE_PATH_D =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

const STORY_PLANE_SCALE = 0.72;
const PLANE_ROTATION_OFFSET = 35;

/** Lucide `Heart` path (viewBox 24×24) */
const LUCIDE_HEART_PATH_D =
  "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5";

const STORY_HEART_SCALE = 0.42;

export function StorySection({ data }) {
  const rootRef = useRef(null);
  const quoteRef = useRef(null);
  const citeRef = useRef(null);
  const narrativeRef = useRef(null);
  const coupleLineRef = useRef(null);
  const svgRef = useRef(null);
  const planeRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current || !svgRef.current) return undefined;

    const path = svgRef.current.querySelector(".path-flight");
    const planeEl = planeRef.current;
    if (!path || !planeEl) return undefined;

    const ctx = gsap.context(() => {
      if (reduced) {
        const len = path.getTotalLength();
        const t = len * 0.48;
        const pt = path.getPointAtLength(t);
        const ptN = path.getPointAtLength(Math.min(t + 2, len - 0.01));
        const ang = (Math.atan2(ptN.y - pt.y, ptN.x - pt.x) * 180) / Math.PI;
        gsap.set(planeEl, {
          x: pt.x,
          y: pt.y,
          rotation: ang + PLANE_ROTATION_OFFSET,
          transformOrigin: "50% 50%",
          opacity: 1,
        });
        if (coupleLineRef.current) {
          gsap.set(coupleLineRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      if (coupleLineRef.current) {
        gsap.from(coupleLineRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const blocks = [quoteRef.current, citeRef.current, narrativeRef.current].filter(
        Boolean,
      );
      gsap.from(blocks, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      const length = path.getTotalLength?.() ?? 800;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1.2,
        },
      });

      gsap.set(planeEl, { x: 0, y: 0, rotation: 0, opacity: 1, transformOrigin: "50% 50%" });
      gsap.to(planeEl, {
        ease: "none",
        immediateRender: true,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1.2,
        },
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: PLANE_ROTATION_OFFSET,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, data.coupleLine]);

  return (
    <Section
      id="story"
      ref={rootRef}
      className="border-t border-ink-800/5 bg-cream-100/80 pt-24 pb-14 sm:pt-32 sm:pb-20"
      aria-labelledby="story-heading"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:items-center">
          <div className="space-y-10">
            <h2 id="story-heading" className="sr-only">
              Nossa história
            </h2>
            <blockquote
              ref={quoteRef}
              className={cn(
                "font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-normal leading-relaxed text-ink-800",
                reduced && "opacity-100",
              )}
            >
              <Balancer>{data.bibleQuote}</Balancer>
              <cite
                ref={citeRef}
                className={cn(
                  "mt-1.5 block text-sm font-medium uppercase not-italic tracking-[0.25em] text-gold-500",
                  reduced && "opacity-100",
                )}
              >
                {data.bibleReference}
              </cite>
            </blockquote>
            <p
              ref={narrativeRef}
              className={cn(
                "max-w-xl text-pretty text-base leading-relaxed text-ink-700/90 sm:text-lg",
                reduced && "opacity-100",
              )}
              dangerouslySetInnerHTML={{ __html: data.narrative }}
            />
          </div>

          <div className="flex flex-col gap-0 lg:gap-8">
            {data.coupleLine ? (
              <p
                ref={coupleLineRef}
                className={cn(
                  "text-center text-[clamp(2.3rem,6.5vw,3rem)] leading-tight text-gold-500",
                  reduced && "opacity-100",
                )}
                style={{ fontFamily: "var(--font-script)" }}
              >
                {data.coupleLine}
              </p>
            ) : null}
            <div
              ref={svgRef}
              className="relative flex min-h-[14rem] items-center justify-center lg:min-h-[18rem]"
              aria-hidden
            >
              <svg
                viewBox="0 0 400 240"
                className="h-full w-full max-w-md overflow-visible text-nude-300/90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path-flight"
                  d="M20 200 C 100 40, 200 220, 380 40"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                />
                <g
                  transform={`translate(20 200) scale(${STORY_HEART_SCALE}) translate(-12 -12)`}
                  className="text-gold-500/90"
                >
                  <path fill="currentColor" d={LUCIDE_HEART_PATH_D} />
                </g>
                <g
                  transform={`translate(380 40) scale(${STORY_HEART_SCALE}) translate(-12 -12)`}
                  className="text-gold-500/90"
                >
                  <path fill="currentColor" d={LUCIDE_HEART_PATH_D} />
                </g>
                <g ref={planeRef} className="text-ink-800">
                  <g transform={`translate(-12,-12) scale(${STORY_PLANE_SCALE})`}>
                    <path fill="currentColor" d={LUCIDE_PLANE_PATH_D} />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
