import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FaqItem = { title: string; description: string };

type FaqNumberedRowsProps = {
  tag?: string;
  title?: string;
  items?: FaqItem[];
  ariaLabel?: string;
  className?: string;
};

const FaqNumberedRows = ({
  tag = "Questions",
  title = "What Clients Ask Us First",
  items = [
    { title: "How long does it take to set up monitoring?", description: "Most sites are live within three weeks: one week to plan sensor placement, one to install, one to calibrate against field samples." },
    { title: "Do we need to buy any hardware?", description: "No. Sensors, gateways and maintenance are part of the subscription, and we replace any unit that fails." },
    { title: "Which standards do your reports follow?", description: "Reports map to the GHG Protocol and the main voluntary carbon registries, with raw readings attached so auditors can trace every figure." },
    { title: "Can we see the data ourselves?", description: "Yes. Every reading lands in your dashboard within minutes, and you can export it at any time." },
    { title: "What happens if a sensor goes offline?", description: "We get an alert the same hour, flag the gap in your records and send a technician within five working days." },
  ],
  ariaLabel,
  className,
}: FaqNumberedRowsProps) => {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();

  return (
    <section aria-label={ariaLabel ?? title ?? "Questions"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <motion.div
          initial={reduce ? false : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mb-[clamp(1.5rem,3vw,3rem)] flex flex-col items-start gap-5"
        >
          {tag && (
            <motion.p
              variants={{ hide: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)" } }}
              transition={{ duration: 0.4, ease: kit.ease }}
              className="whitespace-nowrap rounded-[var(--radius)] bg-accent px-1.5 py-0.5 font-mono text-[length:var(--text-label)] uppercase leading-[1.3] text-accent-foreground"
            >
              {tag}
            </motion.p>
          )}
          {title && (
            <div className="-mb-[0.15em] overflow-y-clip pb-[0.15em]">
              <motion.h2
                variants={{ hide: { y: "110%" }, show: { y: "0%" } }}
                transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 }}
                className="max-w-[14em] text-balance text-[length:var(--text-h1)] [overflow-wrap:anywhere]"
              >
                {title}
              </motion.h2>
            </div>
          )}
        </motion.div>
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const isOpen = open === index;
            const last = index === items.length - 1;
            return (
              <li key={index} className="relative">
                <motion.div
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: Math.min(index, 6) * 0.06 }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
                />
                {last && (
                  <motion.div
                    aria-hidden="true"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: kit.slow, ease: kit.ease, delay: 0.1 }}
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground"
                  />
                )}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-[clamp(1rem,3vw,2.5rem)] py-[clamp(1rem,1.6vw,1.5rem)] text-left"
                >
                  <p aria-hidden="true" className="grid size-[clamp(2.5rem,3.75vw,3.375rem)] place-items-center rounded-full bg-accent font-mono text-[length:var(--text-label)] tabular-nums text-accent-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-balance font-sans text-[length:var(--text-body)] font-normal leading-[1.3] tracking-[-0.01em] [overflow-wrap:anywhere]">
                    {item.title}
                  </h3>
                  <div aria-hidden="true" className="relative mr-1 size-[clamp(1.125rem,1.6vw,1.5rem)]">
                    <div className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-foreground" />
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: kit.fast, ease: kit.ease }}
                      className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-foreground"
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: "auto" }}
                      exit={reduce ? undefined : { height: 0 }}
                      transition={{ duration: kit.base, ease: kit.ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-[clamp(1.25rem,2vw,1.75rem)] pl-[calc(clamp(2.5rem,3.75vw,3.375rem)+clamp(1rem,3vw,2.5rem))] pr-[clamp(2rem,4vw,4rem)]">
                        <div className="-mb-[0.15em] overflow-y-clip pb-[0.15em]">
                          <motion.p
                            initial={reduce ? false : { y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={reduce ? undefined : { y: "100%" }}
                            transition={{ duration: kit.base, ease: kit.ease, delay: 0.08 }}
                            className="max-w-[42em] text-pretty text-[length:var(--text-body)] leading-[1.4] text-muted-foreground"
                          >
                            {item.description}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqNumberedRows;
