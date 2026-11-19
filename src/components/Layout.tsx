import { Outlet } from "react-router-dom";
import NavbarHudBar from "@/components/navbars/NavbarHudBar";
import FooterFieldWordmark from "@/components/sections/footer/FooterFieldWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-particles="architecture" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarHudBar
          brand="Rödl & Herdegen"
          navItems={[
            {
              name: "Leistungen",
              href: "#services"
            },
            {
              name: "Über uns",
              href: "#about"
            },
            {
              name: "Qualität",
              href: "#metrics"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          primaryButton={{
            text: "Projekt anfragen",
            href: "#contact"
          }}
        />
      </header>
      <main className="flex-grow" data-particles="architecture" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterFieldWordmark
          brand="Rödl & Herdegen Bauunternehmen GmbH"
          offices={[
            "Wöhrdstraße 42, 93059 Regensburg",
            "Regensburg & Region"
          ]}
          columns={[
            {
              title: "Navigation",
              links: [
                {
                  text: "Über uns",
                  href: "#about"
                },
                {
                  text: "Leistungen",
                  href: "#services"
                },
                {
                  text: "Referenzen",
                  href: "#testimonial"
                }
              ]
            },
            {
              title: "Übersicht",
              links: [
                {
                  text: "Qualität",
                  href: "#metrics"
                },
                {
                  text: "Häufige Fragen",
                  href: "#faq"
                },
                {
                  text: "Anfragen",
                  href: "#contact"
                }
              ]
            },
            {
              title: "Kontakt",
              links: [
                {
                  text: "0941 586860",
                  href: "tel:0941586860"
                },
                {
                  text: "info@roedl-herdegen.de",
                  href: "mailto:info@roedl-herdegen.de"
                }
              ]
            },
            {
              title: "Rechtliches",
              links: [
                {
                  text: "Impressum",
                  href: "#"
                },
                {
                  text: "Datenschutz",
                  href: "#"
                }
              ]
            }
          ]}
          copyright="© 2026 Rödl & Herdegen Bauunternehmen GmbH. Alle Rechte vorbehalten."
          backToTop="Nach oben"
          imageSrc="https://img.b2bpic.net/free-photo/cup-drafting-supplies-plans_23-2147831903.jpg"
          imageAlt="Bauzeichnungen und Messwerkzeuge auf einem Bauplan"
          ariaLabel="Fußzeile"
        />
      </footer>
    </div>
  );
}
