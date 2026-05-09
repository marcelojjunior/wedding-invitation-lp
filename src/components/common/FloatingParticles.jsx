import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PARTICLES = [
  { x: "8%", delay: 0, size: 3, duration: 14 },
  { x: "22%", delay: 2.1, size: 2, duration: 18 },
  { x: "44%", delay: 0.6, size: 2.5, duration: 16 },
  { x: "63%", delay: 3.2, size: 2, duration: 20 },
  { x: "78%", delay: 1.4, size: 3, duration: 15 },
  { x: "91%", delay: 2.8, size: 2, duration: 17 },
];

export function FloatingParticles() {
  const reduced = useReducedMotion();

  if (reduced) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={`${p.x}-${p.delay}-${p.duration}`}
          className="absolute rounded-full bg-gold-400/35 blur-[0.5px]"
          style={{
            left: p.x,
            bottom: "-4%",
            width: p.size * 3,
            height: p.size * 3,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.55, 0.35, 0.5, 0],
            y: [0, -120, -240, -360, -480],
            x: [0, 8, -6, 4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
