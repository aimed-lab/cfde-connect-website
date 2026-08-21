import { PageHero, Section, Person, ArrowIcon } from '@/components/shared';

export default function EvaluationCore() {
  return (
    <>
      <PageHero
        eyebrow="CONNECT ICC Cores"
        title="Evaluation Core"
        sub="Capturing and demonstrating the impact of the Common Fund Data Ecosystem"
      />

      <Section kicker="Leadership" title="Our team">
        <div className="people">
          <Person img="/images/team/casey-greene.png" name="Casey Greene, PhD" org="University of Colorado Anschutz">
            Professor, Biomedical Informatics.
          </Person>
          <Person img="/images/team/sean-davis.png" name="Sean Davis, MD, PhD" org="University of Colorado Anschutz">
            Professor, Biomedical Informatics.
          </Person>
        </div>
      </Section>

      <Section tint kicker="Mission" title="Showing the impact of the ecosystem">
        <div className="prose">
          <p>
            Our role is to gather information associated with Common Fund projects to share with
            NIH to show the impact of the incredible projects within this ecosystem. We work
            closely with other Centers to make sure that we are capturing accurate information as
            efficiently as possible. Our goal is to help program staff understand how certain
            activities lead to increased impact, not compare projects.
          </p>
          <p>
            Working in conjunction with the consortium, we strive to develop standard metrics
            across Common Fund projects, such as grant details, publications and citations. While
            one set of metrics cannot fully represent all projects, having a common baseline allows
            us to demonstrate overall impact in a cohesive manner.
          </p>
          <p>
            We are continually refining this process to accurately and efficiently capture key
            metrics. Be sure to visit our GitHub page for the latest information and up to date
            processes.
          </p>
        </div>
        <div style={{ marginTop: 26 }}>
          <a className="btn btn--primary" href="https://nih-cfde.github.io/icc-eval-coordination/" target="_blank" rel="noopener noreferrer">
            Visit our GitHub
            <ArrowIcon />
          </a>
        </div>
      </Section>

      <Section kicker="Process" title="Example workflow">
        <figure className="figure">
          <img src="/images/eval-workflow.png" alt="Evaluation Core example workflow diagram" />
        </figure>
      </Section>
    </>
  );
}
