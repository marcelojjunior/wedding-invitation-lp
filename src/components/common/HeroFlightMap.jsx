import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

/** Matches `public/2831458.svg` (viewBox 0 0 1280 643) */
const MAP_VIEW_W = 1280;
const MAP_VIEW_H = 643;

/** Trail start ≈ South America; heart-shaped loop over the Atlantic */
const STAR_X = 400;
const STAR_Y = 432;

const FLIGHT_PATH_D =
  `M ${STAR_X} ${STAR_Y} ` +
  "C 505 422 642 400 708 391 " +
  "C 722 387 732 388 735 392 " +
  "C 608 320 492 245 562 172 " +
  "C 583 122 670 105 735 162 " +
  "C 800 105 887 122 908 172 " +
  "C 978 245 862 320 735 405 " +
  `C 612 418 488 432 ${STAR_X} ${STAR_Y} Z`;

const PLANE_ROTATION_OFFSET = 35;

/** Lucide `Plane` icon path (lucide-react, ISC) — native viewBox 24×24 */
const LUCIDE_PLANE_PATH_D =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

const PLANE_ICON_SCALE = 1.72;

export function HeroFlightMap({
  reducedMotion,
  durationSec = 22,
  mapSrc = "/2831458.svg",
}) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pathEl = pathRef.current;
    const planeEl = planeRef.current;
    if (!root || !pathEl || !planeEl) return undefined;

    const ctx = gsap.context(() => {
      const len = pathEl.getTotalLength();

      if (reducedMotion) {
        const t = len * 0.42;
        const pt = pathEl.getPointAtLength(t);
        const ptN = pathEl.getPointAtLength(Math.min(t + 2, len - 0.01));
        const ang = (Math.atan2(ptN.y - pt.y, ptN.x - pt.x) * 180) / Math.PI;
        gsap.set(planeEl, {
          x: pt.x,
          y: pt.y,
          rotation: ang + PLANE_ROTATION_OFFSET,
          opacity: 1,
        });
      } else {
        gsap.set(planeEl, { x: 0, y: 0, rotation: 0, opacity: 1, transformOrigin: "50% 50%" });

        gsap.to(planeEl, {
          repeat: -1,
          ease: "none",
          duration: durationSec,
          immediateRender: true,
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
            autoRotate: PLANE_ROTATION_OFFSET,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, durationSec]);

  const vb = `0 0 ${MAP_VIEW_W} ${MAP_VIEW_H}`;

  return (
    <div ref={rootRef} className="flex w-full flex-col items-stretch">
      <div className="pointer-events-none relative h-full min-h-[220px] w-full select-none sm:min-h-[260px] lg:min-h-[300px]">
      <img
        src={mapSrc}
        alt=""
        width={MAP_VIEW_W}
        height={MAP_VIEW_H}
        decoding="async"
        className="absolute inset-0 z-0 mx-auto h-full w-full object-contain object-center opacity-[0.18] contrast-[0.92] mix-blend-multiply"
      />

      <svg
        className="relative z-10 h-full w-full overflow-visible text-ink-800"
        viewBox={vb}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          ref={pathRef}
          d={FLIGHT_PATH_D}
          fill="none"
          stroke="currentColor"
          strokeWidth={5.75}
          strokeDasharray="12 16"
          strokeLinecap="round"
          className="text-gold-500/70"
        />

        <g transform={`translate(${STAR_X} ${STAR_Y})`}>
          <polygon
            points="0,-8 2.5,-2 8,0 2.5,2 0,8 -2.5,2 -8,0 -2.5,-2"
            className="text-gold-500"
            fill="currentColor"
            opacity={0.9}
          />
        </g>

        <g ref={planeRef} className="text-ink-800">
          <g
            transform={`translate(-12,-12) scale(${PLANE_ICON_SCALE})`}
            aria-hidden
          >
            <path fill="currentColor" d={LUCIDE_PLANE_PATH_D} />
          </g>
        </g>
      </svg>
      </div>
    </div>
  );
}
