import { PageHero, Section, Person } from '@/components/shared';

export default function AdministrativeCore() {
  return (
    <>
      <PageHero
        eyebrow="CONNECT ICC Cores"
        title="Administrative Core"
        sub="Facilitating Inter-Consortium Communication and Events"
      />

      <Section kicker="Leadership" title="Our team">
        <div className="people">
          <Person img="/images/team/jake-chen.png" name="Jake Chen, Ph.D." org="University of Alabama at Birmingham">
            Professor, Department of Biomedical Informatics and Data Science.
            Director, Systems Pharmacology AI Research Center (SPARC).
          </Person>
          <Person img="/images/team/swathi-thaker.png" name="Swathi Thaker, Ph.D." org="University of Alabama at Birmingham">
            Program Operations Manager, Systems Pharmacology AI Research Center (SPARC).
          </Person>
          <Person img="/images/team/zhandos-sembay.png" name="Zhandos Sembay" org="University of Alabama at Birmingham">
            Informatics Analyst, Systems Pharmacology AI Research Center (SPARC).
          </Person>
        </div>
      </Section>

      <Section tint kicker="Mission" title="Driving the success of the CFDE">
        <div className="prose">
          <p>
            We are dedicated to driving the success of the Common Fund Data Ecosystem (CFDE)
            through innovative and impactful initiatives. We will focus on efficient operations,
            transparent communication, and continuous improvement in team science practices to
            revolutionize biomedical research.
          </p>
          <p>
            By developing comprehensive operation guidelines and engagement protocols, we will help
            to ensure seamless integration and coordination within the CFDE, fostering effective
            collaboration and maximizing research impact.
          </p>
        </div>
      </Section>

      <Section kicker="Objectives" title="We will work to">
        <ul className="ticks" style={{ maxWidth: '76ch', gap: 14 }}>
          <li>
            Develop comprehensive CONNECT ICC operation guidelines and protocols following team
            science principles and CFDE stakeholder inputs.
          </li>
          <li>
            Foster efficient management of discussions and task development across
            CFDE-participating stakeholders with an agile online team project management system.
          </li>
          <li>
            Develop a communication system to enable effective information exchange and continuous
            reporting updates to CF program project leaders and CFDE stakeholders.
          </li>
          <li>
            Promote continuous improvement of team science practices with coordinated community
            engagement efforts among all CONNECT cores, CF programs, and CFDE stakeholders.
          </li>
        </ul>
      </Section>

      <Section tint tight>
        <figure className="figure">
          <img src="/images/admin-workflow.png" alt="Administrative Core workflow diagram" />
        </figure>
      </Section>
    </>
  );
}
