import { Mesh, Section, Stats, Session, DayHead } from '@/components/shared';

export default function Fall2025Recap() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero pagehero">
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">CFDE Meetings</p>
          <h1 className="hero__title">CFDE Fall 2025 Meeting Recap</h1>
          <p className="hero__sub">
            Progress in biomarker integration, AI readiness (MCP servers), and the future of the
            data ecosystem.
          </p>
          <dl className="hero__facts">
            <div>
              <dt>Dates</dt>
              <dd><time dateTime="2025-10-27">October 27–28, 2025</time></dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Partnerships, AI &amp; Data Integration<span>Working groups &amp; strategic planning</span></dd>
            </div>
            <div>
              <dt>Satisfaction</dt>
              <dd>4.8 / 5<span>Participant satisfaction score</span></dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══════ Dashboard ══════ */}
      <Section kicker="Conference overview" title="Meeting dashboard">
        <Stats items={[
          { value: '75+', label: 'Registered Attendees' },
          { value: '15+', label: 'Sessions & Breakouts' },
          { value: '4.8/5', label: 'Participant Satisfaction' },
          { value: '5', label: 'Centers Represented' },
          { value: '18+', label: 'DCCs / Programs' },
        ]} />
        <figure className="figure" style={{ marginTop: 34 }}>
          <img src="/images/meetings/fall2025-group-photo.jpg" alt="CFDE Fall 2025 meeting attendees group photo" />
          <figcaption>CFDE Fall 2025 attendees</figcaption>
        </figure>
      </Section>

      {/* ══════ Agenda ══════ */}
      <Section tint kicker="Agenda" title="Session summaries">
        <DayHead title="Day 1 — Partnerships, AI & Data Integration" date="October 27, 2025" />

        <Session time="9:00 AM" title="Welcome — Jake Chen">
          <p>
            Platform development progress, community outreach, and a strategic emphasis on AI and
            partnerships.
          </p>
        </Session>

        <Session time="9:10 AM" title="Update on FY 24–25 CFDE Partnerships — Raja & Partnership Leads">
          <ul>
            <li><strong>Biomarker Project:</strong> data modeling, clinical/molecular data harmonization, AI query assistants.</li>
            <li><strong>Biomedical Data Collaboration:</strong> UniProt, IMPC, and CM4AI updates.</li>
            <li><strong>Data Distillery:</strong> knowledge graph expansion for childhood cancer and structural birth defects.</li>
          </ul>
        </Session>

        <Session time="11:00 AM" title="Center Updates">
          <ul>
            <li><strong>DRC:</strong> Python toolkit for metadata, cross-dataset enrichment analysis, Workbench updates.</li>
            <li><strong>KC:</strong> &ldquo;CFDE Reveal&rdquo; hypothesis generation feature.</li>
            <li><strong>Training Center:</strong> mentoring program launch, FY26 visualization competition planning.</li>
            <li><strong>CWIC:</strong> public deployment progress, Galaxy workflow support.</li>
          </ul>
        </Session>

        <Session time="1:30 PM" title="Data Ingestion and Analysis — Tim Clark, Ido Diamant">
          <ul>
            <li><strong>Clinical data standardization</strong> challenges: Bridge2AI and AI-ready datasets (CHoRUS, AI-READI).</li>
            <li><strong>Croissant metadata:</strong> 4-layer metadata format implementation for ML readiness.</li>
            <li><strong>MCP–LLM integration:</strong> Model Context Protocol servers for DCC chatbot queries.</li>
          </ul>
        </Session>

        <Session time="3:30 PM" title="Breakout Sessions">
          <ul>
            <li><strong>UniProt User Engagement</strong> (Philadelphia Room)</li>
            <li><strong>Biomarker Partnership</strong> (Chicago Room): use case collection.</li>
            <li><strong>MCP Discussion</strong> (Ballroom): MCP server API integration.</li>
          </ul>
        </Session>

        <DayHead title="Day 2 — Working Groups & Strategic Planning" date="October 28, 2025" />

        <Session time="8:45 AM" title="Recap and Logistics">
          <p>Summary of Day 1 and logistical updates.</p>
        </Session>

        <Session time="9:00 AM" title="Working Group Breakouts">
          <ul>
            <li>Ontology (Atlanta Room)</li>
            <li>Knowledge Graph (Philadelphia Room)</li>
            <li>Training (Chicago Room)</li>
            <li>Communications and Outreach (Grand Ballroom)</li>
          </ul>
        </Session>

        <Session time="10:45 AM" title="Product and Tool Highlights">
          <p>Demonstrations of the Cloud Workspace with MoTrPAC data and new metadata tools.</p>
        </Session>

        <Session time="1:00 PM" title="Breakout Sessions">
          <ul>
            <li>Sustainability (Atlanta Room)</li>
            <li>Galaxy Demo (Philadelphia Room)</li>
            <li>CFDE Incubator (Chicago Room)</li>
          </ul>
        </Session>

        <Session time="2:00 PM" title="Evaluation">
          <p>Discussion on evaluation metrics and CFDE impact measurement.</p>
        </Session>
      </Section>

      {/* ══════ Roadmap ══════ */}
      <Section kicker="Roadmap & future" title="The next 6–12 months">
        <div className="grid-cards">
          <div className="card">
            <span className="pill pill--teal">Planned</span>
            <h3 className="card__title" style={{ marginTop: 12 }}>Omics Open House</h3>
            <p>Winter 2025 launch with GTEx and HuBMAP experts.</p>
          </div>
          <div className="card">
            <span className="pill pill--teal">Planned</span>
            <h3 className="card__title" style={{ marginTop: 12 }}>Mentoring Program</h3>
            <p>December 2025 applications; recruiting DCC volunteer mentors.</p>
          </div>
          <div className="card">
            <span className="pill pill--green">In progress</span>
            <h3 className="card__title" style={{ marginTop: 12 }}>MCP Server Integration</h3>
            <p>DCCs building Model Context Protocol servers for AI chatbot integration.</p>
          </div>
          <div className="card">
            <span className="pill pill--green">In progress</span>
            <h3 className="card__title" style={{ marginTop: 12 }}>CFDE Marker Paper</h3>
            <p>Finalizing authorship and content; targeting 2027 Council of Councils impact.</p>
          </div>
          <div className="card">
            <span className="pill pill--teal">Planned</span>
            <h3 className="card__title" style={{ marginTop: 12 }}>UniProt Cell Maps</h3>
            <p>Early 2026 integration with direct Cytoscape links.</p>
          </div>
          <div className="card">
            <h3 className="card__title">Get involved</h3>
            <p>The roadmap is driven by community feedback. Join a working group to shape these outcomes.</p>
          </div>
        </div>
      </Section>

      {/* ══════ Feedback ══════ */}
      <Section tint kicker="Participant feedback" title="What attendees said">
        <div className="grid-3">
          <div className="quote">
            <p>&ldquo;This was the best venue by far for the meeting.&rdquo;</p>
          </div>
          <div className="quote">
            <p>&ldquo;The working group meetings and also the overview and experience with new tools (e.g. MCP) were most valuable.&rdquo;</p>
          </div>
          <div className="quote">
            <p>&ldquo;Excellent job! A breakout session on developing new use cases with tools/resources would be great.&rdquo;</p>
          </div>
        </div>
        <ul className="ticks" style={{ marginTop: 28, maxWidth: '72ch' }}>
          <li>Venue and food rated exceptionally</li>
          <li>Strong appreciation for MCP and tool demonstration sessions</li>
          <li>Request for mid-week scheduling to ease travel</li>
          <li>High attendee awareness of CFDE resources</li>
        </ul>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>Moving forward together</h2>
          <p style={{ maxWidth: '72ch', marginInline: 'auto' }}>
            The CFDE Fall 2025 meeting reaffirmed our commitment to a sustainable data ecosystem.
            By addressing key challenges in AI readiness and leveraging strategic partnerships, we
            are poised to accelerate biomedical discovery.
          </p>
          <p className="closing__contact">
            Questions? Contact <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
