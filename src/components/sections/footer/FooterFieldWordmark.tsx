import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import FitWordmark from "@/components/kit/FitWordmark";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { text: string; href?: string };

type FooterColumn = { title?: string; links: FooterLink[] };

type FooterFieldWordmarkProps = {
  brand?: string;
  offices?: string[];
  columns?: FooterColumn[];
  copyright?: string;
  backToTop?: string;
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const FooterFieldWordmark = ({
  brand = "mossline",
  offices = ["Portland, Oregon", "Bend, Oregon"],
  columns = [
    { title: "Company", links: [{ text: "About", href: "#about" }, { text: "Contact", href: "#contact" }] },
    { title: "Solutions", links: [{ text: "Carbon audits", href: "#services" }, { text: "Water quality", href: "#services" }] },
    { title: "Technology", links: [{ text: "Field sensors", href: "#process" }, { text: "Dashboard", href: "#process" }] },
    { title: "Social", links: [{ text: "LinkedIn", href: "#" }, { text: "Instagram", href: "#" }] },
  ],
  copyright = "2025 Mossline. All rights reserved",
  backToTop = "Back to top",
  imageSrc = "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "",
  ariaLabel = "Site footer",
  className,
}: FooterFieldWordmarkProps) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  const [fits, setFits] = useState(true);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const play = useInView(wrapperRef, { once: true, amount: 0 });
  const shown = Boolean(play || reduce);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "end end"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"]);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => {
      setHeight(el.offsetHeight);
      setFits(el.offsetHeight <= window.innerHeight);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      aria-label={ariaLabel}
      data-tone="deep"
      style={{ height: height && fits ? `${height}px` : "auto", clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      className={cn("relative z-0 w-full", className)}
    >
      <div className={fits ? "fixed bottom-0 left-0 w-full" : "w-full"}>
        <footer ref={footerRef} className="relative w-full overflow-hidden bg-deep pb-[clamp(1.25rem,2vw,1.75rem)] pt-[var(--section-space)] text-accent">
          {imageSrc && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <MotionMedia
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                style={{ y: reduce ? 0 : drift }}
                className="absolute inset-x-0 top-0 h-[112%] w-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
            </div>
          )}
          <div className="relative mx-auto flex w-[var(--container)] flex-col">
            <h2 className="sr-only">{brand}</h2>
            <motion.div
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", y: "6%" }}
              animate={shown ? { clipPath: "inset(0% 0% 0% 0%)", y: "0%" } : undefined}
              transition={{ duration: kit.slow, ease: kit.ease }}
            >
              <FitWordmark words={[brand]} heightRatio={0.26} className="text-accent [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] tracking-[-0.06em]" />
            </motion.div>
            <motion.div
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              animate={shown ? { scaleX: 1 } : undefined}
              transition={{ duration: kit.slow, ease: kit.ease, delay: 0.3 }}
              className="mt-[clamp(3rem,8vw,7.5rem)] h-px origin-left bg-accent/70"
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: kit.base, ease: kit.ease, delay: 0.2 }}
              className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-10 pt-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
              <div className="flex min-w-0 flex-col">
                {offices.map((office, index) => (
                  <p key={index} className="text-balance text-[length:var(--text-body-lg)] font-medium leading-[0.95] tracking-[-0.03em] [overflow-wrap:anywhere]">
                    {office}
                  </p>
                ))}
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-x-5 gap-y-8 xl:grid-cols-4">
                {columns.map((column, index) => (
                  <div key={index} className="flex min-w-0 flex-col gap-3">
                    {column.title && <p className="font-mono text-[length:var(--text-label)] font-medium uppercase leading-[1.2] text-accent/50">{column.title}</p>}
                    <ul className="flex flex-col gap-3">
                      {column.links.map((link, i) => (
                        <li key={i}>
                          <a href={link.href ?? "#"} className="font-mono text-[length:var(--text-label)] uppercase leading-[1.2] [overflow-wrap:anywhere] transition-opacity duration-[var(--dur-fast)] hover:opacity-70">
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="mt-[clamp(3rem,6vw,4.5rem)] flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              {copyright && (
                <div className="flex gap-[0.25em] text-[length:var(--text-small)] leading-[1.3] text-white/80">
                  <p aria-hidden="true">©</p>
                  <p>{copyright}</p>
                </div>
              )}
              {backToTop && (
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                  }}
                  className="whitespace-nowrap text-[length:var(--text-small)] leading-[1.3] text-white/80 transition-opacity duration-[var(--dur-fast)] hover:opacity-70"
                >
                  {backToTop} ↑
                </a>
              )}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterFieldWordmark;
