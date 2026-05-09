import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function FooterSection({ data }) {
  const reduced = useReducedMotion();

  return (
    <Section
      id="footer"
      className="border-t border-ink-800/10 bg-cream-200/50 py-20 sm:py-24"
      aria-labelledby="footer-heading"
    >
      <Container>
        <h2 id="footer-heading" className="sr-only">
          Painel de partidas
        </h2>

        <div className="overflow-hidden rounded-[1rem] border border-ink-800/10 bg-ink-800 text-cream-100 shadow-[0_24px_60px_-28px_rgba(47,40,32,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-champagne-200/80 sm:px-8">
            <span>{data.departuresLabel}</span>
            <span className="flex gap-6">
              <span>
                {data.gateLabel}: {data.gate}
              </span>
              <span>
                {data.coordinatesLabel}: {data.coordinates}
              </span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[0.65rem] uppercase tracking-[0.2em] text-champagne-200/65">
                  <th scope="col" className="px-6 py-3 sm:px-8">
                    Voo
                  </th>
                  <th scope="col" className="px-6 py-3 sm:px-8">
                    Horário
                  </th>
                  <th scope="col" className="px-6 py-3 sm:px-8">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.boardRows.map((row) => (
                  <tr
                    key={row.flight}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-cream-50 sm:px-8 sm:text-sm">
                      {row.flight}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-champagne-200 sm:px-8 sm:text-sm">
                      {row.time}
                    </td>
                    <td className="px-6 py-4 text-xs text-gold-400 sm:px-8 sm:text-sm">
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p
            className="border-t border-white/10 px-6 py-10 text-center font-serif text-lg text-cream-50 sm:px-8 sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <Balancer>{data.closingLine}</Balancer>
              <Plane className="size-[1.1em] shrink-0 text-gold-400" aria-hidden />
            </span>
          </motion.p>
        </div>

        <p className="mt-10 text-center text-[0.7rem] uppercase tracking-[0.2em] text-ink-700/45">
          Convite digital · 2026
        </p>
      </Container>
    </Section>
  );
}
