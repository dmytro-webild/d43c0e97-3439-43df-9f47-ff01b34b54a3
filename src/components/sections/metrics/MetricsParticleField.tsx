import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CornerTicks from "@/components/kit/CornerTicks";
import NickhoOdometer from "@/components/kit/NickhoOdometer";
import ParticleBlock from "@/components/kit/ParticleBlock";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Metric = { value: number; prefix?: string; suffix?: string; label: string };

type MetricsParticleFieldProps = {
  label?: string;
  title?: string;
  items?: Metric[];
  ariaLabel?: string;
  className?: string;
};

const defaults: Metric[] = [
  { value: 1.2, suffix: "M", label: "Acres monitored" },
  { value: 340, label: "Field stations" },
  { value: 10, suffix: " s", label: "Sampling interval" },
  { value: 99.4, suffix: "%", label: "Data uptime" },
];

const MetricsParticleField = ({
  label = "Measured, not modelled",
  title = "Real Data From Real Ground",
  items = defaults,
  ariaLabel,
  className,
}: MetricsParticleFieldProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const play = useInView(listRef, { once: true, amount: 0.15 });
  const words = title.split(/\s+/).filter(Boolean);

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

        <div ref={listRef} className="mt-[clamp(1.5rem,3vw,3rem)] grid grid-cols-2 gap-[var(--gap)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="relative col-span-2 p-[0.5rem] lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <CornerTicks show={play} />
            <motion.div
              initial={reduce ? false : { clipPath: "inset(0% 50% 0% 50% round var(--radius-card))" }}
              animate={play || reduce ? { clipPath: "inset(0% 0% 0% 0% round var(--radius-card))" } : undefined}
              transition={{ duration: kit.slow, ease: kit.ease }}
              className="relative aspect-[3/2] h-full overflow-hidden rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--deep),black_60%)] lg:aspect-auto lg:min-h-[26rem]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_60%,color-mix(in_oklab,var(--deep),var(--accent)_8%)_0%,transparent_100%)]" />
              <ParticleBlock role="overview" className="absolute inset-0" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-[clamp(1rem,2.4vw,1.75rem)]">
                <div className="absolute left-0 top-0 size-[1rem] border-l border-t border-accent" />
                <div className="absolute right-0 top-0 size-[1rem] border-r border-t border-accent" />
                <div className="absolute bottom-0 left-0 size-[1rem] border-b border-l border-accent" />
                <div className="absolute bottom-0 right-0 size-[1rem] border-b border-r border-accent" />
              </div>
            </motion.div>
          </div>
          {[0, 1].map((side) => (
            <ul key={side} className={cn("col-span-1 flex min-w-0 flex-col gap-[var(--gap)] lg:row-start-1 lg:justify-between lg:py-[0.5rem]", side === 0 ? "lg:col-start-1" : "lg:col-start-3")}>
              {items.map((item, index) => index % 2 !== side ? null : (
                <motion.li
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={play || reduce ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.15 + index * 0.08 }}
                  className="flex min-w-0 flex-col gap-[0.75rem] rounded-[var(--radius-card)] bg-card p-[clamp(1rem,1.8vw,1.5rem)] text-card-foreground [container-type:inline-size] lg:flex-1 lg:justify-between"
                >
                  <NickhoOdometer
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    play={play}
                    duration={0.9}
                    delay={0.5 + index * 0.12}
                    className="whitespace-nowrap text-[length:min(var(--text-h2),18cqi)] leading-none tracking-[-0.04em] tabular-nums [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]"
                  />
                  <p className="text-balance font-mono text-[length:var(--text-label)] uppercase leading-[1.3] text-muted-foreground [overflow-wrap:anywhere]">{item.label}</p>
                </motion.li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsParticleField;
