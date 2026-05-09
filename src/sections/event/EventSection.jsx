import { ExternalLink, MapPin, Plane, Clock, CalendarDays } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { GlassCard } from "../../components/ui/GlassCard";
import { cn } from "../../utils/cn";

const fieldIcons = {
  destination: Plane,
  boardingDate: CalendarDays,
  departureTime: Clock,
  location: MapPin,
};

export function EventSection({ data }) {
  const fields = [
    { key: "destination", label: data.labels.destination, value: data.destination },
    { key: "boardingDate", label: data.labels.boardingDate, value: data.boardingDate },
    { key: "departureTime", label: data.labels.departureTime, value: data.departureTime },
    { key: "location", label: data.labels.location, value: data.venueName },
  ];

  return (
    <Section
      id="event"
      className="relative pt-14 pb-24 sm:pt-20 sm:pb-32"
      aria-labelledby="event-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-100 via-champagne-200/40 to-cream-100" />

      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center sm:mb-14">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.35em] text-gold-500">
              Informações de voo
            </p>
            <h2
              id="event-heading"
              className="mt-3 font-serif text-3xl font-medium text-ink-900 sm:text-4xl"
            >
              Cartão de embarque
            </h2>
          </div>

          <GlassCard className="overflow-hidden rounded-[1.25rem] border-ink-800/8 bg-gradient-to-br from-white/50 to-cream-100/60 p-1 shadow-[0_28px_64px_-32px_rgba(47,40,32,0.35)]">
            <div className="relative rounded-[1.05rem] border border-dashed border-ink-800/12 bg-white/40 p-8 sm:p-10">
              <div
                className="pointer-events-none absolute inset-y-8 -right-px hidden w-px border-r border-dashed border-ink-800/12 sm:block"
                aria-hidden
              />
              <div className="grid gap-10 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = fieldIcons[field.key] ?? MapPin;
                  return (
                    <div key={field.key} className="flex gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-boarding border border-ink-800/10 bg-white/50 text-gold-500">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-700/50">
                          {field.label}
                        </p>
                        <p className="mt-1 font-serif text-lg text-ink-800 sm:text-xl">
                          {field.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-ink-800/10 pt-8">
                <p className="text-sm leading-relaxed text-ink-700/85">{data.addressLine}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={data.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-ink-800/15",
                      "bg-ink-800 px-5 py-2.5 text-sm font-medium text-cream-50",
                      "transition-transform duration-300 hover:-translate-y-0.5",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                    )}
                  >
                    Google Maps
                    <ExternalLink className="size-4 opacity-80" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
