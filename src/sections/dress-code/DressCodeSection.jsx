import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function DressCodeSection({ data }) {
  const reduced = useReducedMotion();

  return (
    <Section
      id="dress-code"
      className="relative overflow-hidden py-24 sm:py-36"
      aria-labelledby="dress-heading"
    >
      <div className="absolute inset-0 -z-10 bg-ink-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(245,235,200,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_100%,rgba(196,169,144,0.1),transparent_50%)]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-champagne-200/80">
            Dress code
          </p>
          <h2
            id="dress-heading"
            className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-snug text-cream-50"
          >
            <Balancer>{data.headline}</Balancer>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-relaxed text-cream-100/70 sm:text-base" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
        </div>

        <motion.ul
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.forbidden.map((item, i) => (
            <motion.li
              key={item.key}
              className="group flex flex-col items-center text-center"
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="relative mb-4 h-28 w-full max-w-[8.5rem] overflow-hidden rounded-boarding border border-white/15 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] sm:h-32"
                style={{ backgroundColor: item.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-cream-100/75">
                {item.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
