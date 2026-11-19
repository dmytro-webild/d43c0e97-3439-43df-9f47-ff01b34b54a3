import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useImageReady, useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media, { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type CaseItem = {
  quote: string;
  name: string;
  role?: string;
  label?: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
};

type TestimonialCaseSliderProps = {
  tag?: string;
  title?: string;
  items?: CaseItem[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=1200`;

const defaultItems: CaseItem[] = [
  { quote: "Mossline gave our forest carbon numbers we could hand straight to the verifier.", name: "Hannah Okafor", role: "Forest manager, Cascade Timberlands", imageSrc: photo(2108845) },
  { quote: "We cut a month of soil sampling down to one afternoon with the dashboard.", name: "Diego Marin", role: "Operations lead, Willamette Grain", imageSrc: photo(2800832) },
  { quote: "Buyers trust our credits now because every tonne has a live record behind it.", name: "Tom Ashby", role: "Owner, Ashby Lavender Farm", imageSrc: photo(1166209) },
];

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-[1rem]", flip && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

const TestimonialCaseSlider = ({ tag = "Case studies", title = "How land managers turn field data into carbon results they can defend.", items = defaultItems, ariaLabel, className }: TestimonialCaseSliderProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const trackRef = useRef<HTMLDivElement>(null);
  const trackInView = useInView(trackRef, { once: true, margin: "0px 0px -10% 0px" });
  const trackReady = useImageReady(trackRef, trackInView);
  const [state, setState] = useState({ active: 0, prev: 0, wipe: 0 });
  const [edges, setEdges] = useState({ prev: false, next: false });
  const words = title ? title.split(/\s+/) : [];
  const list = items.slice(0, 12);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    const next = api.selectedScrollSnap();
    setState((s) => (s.active === next ? s : { active: next, prev: s.active, wipe: s.wipe + 1 }));
    setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!list.length) return null;

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title ?? tag ?? "Case studies"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-[1.25rem]">
          {tag && (
            <motion.p
              initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: kit.ease }}
              className="w-fit whitespace-nowrap rounded-[calc(var(--radius)*0.5)] bg-accent px-[0.375rem] py-[0.25rem] font-mono text-[length:var(--text-label)] uppercase leading-none text-accent-foreground"
            >
              {tag}
            </motion.p>
          )}
          {title && (
            <h2 className="max-w-[18em] text-balance text-[length:var(--text-h1)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
              <div className="sr-only">{title}</div>
              <div aria-hidden="true" className="contents">
                {words.map((word, i) => (
                  <Fragment key={i}>
                    <div className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                      <motion.div
                        initial={reduce ? false : { y: "110%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: kit.base, ease: kit.ease, delay: 0.3 + i * 0.03 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.div>
                    </div>
                    {i < words.length - 1 && " "}
                  </Fragment>
                ))}
              </div>
            </h2>
          )}
        </div>

        {list.length > 1 && (
          <div className="mt-[clamp(1.5rem,3vw,3rem)] flex justify-end gap-[0.5rem]">
            <button
              type="button"
              aria-label="Previous case"
              disabled={!edges.prev}
              onClick={() => emblaApi?.scrollPrev()}
              className="grid size-[2.5rem] place-items-center rounded-full border border-foreground text-foreground transition-[opacity,background-color,color] duration-300 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow flip />
            </button>
            <button
              type="button"
              aria-label="Next case"
              disabled={!edges.next}
              onClick={() => emblaApi?.scrollNext()}
              className="grid size-[2.5rem] place-items-center rounded-full border border-foreground text-foreground transition-[opacity,background-color,color] duration-300 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow />
            </button>
          </div>
        )}

        <motion.div
          ref={trackRef}
          initial={reduce ? false : "hide"}
          animate={reduce || (trackInView && trackReady) ? "show" : "hide"}
          className={cn("overflow-hidden", list.length > 1 ? "mt-[1.5rem]" : "mt-[clamp(1.5rem,3vw,3rem)]")}
        >
          <div ref={emblaRef} className="cursor-grab active:cursor-grabbing">
            <div className="flex touch-pan-y gap-[1.25rem]">
              {list.map((item, i) => {
                const wiping = !reduce && i === state.active && state.wipe > 0 && state.prev !== i;
                const under = wiping ? list[state.prev] ?? item : item;
                return (
                  <motion.article
                    key={i}
                    variants={{ hide: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: kit.base, ease: kit.ease, delay: Math.min(i, 2) * 0.08 } } }}
                    className="kit-card flex min-w-0 shrink-0 grow-0 basis-[88%] flex-col gap-[1.25rem] p-[1rem] lg:basis-[90%] lg:flex-row lg:p-[1.25rem]"
                  >
                    <motion.div
                      variants={{ hide: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: kit.slow, ease: kit.ease, delay: 0.1 + Math.min(i, 2) * 0.08 } } }}
                      className="relative aspect-[1.05] w-full shrink-0 overflow-hidden rounded-[var(--radius)] lg:aspect-auto lg:min-h-[clamp(26rem,36vw,32rem)] lg:w-[44%]"
                    >
                      <Media src={under.imageSrc} alt={wiping ? "" : item.imageAlt ?? item.name} draggable={false} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                      {wiping && (
                        <MotionMedia
                          key={state.wipe}
                          src={item.imageSrc}
                          alt={item.imageAlt ?? item.name}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
                          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                          transition={{ duration: kit.slow, ease: kit.ease, delay: 0.15 }}
                          className="absolute inset-0 size-full object-cover"
                        />
                      )}
                    </motion.div>
                    <div className="flex min-w-0 flex-1 flex-col gap-[1.5rem] lg:py-[1.25rem]">
                      <div className="flex flex-col gap-[1.25rem]">
                        <p className="w-fit whitespace-nowrap rounded-[calc(var(--radius)*0.5)] bg-accent px-[0.375rem] py-[0.25rem] font-mono text-[length:var(--text-label)] uppercase leading-none text-accent-foreground">
                          {item.label ?? "Success story"}
                        </p>
                        <h3 className="max-w-[18em] text-balance text-[length:var(--text-h3)] leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere]">{item.quote}</h3>
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-[1rem]">
                        <div className="flex min-w-0 flex-col gap-[0.375rem]">
                          <p className="text-[length:var(--text-small)] font-semibold leading-[1.1] tracking-[-0.02em] lg:text-[length:calc(var(--text-small)*1.28)]">{item.name}</p>
                          {item.role && <p className="text-[length:var(--text-small)] leading-[1.3] text-muted-foreground">{item.role}</p>}
                        </div>
                        <a
                          href={item.href ?? "#"}
                          aria-label={`Read the ${item.name} case study`}
                          className="grid size-[2.5rem] shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                        >
                          <Arrow />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCaseSlider;
