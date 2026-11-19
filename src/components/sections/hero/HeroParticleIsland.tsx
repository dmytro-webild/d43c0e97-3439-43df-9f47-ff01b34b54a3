import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import CornerTicks from "@/components/kit/CornerTicks";
import ParticleBlock from "@/components/kit/ParticleBlock";
import { useKitMotion } from "@/components/kit/kitMotion";

type Button = { text: string; href: string };

type HeroParticleIslandProps = {
  title?: string;
  description?: string;
  primaryButton?: Button;
  readoutValue?: number;
  readoutUnit?: string;
  readoutCaption?: string;
  scrollHint?: string;
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const HeroParticleIsland = ({
  title = "Where Field Science and Land Strategy Meet",
  description = "Know your land precisely. Field sensors, soil science and clear carbon reporting you can take to any auditor.",
  primaryButton = { text: "Let's talk", href: "#contact" },
  readoutValue = -8.3,
  readoutUnit = "tCO2e",
  readoutCaption = "Verified removal 1.2 tCO2e, soil flux 0.57 ppm",
  scrollHint = "Scroll to discover",
  introDelay = 1.4,
  ariaLabel,
  className,
}: HeroParticleIslandProps) => {
  const reduce = Boolean(useReducedMotion());
  const { ease } = useKitMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const words = title.split(/\s+/).filter(Boolean);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, (p) => `${-115 * Math.min(1, Math.max(0, p / 0.45))}%`);
  const fade = useTransform(scrollYProgress, (p) => 1 - Math.min(1, Math.max(0, p / 0.35)));
  const value = useMotionValue(reduce ? readoutValue : 0);
  const shown = useTransform(value, (v) => v.toFixed(1));

  useEffect(() => {
    if (reduce) {
      value.set(readoutValue);
      return;
    }
    const controls = animate(value, readoutValue, { duration: 0.9, delay: introDelay + 0.75, ease });
    return () => controls.stop();
  }, [reduce, readoutValue, introDelay, ease, value]);

  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section ref={sectionRef} data-particle="hero" aria-label={ariaLabel ?? title} className={`relative z-[1] lg:h-svh lg:min-h-[40rem] bg-[color-mix(in_oklab,var(--deep),black_72%)] text-deep-foreground ${className ?? ""}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(90% 55% at 62% 58%, color-mix(in oklab, var(--deep), var(--accent) 10%) 0%, color-mix(in oklab, var(--deep), black 15%) 32%, color-mix(in oklab, var(--deep), black 55%) 62%, color-mix(in oklab, var(--deep), black 72%) 100%)" }}
      />
      <ParticleBlock role="hero" delay={introDelay} fitTo="[data-particle-anchor]" className="absolute inset-0" />
      <div className="relative mx-auto flex h-full w-[var(--container)] flex-col pt-[clamp(5.5rem,13svh,7.5rem)] pb-[clamp(1.5rem,4svh,2.5rem)] lg:pt-[clamp(6rem,14svh,8.5rem)]">
        <div data-particle-text className="relative z-[1] flex flex-col items-start">
          <h1 aria-label={title} className="max-w-[10.5em] text-[length:var(--text-display)] leading-[0.98] text-balance">
            {words.map((word, i) => (
              <div key={i} aria-hidden="true" className={`inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-top ${i < words.length - 1 ? "mr-[0.24em]" : ""}`}>
                <motion.div style={{ y: lift }} className="will-change-transform">
                  <motion.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease, delay: introDelay + i * 0.05 }}
                  >
                    {word}
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </h1>
          {primaryButton && (
            <motion.div style={{ opacity: fade }} className="mt-[clamp(1.25rem,2.4vw,2rem)]">
              <motion.a
                {...rise(introDelay + 0.3)}
                href={primaryButton.href}
                className="btn-secondary gap-[0.75rem] pr-[0.625rem] [--foreground:var(--deep-foreground)] [--primary:var(--deep-foreground)] [--primary-foreground:var(--deep)]"
              >
                <p className="btn-label">{primaryButton.text}</p>
                <div aria-hidden="true" className="grid size-[1.25rem] place-items-center rounded-[calc(var(--radius)*0.5)] bg-accent text-accent-foreground">
                  <svg viewBox="0 0 12 12" className="size-[0.625rem]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 2.5 8 6l-3.5 3.5" />
                  </svg>
                </div>
              </motion.a>
            </motion.div>
          )}
        </div>

        <div
          data-particle-anchor
          className="relative my-[clamp(1rem,3svh,2rem)] aspect-[3/2] w-full lg:absolute lg:inset-x-[6%] lg:top-[16%] lg:bottom-[22%] lg:my-0 lg:aspect-auto lg:w-auto"
        >
          <motion.div style={{ opacity: fade }} className="absolute left-[34%] top-[30%] w-[28%] [--foreground:var(--deep-foreground)] lg:left-[40%] lg:top-[32%] lg:w-[17%]">
            <div data-hero-callout className="relative aspect-[4/3] w-full">
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: introDelay + 0.6 }}
                className="absolute inset-0 border border-[color-mix(in_srgb,var(--deep-foreground)_22%,transparent)]"
              />
              <CornerTicks show delay={reduce ? 0 : introDelay + 0.5} />
            </div>
            <motion.div {...rise(introDelay + 0.7)} className="absolute left-[calc(100%+0.75rem)] top-[55%] flex w-max max-w-[13rem] flex-col items-start gap-[0.5rem]">
              <div className="flex items-baseline gap-[0.3em] rounded-[calc(var(--radius)*0.5)] bg-deep-foreground px-[0.4rem] py-[0.2rem] font-mono text-[length:0.6875rem] uppercase leading-none tabular-nums text-deep">
                <motion.p>{shown}</motion.p>
                <p>{readoutUnit}</p>
              </div>
              {readoutCaption && (
                <p className="hidden max-w-[12rem] rounded-[var(--radius)] bg-[color-mix(in_srgb,var(--deep)_78%,transparent)] px-[0.4rem] py-[0.3rem] font-mono text-[length:0.625rem] uppercase leading-[1.3] text-[color-mix(in_srgb,var(--deep-foreground)_88%,transparent)] backdrop-blur-sm lg:block">{readoutCaption}</p>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-[1] mt-auto flex items-end justify-between gap-[var(--gap)]">
          {description && (
            <motion.div style={{ opacity: fade }}>
              <motion.p {...rise(introDelay + 0.4)} className="max-w-[28rem] text-pretty text-[length:var(--text-body)] leading-[1.2] text-[color-mix(in_srgb,var(--deep-foreground)_88%,transparent)] lg:max-w-[34rem]">
                {description}
              </motion.p>
            </motion.div>
          )}
          {scrollHint && (
            <motion.div style={{ opacity: fade }} className="hidden shrink-0 lg:block">
              <motion.p {...rise(introDelay + 0.6)} className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none text-[color-mix(in_srgb,var(--deep-foreground)_80%,transparent)]">
                {scrollHint}
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroParticleIsland;
