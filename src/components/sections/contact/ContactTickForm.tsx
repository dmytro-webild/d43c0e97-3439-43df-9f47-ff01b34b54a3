import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import CornerTicks from "@/components/kit/CornerTicks";
import ParticleBlock from "@/components/kit/ParticleBlock";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ContactTickFormProps = {
  title?: string;
  labels?: { name?: string; email?: string; company?: string; message?: string };
  submitText?: string;
  successText?: string;
  readout?: string;
  ariaLabel?: string;
  className?: string;
};

const ContactTickForm = ({
  title = "Start With One Field",
  labels,
  submitText = "Send message",
  successText = "Thanks, we will reply within one business day.",
  readout = "45.52 N / 122.68 W",
  ariaLabel,
  className,
}: ContactTickFormProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const rowIn = useInView(rowRef, { once: true, amount: 0.2 });
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const fields = [
    { name: "name", label: labels?.name ?? "Name", type: "text", auto: "name" },
    { name: "email", label: labels?.email ?? "Email", type: "email", auto: "email" },
    { name: "company", label: labels?.company ?? "Organisation", type: "text", auto: "organization" },
  ];

  return (
    <section aria-label={ariaLabel ?? title ?? "Contact"} className={cn("relative z-[1] bg-background py-[var(--section-space)] text-foreground", className)}>
      <div ref={rowRef} className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1.15fr_1fr]">
        <div className="relative p-[0.5rem]">
          <CornerTicks show={rowIn} />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={rowIn || reduce ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: kit.base, ease: kit.ease }}
            className="flex h-full flex-col rounded-[var(--radius-card)] bg-card px-[clamp(1.25rem,4vw,3rem)] py-[clamp(1.75rem,4vw,3rem)] text-card-foreground"
          >
            {title && (
              <div className="-mb-[0.15em] overflow-y-clip pb-[0.15em]">
                <motion.h2
                  initial={reduce ? false : { y: "110%" }}
                  animate={rowIn || reduce ? { y: "0%" } : undefined}
                  transition={{ duration: kit.slow, ease: kit.ease, delay: 0.2 }}
                  className="max-w-[12em] text-balance text-[length:var(--text-h1)] [overflow-wrap:anywhere]"
                >
                  {title}
                </motion.h2>
              </div>
            )}
            <form onSubmit={onSubmit} className="mt-[clamp(1.5rem,3vw,2.5rem)] flex w-full flex-col gap-[clamp(1.25rem,2vw,1.75rem)]">
              <div className="grid grid-cols-1 gap-[clamp(1.25rem,2vw,1.75rem)] sm:grid-cols-2">
                {fields.map((field, index) => (
                  <label key={field.name} className={cn("flex min-w-0 flex-col gap-2", index === 2 && "sm:col-span-2")}>
                    <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground">{field.label}</p>
                    <input
                      name={field.name}
                      type={field.type}
                      autoComplete={field.auto}
                      required={field.name !== "company"}
                      className="w-full border-b border-foreground/25 bg-transparent py-2 text-[length:var(--text-body)] leading-[1.4] outline-none transition-colors duration-[var(--dur-fast)] focus:border-foreground"
                    />
                  </label>
                ))}
              </div>
              <label className="flex min-w-0 flex-col gap-2">
                <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] text-muted-foreground">{labels?.message ?? "Message"}</p>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none border-b border-foreground/25 bg-transparent py-2 text-[length:var(--text-body)] leading-[1.4] outline-none transition-colors duration-[var(--dur-fast)] focus:border-foreground"
                />
              </label>
              <div className="flex flex-col items-start gap-3 pt-2">
                <button type="submit" className="btn-primary group">
                  <p className="btn-label">{submitText}</p>
                  <div aria-hidden="true" className="grid size-5 place-items-center rounded-[calc(var(--radius)*0.5)] bg-accent-foreground text-accent transition-colors duration-[var(--dur-fast)] group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:bg-accent group-focus-visible:text-accent-foreground">
                    <ChevronRight className="size-3.5" strokeWidth={2.5} />
                  </div>
                </button>
                {sent && (
                  <motion.p
                    role="status"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: kit.base, ease: kit.ease }}
                    className="text-pretty text-[length:var(--text-body)] leading-[1.4] text-muted-foreground"
                  >
                    {successText}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
        <div className="relative p-[0.5rem] lg:self-center">
          <CornerTicks show={rowIn} delay={0.1} />
          <motion.div
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0 round var(--radius-card))" }}
            animate={rowIn || reduce ? { clipPath: "inset(0 0 0% 0 round var(--radius-card))" } : undefined}
            transition={{ duration: kit.slow, ease: kit.ease, delay: 0.15 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--deep),black_60%)] text-deep-foreground"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_55%,color-mix(in_oklab,var(--deep),var(--accent)_8%)_0%,transparent_100%)]" />
            <ParticleBlock role="visit" turn={0.3} fill={0.9} className="absolute inset-0" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-[clamp(1rem,2.4vw,1.75rem)]">
              <div className="absolute left-0 top-0 size-[1rem] border-l border-t border-accent" />
              <div className="absolute right-0 top-0 size-[1rem] border-r border-t border-accent" />
              <div className="absolute bottom-0 left-0 size-[1rem] border-b border-l border-accent" />
              <div className="absolute bottom-0 right-0 size-[1rem] border-b border-r border-accent" />
            </div>
            {readout && (
              <motion.p
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={rowIn || reduce ? { clipPath: "inset(0 0% 0 0)" } : undefined}
                transition={{ duration: 0.4, ease: kit.ease, delay: 0.5 }}
                className="absolute bottom-[clamp(1.5rem,3vw,2.5rem)] left-[clamp(1.5rem,3vw,2.5rem)] z-[3] whitespace-nowrap rounded-[var(--radius)] bg-accent px-1.5 py-1 font-mono text-[length:var(--text-label)] uppercase tabular-nums leading-none text-accent-foreground"
              >
                {readout}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactTickForm;
