import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import FlipCardGrid from "@/components/library/effects/FlipCardGrid";
import { useImageReady, useKitMotion } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ServiceItem = {
  label?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description?: string;
};

type ServicesFieldCardsProps = {
  tag?: string;
  title?: string;
  items?: ServiceItem[];
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const defaultItems: ServiceItem[] = [
  { label: "Forest carbon", title: "Carbon Credits Built on Measured Growth", imageSrc: photo(1072179), imageAlt: "Dark fern fronds in a forest", description: "Sensors log tree growth and soil carbon every day, so each credit traces back to measured tonnes." },
  { label: "Field emissions", title: "Real Emissions Data From Every Field", imageSrc: photo(442589), imageAlt: "Survey drone over a field at dusk", description: "Flux towers and drone passes record what each field gives off, season by season." },
  { label: "Soil health", title: "Soil Carbon Sampled, Logged and Verified", imageSrc: photo(1301856), imageAlt: "Trowel lifting dark soil", description: "Core samples go to the lab and back into one record you can show any auditor." },
  { label: "Air quality", title: "Continuous Air Readings Across Your Land", imageSrc: photo(1287075), imageAlt: "Fog over a pine forest", description: "Stations read air quality every ten seconds and flag changes the same day." },
];

const ServicesFieldCards = ({
  tag = "Our solutions",
  title = "Measuring What the Land Does Naturally",
  items = defaultItems,
  className,
}: ServicesFieldCardsProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridIn = useInView(gridRef, { once: true, margin: "0px 0px -5% 0px" });
  const gridReady = useImageReady(gridRef, gridIn);
  const words = title.split(/\s+/).filter(Boolean);

  return (
    <section aria-label={title || "Services"} className={cn("relative z-[1] bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <motion.div
          initial={reduce ? "show" : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="flex flex-col items-start gap-5"
        >
          {tag && (
            <motion.div
              variants={{ hide: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)" } }}
              transition={{ duration: 0.4, ease: kit.ease }}
              className="rounded-[var(--radius)] bg-accent px-1.5 py-1"
            >
              <p className="whitespace-nowrap font-mono text-[length:var(--text-label)] uppercase leading-none text-accent-foreground">{tag}</p>
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

        <motion.div
          ref={gridRef}
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={gridIn && gridReady ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: kit.base, ease: kit.ease }}
          className="mt-[clamp(1.5rem,3vw,3rem)]"
        >
          <FlipCardGrid
            items={items.map((item) => ({ src: item.imageSrc, alt: item.imageAlt ?? item.title, title: item.title, text: item.description }))}
            className="grid-cols-1 gap-[var(--gap)] md:grid-cols-1 md:gap-[var(--gap)] lg:grid-cols-2 lg:gap-[var(--gap)]"
            hoverFlip={false}
            itemClassName="aspect-[4/5] cursor-pointer rounded-[var(--radius-image)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:aspect-square"
            cardClassName="rounded-[var(--radius-image)]"
            backClassName="justify-between bg-[color-mix(in_oklab,var(--deep),black_60%)] px-[clamp(1rem,2vw,1.75rem)] py-[clamp(1rem,2.8vw,2.5rem)] text-deep-foreground md:px-[clamp(1rem,2vw,1.75rem)] md:py-[clamp(1rem,2.8vw,2.5rem)]"
            renderFront={(card, index) => (
              <div className="flex size-full flex-col justify-between px-[clamp(1rem,2vw,1.75rem)] py-[clamp(1rem,2.8vw,2.5rem)] text-white">
                {card.src && <Media src={card.src} alt={card.alt ?? ""} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full object-cover" />}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-[0.25em] font-mono text-[length:var(--text-label)] uppercase leading-[1.2] [overflow-wrap:anywhere]">
                    <p aria-hidden="true">{String(index + 1).padStart(2, "0")}{items[index]?.label ? " /" : ""}</p>
                    {items[index]?.label && <p className="min-w-0">{items[index]?.label}</p>}
                  </div>
                  <div aria-hidden="true" className="ml-auto grid size-[2.3rem] shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,white_18%,transparent)] text-white backdrop-blur-sm transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] group-focus-visible:bg-accent group-focus-visible:text-accent-foreground lg:group-hover:bg-accent lg:group-hover:text-accent-foreground">
                    <svg viewBox="0 0 16 16" className="size-[1rem]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                      <path d="M8 2.5v11M2.5 8h11" />
                    </svg>
                  </div>
                </div>
                <h3 className="relative max-w-[16em] text-balance text-[length:var(--text-h3)] leading-[1] tracking-[-0.04em] [overflow-wrap:anywhere]">{card.title}</h3>
              </div>
            )}
            renderBack={(card, index) => (
              <>
                <div className="flex items-start justify-between gap-4">
                  <p aria-hidden="true" className="rounded-[var(--radius)] bg-accent px-1.5 py-1 font-mono text-[length:var(--text-label)] uppercase leading-none text-accent-foreground">{String(index + 1).padStart(2, "0")}</p>
                  <div aria-hidden="true" className="grid size-[2.3rem] shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <svg viewBox="0 0 16 16" className="size-[1rem] rotate-45" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                      <path d="M8 2.5v11M2.5 8h11" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <h3 className="max-w-[16em] text-balance text-[length:var(--text-h3)] leading-[1] tracking-[-0.04em] [overflow-wrap:anywhere]">{card.title}</h3>
                  {card.text && <p className="max-w-[30em] text-pretty text-[length:var(--text-body)] leading-[1.45] text-deep-foreground/75">{card.text}</p>}
                </div>
              </>
            )}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesFieldCards;
