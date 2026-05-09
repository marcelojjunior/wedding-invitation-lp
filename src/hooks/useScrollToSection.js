import { useContext } from "react";
import { LenisNavigationContext } from "../providers/lenis-context";

export function useScrollToSection() {
  const ctx = useContext(LenisNavigationContext);
  if (!ctx) {
    return {
      scrollToId: (id) => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    };
  }
  return ctx;
}
