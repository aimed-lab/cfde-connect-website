import { PageHero, Section, Person } from '@/components/shared';

const MATCH = [
  {
    step: 'Meet',
    text: 'At the onset of launching the ICC-SC, we will invite CF programs to meet with suitable IC-specific, specialized, and public repositories to identify challenges and opportunities in 3 consecutive matchmaking conferences — encouraging programs to select future partners in stewardship of their digital assets based on their specific needs.',
  },
  {
    step: 'Assess',
    text: 'The ICC-SC will help identify needs of both parties to collaborate on a plan for data governance following the devised SOPs for Digital Asset Transfer and Data Management, clearly defining stewardship responsibilities and management of data access and storage.',
  },
  {
    step: 'Transfer',
    text: 'The process of comprehensive and secure digital asset relocation, with creation of a complete inventory of the transferred assets.',
  },
  {
    step: 'Coordinate',
    text: 'Establish a working group to monitor the transition over a 3–6 month period, ensuring continuity of access and stewardship.',
  },
  {
    step: 'Handover',
    text: 'Complete the transfer of stewardship with negotiated ownership arrangements for the CF program digital assets.',
  },
];

export default function SustainabilityCore() {
  return (
    <>
      <PageHero
        eyebrow="CONNECT ICC Cores"
        title="Sustainability Core"
        sub="Sustaining the digital assets and knowledge of the Common Fund programs"
      />

      <Section kicker="Leadership" title="Our team">
        <div className="people">
          <Person img="/images/team/peipei-ping.png" name="Peipei Ping, PhD" org="University of Arizona">
            Professor of Physiology, Medicine / Cardiology, and Biomedical Informatics.
          </Person>
          <Person img="/images/team/wei-wang.png" name="Wei Wang, PhD" org="University of California, Los Angeles">
            Leonard Kleinrock Chair Professor, Department of Computer Science.
          </Person>
        </div>
      </Section>

      <Section tint kicker="Mission" title="Extending the treasure of the CF programs">
        <div className="prose">
          <p>
            Our goal is to facilitate successful transition of CF program digital assets, including
            their datasets, tools and workflows, as well as e-Learning materials. We are committed
            to sustain the wealth of knowledge contributed by the CF programs via education,
            outreach, and dissemination programs.
          </p>
          <p>
            We aim to serve as ambassadors to advocate and to champion the grand accomplishments of
            the CFDE community. Our efforts will further highlight the success of CF programs,
            amplify their impacts, and extend this invaluable treasure to benefit the wider
            biomedical community, and to inspire new innovations.
          </p>
        </div>
      </Section>

      <Section kicker="Objectives" title="Strategic objectives">
        <ul className="ticks" style={{ maxWidth: '76ch', gap: 14 }}>
          <li>To create a prioritized shortlist of IC-specific, specialized, and public repositories.</li>
          <li>To assemble a catalog of CF programs that are within 3 years of close out.</li>
          <li>To identify appropriate repositories based on CF program needs.</li>
          <li>To develop best practices for managing, storing, and sharing data for CF programs.</li>
          <li>To assist CF DCCs as needed with the transfer of data and resources to long-term repositories.</li>
          <li>To work with the Training Center on transition plans for training materials.</li>
          <li>To facilitate and support the commercialization of CF products.</li>
        </ul>
      </Section>

      <Section
        tint
        kicker="Guiding principles"
        title="The MATCH framework"
        lede="To enable smooth data transitioning efforts and maximize dissemination and community re-use, we define five action items as guiding principles for CF data transfer: Meet, Assess, Transfer, Coordinate, Handover (MATCH)."
      >
        <div className="stack" style={{ maxWidth: 860 }}>
          {MATCH.map((m, i) => (
            <div className="card" key={m.step}>
              <h3 className="card__title"><span className="ico">{i + 1}</span>{m.step}</h3>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Process" title="ICC workflow">
        <figure className="figure">
          <img src="/images/sustain-workflow.png" alt="Sustainability Core ICC workflow diagram" />
        </figure>
      </Section>
    </>
  );
}
