import { cn } from "../../utils/cn";

export function GlassCard({ className, children, ...rest }) {
  return (
    <div
      className={cn(
        "rounded-boarding border border-white/40 bg-white/25 shadow-[0_8px_32px_-8px_rgba(47,40,32,0.15)] backdrop-blur-xl backdrop-saturate-150",
        "transition-shadow duration-500 ease-out-soft",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
