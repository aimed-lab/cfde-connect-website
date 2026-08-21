import { Mesh, Section, Stats, Session, DayHead } from '@/components/shared';

export default function Spring2025() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero pagehero">
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">CFDE Meetings</p>
          <h1 className="hero__title">CFDE Spring 2025 Meeting</h1>
          <p className="hero__sub">
            Key presentations, discussions, and strategic directions for collaborative biomedical
            research through data integration.
          </p>
          <dl className="hero__facts">
            <div>
              <dt>Dates</dt>
              <dd><time dateTime="2025-03-25">March 25–26, 2025</time></dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>Bethesda Marriott<span>5151 Pooks Hill Road, Bethesda, Maryland 20814</span></dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Meeting concluded<span>Registration and abstract submissions closed</span></dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══════ Dashboard ══════ */}
      <Section kicker="Conference overview" title="Meeting dashboard">
        <Stats items={[
          { value: '100+', label: 'Registered Attendees (Est.)' },
          { value: '20+', label: 'Technical Sessions & Talks' },
          { value: '29', label: 'Poster Presentations' },
          { value: '5', label: 'CFDE Centers Represented' },
          { value: '15+', label: 'DCCs / Affiliated Programs' },
        ]} />
      </Section>

      {/* ══════ Day 1 ══════ */}
      <Section tint kicker="Agenda & summaries" title="Detailed session summaries">
        <DayHead title="Day 1 — Setting the Stage" date="March 25, 2025" />

        <Session time="8:45 – 9:15 AM" where="Grand Ballroom" title="Welcome & NIH Opening Remarks">
          <p>
            <strong>Jake Chen, Ph.D. (ICC)</strong> welcomed attendees with three meeting
            objectives: learning late-breaking research, meeting the CFDE community, and planning
            future collaborative work.
          </p>
          <p>
            <strong>Chris Kinsinger, Ph.D. (NIH)</strong> emphasized CFDE&rsquo;s mission
            priorities: enabling queries across Common Fund datasets, providing training and
            outreach, and integrating infrastructure. Key strategic questions posed: How to better
            engage users? Ensure CFDE data is AI-ready? Why is a world with CFDE better?
          </p>
        </Session>

        <Session time="9:15 – 10:45 AM" where="Grand Ballroom" title="Session I — Center Updates (Moderator: Christy Kano)">
          <ul>
            <li>
              <strong>Data Resource Center (DRC) — A. Ma&rsquo;ayan, S. Subramaniam:</strong>{' '}
              data matrix vision integrating C2M2, gene sets, knowledge graphs, attribute tables,
              and code assets; adoption of the Croissant standard for machine-learning-ready
              datasets (integrated with HuggingFace, Kaggle, TensorFlow, PyTorch); CFDE Workbench
              integrating metadata and processed data from 13 DCCs (cfde.cloud); tools including
              FAIRshake, Playbook Workflow Builder, GeneSetCart, ChEA-KG, and GSFM; an enhanced
              C2M2-driven search engine; and the upcoming Human Organ Project (e.g., Liver use case).
            </li>
            <li>
              <strong>Knowledge Center (KC) — J. Flannick, N. Burtt:</strong> secondary analyses
              across the ecosystem at cfdeknowledge.org; PIGEAN gene set enrichment for human
              genetics; a new mouse-to-human phenotype matching module; ASHG workshop outreach with
              166 registrants and 600 users directed to the KC in one day.
            </li>
            <li>
              <strong>ICC — J. Chen, P. Ping, W. Wang, S. Davis, C. Greene:</strong> Admin,
              Sustainability, and Evaluation core updates — Fall PI Meeting and Spring Conference
              organization, monthly Steering Committee meetings, bi-weekly Communications &amp;
              Outreach Working Group, newsletters, FAIR assets via C2M2, and evaluation metrics
              infrastructure.
            </li>
            <li>
              <strong>Cloud Workspace Implementation Center (CWIC) — J. Fonner:</strong> platform
              connecting CFDE data with thousands of applications (Galaxy, Jupyter, RStudio) backed
              by TACC computing (500,000+ cores, 1,000+ GPUs); early users Spring 2025, initial
              public deployment Fall 2025, regulated data support Fall 2026.
            </li>
            <li>
              <strong>Training Center — J. Burnette, A. Dillman:</strong> landscape analysis of
              omics training needs (1,990 scholars referenced CFDE datasets 2004–2025); How-To
              Seminars; the &ldquo;Decoding the Data Ecosystem&rdquo; podcast; BioIT Hackathon;
              online learning dashboard; a 10-week summer mentoring collaborative; and an August
              virtual CFDE symposium.
            </li>
          </ul>
        </Session>

        <Session time="11:00 AM – 12:30 PM" where="Grand Ballroom" title="Session II — Innovative Tools to Analyze Common Fund Data (Moderator: Deanne Taylor)">
          <p>
            Panel: Avi Ma&rsquo;ayan, Ryan Urbanowicz, Jeremy Yang, Jonathan Silverstein, Deanne Taylor.
          </p>
          <ul>
            <li>
              <strong>Opportunities:</strong> deeper insights into biomedical entities,
              researcher-in-the-loop interactive tools, machine learning for hidden patterns,
              precision medicine analyses, digital twins, and clinical integration for
              translational research.
            </li>
            <li>
              <strong>Challenges:</strong> CF data not always designed for all uses, sparse
              metadata across resources, making CF data fully AI-ready (FAIR + Labeled +
              Learnable), and reducing the user learning curve.
            </li>
            <li>
              <strong>Highlighted tools (A. Ma&rsquo;ayan):</strong> Playbook Workflow Builder
              (&ldquo;Text to Workflow&rdquo;), GeneSetCart (crossing gene sets with GPT-4
              hypothesis generation), ChEA-KG (transcription factor regulatory network), Gene Set
              Foundation Model (GSFM), the Croissant metadata standard, and L2S2 (LINCS L1000
              signature search).
            </li>
          </ul>
        </Session>

        <Session time="1:30 – 2:30 PM" where="Breakout Tracks" title="Session III — Tech Showcase">
          <ul>
            <li>
              <strong>Track 3A (Bethesda Potomac):</strong> Virtual Reality exploration of the
              Human Reference Atlas · GeneSetCart · CFDE Talent Knowledge Graph.
            </li>
            <li>
              <strong>Track 3B (Rockville/Chevy Chase):</strong> Community Visualization Hub
              (beta target June 2025) · Playbook Workflow Builder · Graph Query Interface for C2M2
              Data Discovery.
            </li>
            <li>
              <strong>Track 3C (Salon E):</strong> Digital Scavenger Hunt activities.
            </li>
          </ul>
        </Session>

        <DayHead title="Day 2 — Collaboration & Future Directions" date="March 26, 2025" />

        <Session time="8:30 – 10:00 AM" title="Session V — Working Group Breakouts">
          <ul>
            <li>
              <strong>Ontology WG (M. Maurya, S. Ramachandran):</strong> overview of C2M2 and
              metadata submission processes; pending topics and questions from OWG meetings.
            </li>
            <li>
              <strong>Knowledge Graph WG (D. Taylor, J. Silverstein):</strong> Data Distillery
              updates, community knowledge-graph development, and large language models &amp;
              knowledge graphs working together.
            </li>
            <li>
              <strong>Trainers WG (A. Dillman, J. Burnette):</strong> summer mentorship program
              planning and landscape analysis recommendations.
            </li>
            <li>
              <strong>Communication Outreach WG (N. Burtt, M. Brandes):</strong> charter
              finalization, shared outreach tools (overview slides, shared calendar), and planning
              for Festival of Genomics, ISMB, and ASHG.
            </li>
          </ul>
        </Session>

        <Session time="1:00 – 3:00 PM" where="Grand Ballroom" title="Session VII — Interactive Panels">
          <ul>
            <li>
              <strong>Panel 1 — Bridging Communities (Moderator: Jeffrey Grethe):</strong>{' '}
              integrating CFDE with external data networks — what integration looks like in
              practice, engagement needed for partnerships, and priority use cases.
            </li>
            <li>
              <strong>Panel 2 — Sustaining the CFDE Ecosystem (P. Ping, W. Wang; panel: A.
              Ma&rsquo;ayan, S. Subramaniam, C. Wu):</strong> the STRIDE principles — Safety,
              Transparency, Reliability, Interoperability, Data integrity, Effectiveness;
              structured metadata, controlled vocabularies, reproducibility, HIPAA-compliant
              clinical metadata, FAIRness benchmarking, and data &ldquo;harmonizability&rdquo;.
            </li>
            <li>
              <strong>Panel 3 — Growing the CFDE User Base (B. de Bono, N. Burtt):</strong> COMPA
              partnership findings — low brand recognition and limited onboarding support;
              recommendations including a &ldquo;Brand and Impact Hub&rdquo; microsite,
              &ldquo;Power User&rdquo; fellowships, incentive-based registration, standardized
              KPIs, a centralized feedback widget, and a &ldquo;Community Gatekeeper
              Incubator&rdquo;.
            </li>
          </ul>
        </Session>
      </Section>

      {/* ══════ Posters ══════ */}
      <Section kicker="Poster session" title="29 poster presentations"
        lede="Diverse research leveraging and contributing to the CFDE, with representation from diverse institutions and career stages, fostering broad scientific exchange.">
        <div className="grid-cards">
          <div className="card">
            <h3 className="card__title"><span className="ico">KG</span>Knowledge Management &amp; Integration</h3>
            <ul className="ticks">
              <li>KG2ML for Disease-Associated Genes (P. Kumar et al.)</li>
              <li>CFDE Data Distillery Project (B. Stear et al.)</li>
              <li>BiomarkerKB: Comprehensive Biomarker Knowledgebase (D. Masood)</li>
              <li>Expanding DDKG for Childhood Cancer (B. Stear et al.)</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">⚙</span>Tool Development &amp; Platforms</h3>
            <ul className="ticks">
              <li>KG-UI for Biomedical Knowledge Graphs (J.E. Evangelista et al.)</li>
              <li>CFDE Workbench (J.E. Evangelista et al.)</li>
              <li>L2S2: LINCS L1000 Signature Search Engine (G.B. Marino et al.)</li>
              <li>ChEA-KG: Human TF Regulatory Network KG-UI (A. Byrd et al.)</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🧬</span>Omics &amp; Disease Applications</h3>
            <ul className="ticks">
              <li>Identifying Exercise-Mimetic Drugs (P. Brochet et al.)</li>
              <li>Inferring Tissue Aging Clocks from Blood Transcriptomics (M. Belic)</li>
              <li>Defining Human Metabotype (S. Rahiminejad et al.)</li>
              <li>Immune Landscape of Pediatric/Adult Cancers (T. Liang et al.)</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🎓</span>Training, Standards &amp; Outreach</h3>
            <ul className="ticks">
              <li>Croissant Metadata Standard for Processed Datasets (I. Diamant et al.)</li>
              <li>Advancing Training in CFDE: Landscape Analysis (D. Tarver et al.)</li>
              <li>STRIDE Principles for AI-Ready Datasets (C. Ree et al.)</li>
              <li>CFDE-GlyGen Internship Insights (J. Vora et al.)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ══════ Roadmap ══════ */}
      <Section tint kicker="Roadmap & future" title="Selected key next steps (6–12 months)">
        <div className="grid-cards">
          <div className="card"><h3 className="card__title">Data Centers (DCCs)</h3><p>Submit C2M2 metadata specifications and assets to the Data Resource Center.</p></div>
          <div className="card"><h3 className="card__title">CWIC</h3><p>Work with DCCs to integrate applications and workflows; launch branded website.</p></div>
          <div className="card"><h3 className="card__title">Training Center</h3><p>Launch comprehensive website, organize the August virtual symposium, and request data center training contributions.</p></div>
          <div className="card"><h3 className="card__title">Outreach Working Group</h3><p>Finalize charter, create shared resources (slides, calendar), and prepare conference presence.</p></div>
          <div className="card"><h3 className="card__title">Community Visualization Hub</h3><p>Release beta software (target: June 2025).</p></div>
          <div className="card"><h3 className="card__title">DRC / KC</h3><p>Advance the Human Organ Project and expand gene set utility and applications.</p></div>
          <div className="card"><h3 className="card__title">CFDE Leadership</h3><p>Prepare a compelling message for the 2027 Council of Councils review.</p></div>
          <div className="card"><h3 className="card__title">CFDE Team</h3><p>Develop more accessible, user-friendly tools; continue benchmarking for spatial and single-cell biology.</p></div>
        </div>
      </Section>

      {/* ══════ Feedback ══════ */}
      <Section kicker="Participant feedback" title="Overall meeting impressions">
        <div className="grid-3">
          <div className="quote">
            <p>&ldquo;The presentations on innovative tools were outstanding and directly applicable to my research. Loved the focus on AI-readiness!&rdquo;</p>
            <cite>— Postdoctoral Researcher</cite>
          </div>
          <div className="quote">
            <p>&ldquo;Excellent networking opportunities and a great overview of where the CFDE is headed. The collaborative spirit is strong.&rdquo;</p>
            <cite>— Program Manager</cite>
          </div>
          <div className="quote">
            <p>&ldquo;The breakout sessions were particularly valuable for deep dives into specific topics like knowledge graphs and training initiatives.&rdquo;</p>
            <cite>— Principal Investigator</cite>
          </div>
        </div>
        <ul className="ticks" style={{ marginTop: 28, maxWidth: '72ch' }}>
          <li>High quality of scientific presentations</li>
          <li>Valuable networking and collaboration opportunities</li>
          <li>Clear updates on CFDE progress and future vision</li>
          <li>Focus on practical tools and resources</li>
          <li>Engaging discussions in breakout sessions</li>
          <li>Strong emphasis on FAIR data principles and interoperability</li>
        </ul>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>Moving forward together</h2>
          <p style={{ maxWidth: '72ch', marginInline: 'auto' }}>
            The CFDE Spring 2025 meeting reaffirmed the consortium&rsquo;s commitment to fostering
            a collaborative, innovative, and sustainable data ecosystem — positioned to
            significantly accelerate biomedical research and discovery.
          </p>
          <p className="closing__contact">
            Questions? Contact <a href="mailto:snthaker@uab.edu">Swathi Thaker — snthaker@uab.edu</a>
          </p>
        </div>
      </section>
    </>
  );
}
