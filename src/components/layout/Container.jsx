import { cn } from "../../utils/cn";

export function Container({ className, children, as: Component = "div", ...rest }) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
