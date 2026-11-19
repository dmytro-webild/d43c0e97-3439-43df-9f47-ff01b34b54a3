import HeroParticleIsland from "@/components/sections/hero/HeroParticleIsland";
import AboutParticleMast from "@/components/sections/about/AboutParticleMast";
import ServicesFieldCards from "@/components/sections/features/ServicesFieldCards";
import MetricsParticleField from "@/components/sections/metrics/MetricsParticleField";
import TestimonialCaseSlider from "@/components/sections/testimonial/TestimonialCaseSlider";
import FaqNumberedRows from "@/components/sections/faq/FaqNumberedRows";
import ContactTickForm from "@/components/sections/contact/ContactTickForm";
import LoaderSignalDot from "@/components/loaders/LoaderSignalDot";

export default function HomePage() {
  return (
    <>
      <LoaderSignalDot
        readout="100% Präzision"
        brand="Rödl & Herdegen"
        introDelay={1.4}
      />

      <div id="hero" data-webild-section="HeroParticleIsland" data-webild-section-id="HeroParticleIsland-1" data-section="hero" data-scene>
        <HeroParticleIsland
          title="Wir bauen Ihr Zuhause in Regensburg"
          description="Ihr Bauunternehmen in Regensburg für Wohnbau und Sanierung. Präzise Handwerkskunst seit über 15 Jahren."
          primaryButton={{
            text: "Leistungen ansehen",
            href: "#services"
          }}
          readoutValue={4.3}
          readoutUnit="Sterne"
          readoutCaption="12 Bewertungen auf Google und Infobel"
          scrollHint="Mehr entdecken"
          introDelay={1.4}
        />
      </div>

      <div id="about" data-webild-section="AboutParticleMast" data-webild-section-id="AboutParticleMast-1" data-section="about">
        <AboutParticleMast
          label="Präzision & Qualität"
          title="Nachhaltig gebaut für Generationen in Regensburg"
          items={[
            {
              title: "Erfahrene Handwerker begleiten jedes Bauvorhaben direkt vor Ort"
            },
            {
              title: "Verwendung hochwertiger Baustoffe für dauerhafte Substanz und Wertbeständigkeit"
            },
            {
              title: "Termingerechte Ausführung sämtlicher Rohbau- und Sanierungsarbeiten"
            },
            {
              title: "Konsequente Einhaltung moderner Energiestandards und Bauvorschriften"
            }
          ]}
          scanLabel="Standort"
          scanMeta="Regensburg"
          meterValue={100}
          meterUnit="%"
          readout={{
            label: "Zufriedene Bauherren",
            value: 100,
            suffix: "%"
          }}
        />
      </div>

      <div id="services" data-webild-section="ServicesFieldCards" data-webild-section-id="ServicesFieldCards-1" data-section="services">
        <ServicesFieldCards
          tag="Unsere Leistungen"
          title="Vom ersten Plan bis zum Einzug"
          items={[
            {
              label: "01 Beratung",
              title: "Konzept und fundierte Planung",
              imageSrc: "https://img.b2bpic.net/free-photo/ruler-plans_23-2147785546.jpg",
              imageAlt: "Ruler and plans",
              description: "Wir analysieren Ihre Wünsche am Standort in Regensburg und planen Ihr Bauprojekt zielgerichtet."
            },
            {
              label: "02 Rohbau",
              title: "Solides Mauerwerk und Beton",
              imageSrc: "https://img.b2bpic.net/free-photo/monochrome-scene-depicting-life-workers-construction-industry-site_23-2151431609.jpg",
              imageAlt: "Monochrome scene depicting life of workers on a construction industry site",
              description: "Fachgerechte Rohbauarbeiten durch erfahrenes Personal für maximale Stabilität Ihres Gebäudes."
            },
            {
              label: "03 Ausbau",
              title: "Koordination aller Gewerke",
              imageSrc: "https://img.b2bpic.net/free-photo/tiler-working-renovation-apartment_23-2149278559.jpg",
              imageAlt: "Tiler working on renovation of apartment",
              description: "Sorgfältige Steuerung sämtlicher Handwerker für einen reibungslosen und pünktlichen Bauablauf."
            },
            {
              label: "04 Übergabe",
              title: "Termingerechte Übergabe",
              imageSrc: "https://img.b2bpic.net/free-photo/girlfriend-with-her-boyfriend-showing-house-key-toward-camera_23-2148156378.jpg",
              imageAlt: "Girlfriend with her boyfriend showing house key toward camera",
              description: "Nach gründlicher Abnahme übergeben wir Ihr fertiggestelltes Eigenheim bezugsfertig."
            }
          ]}
        />
      </div>

      <div id="metrics" data-webild-section="MetricsParticleField" data-webild-section-id="MetricsParticleField-1" data-section="metrics">
        <MetricsParticleField
          label="Zahlen & Fakten"
          title="Messbare Qualität in der Region"
          items={[
            {
              value: 15,
              suffix: "+",
              label: "Jahre Bauerfahrung"
            },
            {
              value: 4.3,
              label: "Google-Bewertung"
            },
            {
              value: 100,
              suffix: "%",
              label: "Verlässliche Umsetzung"
            },
            {
              value: 12,
              label: "Verifizierte Bewertungen"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialCaseSlider" data-webild-section-id="TestimonialCaseSlider-1" data-section="testimonial">
        <TestimonialCaseSlider
          tag="Kundenstimmen"
          title="Erfahrungen unserer Bauherren"
          items={[
            {
              quote: "Sympathische Baufirma mit sauberer Ausführung und pünktlicher Übergabe.",
              name: "Johannes Bauer",
              role: "Bauherr, Regensburg",
              label: "Massivhaus",
              imageSrc: "https://img.b2bpic.net/free-photo/medium-shot-man-with-helmet-crossed-arms_23-2148269264.jpg",
              imageAlt: "Medium shot man with helmet and crossed arms"
            },
            {
              quote: "Hervorragende Bauqualität und zuverlässiges Team bei unserem Neubauprojekt.",
              name: "Liviu Leuca",
              role: "Auftraggeber, Regensburg",
              label: "Neubau",
              imageSrc: "https://img.b2bpic.net/free-photo/constructor-construction-repair-plastering-wall_53876-16063.jpg",
              imageAlt: "Constructor construction repair plastering on the wall"
            },
            {
              quote: "Sehr professionelle Abwicklung und pünktliche Übergabe unseres Massivhauses.",
              name: "Julia Richter",
              role: "Bauherrin, Regensburg",
              label: "Wohnbau",
              imageSrc: "https://img.b2bpic.net/free-photo/two-happy-woman-friends-with-sunglasses-vacation-tropical-country_343596-726.jpg",
              imageAlt: "Two happy woman friends with sunglasses on vacation in tropical country"
            },
            {
              quote: "Saubere Baustelle und gewissenhafte Durchführung aller Rohbauarbeiten.",
              name: "Florian Schmidt",
              role: "Bauherr, Regensburg",
              label: "Rohbau",
              imageSrc: "https://img.b2bpic.net/free-photo/cup-drafting-supplies-plans_23-2147831903.jpg?_wi=1",
              imageAlt: "drafting tools on construction plans"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqNumberedRows" data-webild-section-id="FaqNumberedRows-1" data-section="faq">
        <FaqNumberedRows
          tag="Häufige Fragen"
          title="Klarheit vor Baubeginn"
          items={[
            {
              title: "In welchem Umkreis sind Sie tätig?",
              description: "Unser Schwerpunkt liegt in Regensburg und den umliegenden Gemeinden im Landkreis."
            },
            {
              title: "Führen Sie Umbauten und Sanierungen durch?",
              description: "Ja, wir übernehmen neben Neubauten auch fachgerechte Sanierungen und Umbauten an Bestandsbauten."
            },
            {
              title: "Wie fordere ich ein erstes Angebot an?",
              description: "Rufen Sie uns unter 0941 586860 an oder senden Sie eine E-Mail an info@roedl-herdegen.de."
            },
            {
              title: "Wer betreut mein Bauprojekt vor Ort?",
              description: "Unsere erfahrenen Bauleiter begleiten Ihr Projekt persönlich vom ersten Spatenstich bis zur Übergabe."
            },
            {
              title: "Bieten Sie auch komplett bezugsfertiges Bauen an?",
              description: "Ja, wir kooperieren mit verlässlichen Partnern und übergeben Bauwerke auf Wunsch schlüsselfertig."
            },
            {
              title: "Wie verläuft der Erstkontakt bis zum Baubeginn?",
              description: "Nach Ihrer Anfrage klären wir die Details persönlich, besichtigen das Grundstück und erstellen einen klaren Ablaufplan."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactTickForm" data-webild-section-id="ContactTickForm-1" data-section="contact">
        <ContactTickForm
          title="Projekt jetzt anfragen"
          submitText="Nachricht senden"
          successText="Vielen Dank! Wir melden uns innerhalb eines Werktags bei Ihnen."
          readout="49.02 N / 12.10 E"
          labels={{
            name: "Ihr Name",
            email: "E-Mail-Adresse",
            company: "Bauvorhaben",
            message: "Ihre Nachricht"
          }}
        />
      </div>
    </>
  );
}
