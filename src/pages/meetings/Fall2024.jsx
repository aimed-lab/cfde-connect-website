import { PageHero, Section } from '@/components/shared';

export default function Fall2024() {
  return (
    <>
      <PageHero
        eyebrow="CFDE Meetings"
        title="CFDE 2024 Fall Meeting"
        sub="October 22–23, 2024 · The Bethesdan Hotel — Bethesda, MD"
      >
        <div className="hero__actions">
          <span className="pill" style={{ background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'rgba(255,255,255,.3)', padding: '9px 18px', fontSize: '.78rem' }}>
            Registration has closed
          </span>
        </div>
      </PageHero>

      <Section kicker="About" title="A two-day program meeting in Bethesda">
        <div className="grid-2" style={{ gap: 'clamp(28px,5vw,56px)', alignItems: 'center' }}>
          <div className="prose">
            <p>
              Common Fund Data Ecosystem (CFDE) hosted a two-day, in-person program meeting in
              Bethesda, MD on October 22nd and 23rd. This was an opportunity for DCC PIs, Program
              Managers, and Technical Leads to come together to share updates and accomplishments
              as well as discuss strategic issues for the coming year.
            </p>
            <p>
              Through the leadership of the ICC and in collaboration with the Program Committee,
              attendees heard progress and future plans from both current and new CFDE
              partnerships. There were also breakout sessions for the Working Groups, as well as
              discussions around Upcoming Data and Sustainability.
            </p>
            <p>
              To learn more about the meeting, contact{' '}
              <a href="mailto:snthaker@uab.edu">Swathi Thaker</a>.
            </p>
          </div>
          <figure className="figure">
            <img src="/images/meetings/bethesdan.jpg" alt="The Bethesdan Hotel, Bethesda, MD" />
            <figcaption>The Bethesdan Hotel · Bethesda, MD</figcaption>
          </figure>
        </div>
      </Section>
    </>
  );
}
