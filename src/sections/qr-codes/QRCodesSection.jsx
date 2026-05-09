import { motion } from "framer-motion";
import { Gift, Plane, Sparkles } from "lucide-react";
import { QRCode } from "react-qr-code";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { GlassCard } from "../../components/ui/GlassCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../utils/cn";

const accentById = {
  rsvp: "from-butter-200/50 to-transparent",
  gifts: "from-champagne-300/60 to-transparent",
  pix: "from-gold-400/25 to-transparent",
};

const icons = {
  rsvp: Plane,
  gifts: Gift,
  pix: Sparkles,
};

export function QRCodesSection({ cards }) {
  const reduced = useReducedMotion();

  return (
    <Section
      id="qr-codes"
      className="border-y border-ink-800/5 bg-cream-100/80 py-24 sm:py-32"
      aria-labelledby="qr-heading"
    >
      <Container>
        <div className="mb-12 text-center sm:mb-16">
          <h2
            id="qr-heading"
            className="font-serif text-3xl font-medium text-ink-900 sm:text-4xl"
          >
            Check-in e bagagem
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-ink-700/80">
            Toque ou escaneie para seguir para cada destino.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = icons[card.id] ?? Sparkles;
            const qrValue =
              card.id === "pix" && card.pixCopyPaste ? card.pixCopyPaste : card.url;
            return (
              <motion.article
                key={card.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden p-7 sm:p-8",
                    "transition-[transform,box-shadow] duration-500 hover:-translate-y-1",
                    "hover:shadow-[0_20px_48px_-20px_rgba(47,40,32,0.28)]",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br blur-2xl",
                      accentById[card.id] ?? accentById.pix,
                    )}
                    aria-hidden
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="flex size-11 items-center justify-center rounded-boarding border border-white/50 bg-white/35 text-gold-500">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-ink-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700/85">
                        {card.body}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-8 flex justify-center">
                    <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-inner">
                      <QRCode
                        value={qrValue}
                        size={132}
                        level="M"
                        fgColor="#2f2820"
                        bgColor="#faf6ef"
                        title={`QR code: ${card.title}`}
                        role="img"
                      />
                    </div>
                  </div>

                  <a
                    href={card.url}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "relative mt-6 text-center text-sm font-medium text-gold-500 underline-offset-4",
                      "hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 rounded-sm",
                    )}
                  >
                    Acessar link
                  </a>
                </GlassCard>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
