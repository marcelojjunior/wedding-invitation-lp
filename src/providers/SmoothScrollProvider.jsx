import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { LenisNavigationContext } from "./lenis-context";

gsap.registerPlugin(ScrollTrigger);

function LenisBridge({ children, smoothScrollEnabled }) {
  const lenisRef = useRef(null);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { offset: -28, duration: 1.35, easing: (t) => 1 - (1 - t) ** 2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navigationValue = useMemo(
    () => ({ scrollToId, lenisRef }),
    [scrollToId],
  );

  useEffect(() => {
    if (!smoothScrollEnabled) {
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      ScrollTrigger.refresh();
      return;
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 0.85,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      ScrollTrigger.refresh();
    };
  }, [smoothScrollEnabled]);

  return (
    <LenisNavigationContext.Provider value={navigationValue}>
      {children}
    </LenisNavigationContext.Provider>
  );
}

export function SmoothScrollProvider({ children, smoothScrollEnabled }) {
  return (
    <LenisBridge smoothScrollEnabled={smoothScrollEnabled}>
      {children}
    </LenisBridge>
  );
}
