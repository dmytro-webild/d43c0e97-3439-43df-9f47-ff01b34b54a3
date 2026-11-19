import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CornerTicks from "@/components/kit/CornerTicks";
import NickhoOdometer from "@/components/kit/NickhoOdometer";
import ParticleBlock from "@/components/kit/ParticleBlock";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Point = { title: string };
type Readout = { label: string; value: number; suffix?: string };

type AboutParticleMastProps = {
  label?: string;
  title?: string;
  items?: Point[];
  scanLabel?: string;
  scanMeta?: string;
  readout?: Readout;
  meterValue?: number;
  meterUnit?: string;
  ariaLabel?: string;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

const defaults: Point[] = [
  { title: "Sensors sample carbon, water and soil every ten seconds" },
  { title: "Field crews verify every station against lab samples" },
  { title: "Models are checked against what the ground actually shows" },
  { title: "Reports follow the standards your auditors already use" },
  { title: "Every number traces back to a station and a timestamp" },
];

const AboutParticleMast = ({
  label = "Our approach",
  title = "Scientific Credibility for Every Acre",
  items = defaults,
  scanLabel = "Station 04",
  scanMeta = "CO2 flux",
  readout = { label: "Accumulated carbon balance", value: 24.6, suffix: " t" },
  meterValue,
  meterUnit,
  ariaLabel,
  className,
}: AboutParticleMastProps) => {
  const metaRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const live = useInView(cardRef);
  const cardIn = useInView(cardRef, { once: true, amount: 0.2 });
  const readoutRef = useRef<HTMLDivElement>(null);
  const readoutIn = useInView(readoutRef, { once: true, amount: 0.5 });
  const words = title.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = metaRef.current;
    if (!el || reduce || !live || meterValue === undefined) return;
    let v = meterValue;
    const id = setInterval(() => {
      v += (Math.random() - 0.5) * 0.02;
      el.textContent = `${v.toFixed(3)} ${meterUnit ?? ""}`.trim();
    }, 900);
    return () => clearInterval(id);
  }, [live, reduce, meterValue, meterUnit]);

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative z-[1] bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <motion.div
          initial={reduce ? "show" : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="flex flex-col items-start gap-5"
        >
          {label && (
            <motion.div
              variants={{ hide: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)" } }}
              transition={{ duration: 0.4, ease: kit.ease }}
              className="rounded-[var(--radius)] bg-accent px-1.5 py-1"
            >
              <p className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none text-accent-foreground">{label}</p>
            </motion.div>
          )}
          <h2 className="max-w-[13em] text-[length:var(--text-h1)] [overflow-wrap:anywhere]">
            <p className="sr-only">{title}</p>
            <div aria-hidden="true">
              {words.map((word, index) => (
                <div key={index} className="-mb-[0.15em] mr-[0.24em] inline-flex overflow-hidden pb-[0.15em] last:mr-0">
                  <motion.div variants={{ hide: { y: "110%" }, show: { y: "0%" } }} transition={{ duration: kit.slow, ease: kit.ease, delay: 0.2 + index * 0.03 }}>
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
          </h2>
        </motion.div>

        <div className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 gap-[var(--gap)] lg:grid-cols-2 lg:items-start">
          <div ref={cardRef} className="relative p-[0.5rem] lg:sticky lg:top-[clamp(5rem,12svh,7rem)]">
            <CornerTicks show={cardIn} />
            <motion.div
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round var(--radius-card))" }}
              animate={cardIn || reduce ? { clipPath: "inset(0% 0% 0% 0% round var(--radius-card))" } : undefined}
              transition={{ duration: kit.slow, ease: kit.ease }}
              className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--deep),black_60%)] text-deep-foreground lg:aspect-auto lg:h-[min(40rem,74svh)]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_55%,color-mix(in_oklab,var(--deep),var(--accent)_8%)_0%,transparent_100%)]" />
              <ParticleBlock role="scan" yaw={-0.3} turn={0.3} fill={0.9} className="absolute inset-0" />
              <div className="pointer-events-none absolute inset-[clamp(1rem,2.4vw,1.75rem)]">
                <div className="absolute left-0 top-0 size-[1rem] border-l border-t border-accent" />
                <div className="absolute right-0 top-0 size-[1rem] border-r border-t border-accent" />
                <div className="absolute bottom-0 left-0 size-[1rem] border-b border-l border-accent" />
                <div className="absolute bottom-0 right-0 size-[1rem] border-b border-r border-accent" />
                <motion.div
                  initial={false}
                  animate={reduce || !live ? undefined : { top: ["8%", "92%", "8%"] }}
                  transition={{ duration: 11, ease: "linear", repeat: Infinity }}
                  className="absolute inset-x-[0.75rem] top-[8%] h-px bg-accent/60"
                />
                <div className="pointer-events-auto absolute left-[1.5rem] top-[0.25rem] flex items-center gap-[0.5rem]">
                  <div className="size-[0.375rem] shrink-0 rounded-full bg-accent" />
                  <p className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none text-accent">{scanLabel}</p>
                </div>
                <div className="pointer-events-auto absolute bottom-[0.25rem] right-[1.5rem] flex items-center gap-[0.75rem] whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none">
                  <p className="text-deep-foreground/60">{scanMeta}</p>
                  {meterValue !== undefined && (
                    <p ref={metaRef} aria-hidden="true" className="tabular-nums text-deep-foreground">{`${meterValue.toFixed(3)} ${meterUnit ?? ""}`.trim()}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-[var(--gap)] lg:pt-[0.5rem]">
            <ol className="flex flex-col gap-[var(--gap)]">
              {items.map((point, index) => (
                <motion.li
                  key={`${index}-${point.title}`}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.05 * (index % 3) }}
                  className="flex items-start gap-[1rem] rounded-[var(--radius-card)] bg-card p-[clamp(1.25rem,2vw,1.75rem)] text-card-foreground"
                >
                  <p aria-hidden="true" className="shrink-0 rounded-[var(--radius)] bg-accent px-[0.5rem] py-[0.3125rem] font-mono text-[length:var(--text-label)] leading-none text-accent-foreground">{pad(index + 1)}</p>
                  <p className="text-balance text-[length:var(--text-body)] leading-[1.25] [overflow-wrap:anywhere]">{point.title}</p>
                </motion.li>
              ))}
            </ol>
            {readout && (
              <div ref={readoutRef} className="relative p-[0.5rem]">
                <CornerTicks show={readoutIn} />
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={readoutIn || reduce ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
                  className="flex items-end justify-between gap-[1.5rem] rounded-[var(--radius-card)] bg-deep p-[clamp(1.25rem,2vw,1.75rem)] text-deep-foreground"
                >
                  <p className="max-w-[12rem] font-mono text-[length:var(--text-label)] uppercase leading-[1.3] text-deep-foreground/70">{readout.label}</p>
                  <NickhoOdometer
                    value={readout.value}
                    suffix={readout.suffix}
                    play={readoutIn}
                    duration={0.9}
                    delay={0.4}
                    className="whitespace-nowrap font-mono text-[length:var(--text-h3)] leading-none tracking-[-0.02em] tabular-nums"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParticleMast;
