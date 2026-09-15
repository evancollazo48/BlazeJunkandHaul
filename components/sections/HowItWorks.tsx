import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-y border-line bg-panel py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="The Process"
          title="How It Works"
          description="Three easy steps. Zero heavy lifting for you."
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.1} className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none font-bold text-stroke-orange"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-silver-dim">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
