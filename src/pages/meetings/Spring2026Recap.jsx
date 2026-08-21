import { Mesh, Section, Stats, Session, DayHead } from '@/components/shared';

export default function Spring2026Recap() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero pagehero">
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">CFDE Meetings</p>
          <h1 className="hero__title">CFDE Spring 2026 Meeting Recap</h1>
          <p className="hero__sub">
            Principal investigators, trainees, and junior scholars from across the Common Fund Data
            Ecosystem gathered to advance biomedical data integration.
          </p>
          <dl className="hero__facts">
            <div>
              <dt>Dates</dt>
              <dd><time dateTime="2026-03-24">March 24–25, 2026</time></dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>
                <a href="https://www.marriott.com/en-us/hotels/wasbn-bethesda-north-marriott-hotel-and-conference-center/overview/" target="_blank" rel="noopener noreferrer">
                  Bethesda North Marriott Hotel &amp; Conference Center
                </a>
                <span>5701 Marinelli Road, Rockville, Maryland 20852</span>
              </dd>
            </div>
            <div>
              <dt>Opening remarks</dt>
              <dd>Dr. Vivian Ota Wang<span>Acting Director, NIH Office of Strategic Coordination</span></dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══════ Dashboard ══════ */}
      <Section kicker="Conference overview" title="Meeting dashboard">
        <Stats items={[
          { value: '100+', label: 'Registered Attendees' },
          { value: '7', label: 'Major Sessions' },
          { value: '30+', label: 'Poster Presentations' },
          { value: '4', label: 'Tech Showcase Demos' },
          { value: '2', label: 'New Programs Introduced' },
        ]} />
      </Section>

      {/* ══════ Day 1 ══════ */}
      <Section tint kicker="Agenda & summaries" title="Session summaries">
        <DayHead title="Day 1" date="March 24, 2026" />

        <Session time="9:00 – 9:30 AM" where="Brookside C" title="Welcome & NIH Opening Remarks">
          <p>
            <strong>Jake Chen (ICC)</strong> welcomed attendees, outlined the agenda, and
            encouraged signing the CFDE marker paper (95 contributors already).{' '}
            <strong>Dr. Vivian Ota Wang (NIH)</strong> underscored CFDE&rsquo;s mission to
            accelerate biomedical discovery through data integration and interoperability.
          </p>
        </Session>

        <Session time="9:30 – 10:45 AM" where="Brookside C" title="Session 1 — R25 Updates">
          <p>
            R25 programs develop short courses promoting Common Fund data use with globally
            available training materials.
          </p>
          <ul>
            <li><strong>Jackson Labs — Gary Churchill:</strong> week-long multi-omic data analysis course in Bar Harbor, Maine for 30–35 students using project-based learning.</li>
            <li><strong>Emory University — Judy Gajjoya:</strong> Simdar Hive Program trains researchers from resource-limited African institutions using medical imaging datasets via summer schools and datathons.</li>
            <li><strong>OHSU — Lisa Karstens:</strong> Human Microbiome Data Discovery course targeting early-career researchers, focused on iHMP and Metabolomics Workbench datasets.</li>
          </ul>
        </Session>

        <Session time="11:00 AM – 12:00 PM" where="Brookside C" title="Session 2 — Center Updates">
          <ul>
            <li>
              <strong>Data Resource Center (DRC) — Lily Taub:</strong> enhanced search via
              Elasticsearch, new C2M2 graph search interface in CFDE Workbench, Liver Portal
              progress, gene set crossing use cases, and connectivity mapping integration for drug
              discovery.
            </li>
            <li>
              <strong>Knowledge Center — Noel Burtt:</strong> the Reveal reasoning engine for
              validated evidence, improved UI with gene clustering, benchmarking that confirms and
              extends published findings, and a Summer 2026 incubator event.
            </li>
            <li>
              <strong>ICC — Jake Chen:</strong> AI automation for event entry via Google Forms and
              Slack, launch of the CFDE Talent Knowledge Graph (semantic embedding connecting
              researchers), and coordination of newsletters, working groups, and the steering
              committee.
            </li>
            <li>
              <strong>Training Center — LaFrancis Gibson:</strong> new CFDE 101 module, DataViz
              Competition (2–5 minute videos), DECO Institute 8-week mentor program (summer 2026),
              ready-to-use graphics and communication templates, and the Community Source Modules
              RFP.
            </li>
          </ul>
          <div className="card" style={{ marginTop: 16, background: 'linear-gradient(160deg,#fff 0%,#f0fafb 100%)' }}>
            <h3 className="card__title">🚀 Cloud Workspace Interoperability Center (CWIC) public launch</h3>
            <ul className="ticks">
              <li><strong>cfdeworkspace.org</strong> — public platform officially launched for academic researchers worldwide</li>
              <li><strong>Thousands of tools</strong> — Galaxy environment providing computational tools and data processing</li>
              <li><strong>Authorized datasets</strong> — access to authorized CFDE datasets with secure computing resources</li>
            </ul>
          </div>
        </Session>

        <Session time="1:00 – 2:00 PM" where="Brookside C" title="Session 3 — Tech Showcase">
          <ul>
            <li>
              <strong>3D Human Reference Body VR — Andreas Bueckle:</strong> FAIR access to
              biomolecular datasets from HuBMAP, SenNet, and GTEx via virtual reality; the HRA
              Organ Gallery app for interacting with 3D reference organs, tissue registrations, and
              cell type populations.
            </li>
            <li>
              <strong>BiomarkerKB — Jeet Vora:</strong> unified biomarker information system
              integrating diverse resources (biomarkerkb.org).
            </li>
            <li>
              <strong>ChEA-KG Atlases — Anna Byrd:</strong> transcription factor modules from CFDE
              datasets — a network of 1,559 human transcription factors with Cell Type, Cancer,
              MOA, and Aging atlases, plus a time series tool for regulatory subnetworks.
            </li>
            <li>
              <strong>GSFM — Daniel Clarke:</strong> Gene Set Foundation Model — a denoising
              autoencoder pre-trained on millions of gene sets, outperforming the state of the art
              in gene function prediction.
            </li>
          </ul>
        </Session>

        <Session time="2:00 – 2:45 PM" where="Brookside C" title="New & Continuing Common Fund Programs">
          <ul>
            <li>
              <strong>COMPLEMENT-ARIE (new) — Chris Duncan:</strong> develops and validates
              human-based New Approach Methodologies (NAMs) complementing animal models —
              Technology Development Centers, a centralized data hub, and a Validation &amp;
              Qualification Network. Five TDC awards focus on fibrosis, female reproductive
              tissues, chemical safety, neuroscience, and GI disease.
            </li>
            <li>
              <strong>Bridge2AI Phase II (new) — Laurel Kuxhaus:</strong> Innovation Funnels
              (AI-enabled solutions for priority challenges) and an AI Health Science Network of
              3–5 centers on cross-cutting AI methodology, plus a VQN public–private partnership
              with 4 pilot projects.
            </li>
          </ul>
        </Session>

        <Session time="2:45 – 3:30 PM" title="Session 4 — Junior Scholar Lightning Talks">
          <p>
            Rapid-fire presentations covering multi-omic analysis, AI frameworks, protein
            structure, and data tools — fostering cross-program early-career connections.
          </p>
        </Session>

        <Session time="3:30 – 5:30 PM" title="Poster Presentation & Judging">
          <p>
            Topics included drug repurposing, data visualization, omics integration, training,
            knowledge graphs, and biomarkers.
          </p>
        </Session>

        <DayHead title="Day 2" date="March 25, 2026" />

        <Session time="8:30 – 10:00 AM" title="Session 5 — Working Group Breakouts (parallel)">
          <ul>
            <li><strong>Ontology WG:</strong> C2M2 metadata standards, controlled vocabularies, pending topics.</li>
            <li><strong>Knowledge Graph WG:</strong> KG development, LLM integration, cross-program interoperability standards.</li>
            <li><strong>Evaluation, Trainers &amp; Communications Outreach:</strong> training planning, evaluation metrics, outreach charter, communication resources.</li>
          </ul>
        </Session>

        <Session time="10:30 – 11:30 AM" title="Session 6 — Breakout Sessions">
          <ul>
            <li><strong>Community Engagement — Cathy Wu (UniProt):</strong> strategies broadening the CFDE community through partnerships with major biomedical databases.</li>
            <li><strong>Tooling in the Cloud Workspace — CWIC Team:</strong> deep dive on available tools, workflow integration, onboarding, and the cfdeworkspace.org roadmap.</li>
            <li><strong>MCP / Agentic AI / Chatbots / Vibe Coding — DRC Team:</strong> Model Context Protocols, agentic AI, chatbot integrations, and emerging &ldquo;vibe coding&rdquo; methodologies.</li>
            <li><strong>Metabotyping Partnership — Shankar Subramaniam:</strong> defining human metabotypes across Common Fund datasets and cross-program opportunities.</li>
          </ul>
        </Session>

        <Session time="12:45 – 2:45 PM" title="Session 7 — Emerging Opportunities for Expanding the User Base">
          <ul>
            <li>
              <strong>Liver Resource:</strong> the CFDE Liver Portal as a flagship cross-center use
              case — integrative analysis combining DRC metadata, Knowledge Center analyses, and
              Cloud Workspace compute.
            </li>
            <li>
              <strong>Synergy with Communications &amp; Outreach Group:</strong> strategic
              alignment of scientific outputs and outreach; cohesive communication strategies,
              event presence (ISMB, ASHG), and user base growth.
            </li>
          </ul>
        </Session>
      </Section>

      {/* ══════ Themes ══════ */}
      <Section kicker="Cross-cutting themes" title="Highlights across the meeting">
        <div className="grid-3">
          <div className="card">
            <h3 className="card__title"><span className="ico">🤖</span>AI &amp; Agentic Tools</h3>
            <p>
              MCP/agentic AI, GSFM, Reveal, ProteinGPT, ChEA-KG time series, and AI-assisted report
              generation transforming workflows.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🔗</span>Data Integration</h3>
            <p>
              Cross-program gene set crossing, Liver Portal multi-center collaboration, and C2M2
              metadata enabling discovery across 13+ DCCs.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🎓</span>Training &amp; Outreach</h3>
            <p>
              DECO Institute, CFDE 101, DataViz Competition, hackathon, and R25 short courses
              expanding the user base from early-career to international researchers.
            </p>
          </div>
        </div>
      </Section>

      {/* ══════ Posters ══════ */}
      <Section tint kicker="Poster session" title="Poster highlights">
        <div className="grid-cards">
          <div className="card">
            <h3 className="card__title"><span className="ico">🧬</span>Omics &amp; Disease Biology</h3>
            <ul className="ticks">
              <li>Drug Ranger: connectivity mapping for drug-gene regulators</li>
              <li>MoTrPAC Exercise Biology: acute exercise effects in sedentary adults</li>
              <li>Aging Atlas: tissue-specific gene regulators</li>
              <li>PRISM Framework: multimodal molecular embedding</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">⚙</span>Tool Development &amp; Platforms</h3>
            <ul className="ticks">
              <li>CFDE Workbench: C2M2 graph search</li>
              <li>HRA Organ Gallery VR (Andreas Bueckle)</li>
              <li>AI-Assisted Report Generation</li>
              <li>ChEA-KG Time Series Tool</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">📊</span>Knowledge &amp; Data Resources</h3>
            <ul className="ticks">
              <li>BiomarkerKB: unified biomarker portal (biomarkerkb.org)</li>
              <li>CFDE Talent Knowledge Graph (Zhandos, SPARC Center)</li>
              <li>GSFM: Gene Set Foundation Model (Daniel Clarke)</li>
              <li>ProteinGPT: protein-language alignment</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🌍</span>Training &amp; Community</h3>
            <ul className="ticks">
              <li>Simdar Hive: resource-limited institution training</li>
              <li>Human Microbiome Data Discovery course</li>
              <li>Multi-omic data analysis — Bar Harbor</li>
              <li>CFDE DataViz Competition submissions</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ══════ Upcoming ══════ */}
      <Section kicker="What's next" title="Upcoming events & deadlines">
        <div className="grid-cards">
          <div className="card"><h3 className="card__title"><span className="ico">📅</span>April 2026</h3><p>DECO Institute 8-week program registration opens.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">⏰</span>May 31, 2026</h3><p>Hackathon registration deadline.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">☀️</span>Summer 2026</h3><p>DECO Institute launches; Knowledge Center Summer Incubator event.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🔬</span>Ongoing</h3><p>Community Source Modules RFP; CFDE Talent KG requests; DataViz Competition submissions.</p></div>
        </div>
      </Section>

      {/* ══════ Feedback ══════ */}
      <Section tint kicker="Participant feedback" title="What attendees said">
        <div className="grid-2">
          <div className="quote">
            <p>&ldquo;The public launch of cfdeworkspace.org is a major milestone — finally giving researchers real access to the tools and datasets in one place.&rdquo;</p>
            <cite>— Postdoctoral Researcher</cite>
          </div>
          <div className="quote">
            <p>&ldquo;The Reveal tool from the Knowledge Center was incredibly impressive — seeing it confirm and extend findings from published papers in real time was a highlight.&rdquo;</p>
            <cite>— Principal Investigator</cite>
          </div>
          <div className="quote">
            <p>&ldquo;The breakout on MCP/Agentic AI opened my eyes to where CFDE is headed with AI tooling. Exciting to be part of this community.&rdquo;</p>
            <cite>— Junior Scholar</cite>
          </div>
          <div className="quote">
            <p>&ldquo;The DECO Institute and Training Center initiatives are exactly what our students need — real mentorship connected to real data.&rdquo;</p>
            <cite>— R25 Program Leader</cite>
          </div>
        </div>
        <ul className="ticks" style={{ marginTop: 28, maxWidth: '72ch' }}>
          <li>Excitement around the cfdeworkspace.org public launch</li>
          <li>High quality and diversity of Tech Showcase demos</li>
          <li>Strong AI-ready and FAIR data practices emphasis</li>
          <li>Engaging junior scholar lightning talks and poster session</li>
          <li>Valuable working group breakouts</li>
          <li>Appreciation for cross-center collaboration (Liver Portal)</li>
        </ul>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>Moving forward together</h2>
          <p style={{ maxWidth: '76ch', marginInline: 'auto' }}>
            The CFDE Spring 2026 meeting demonstrated the ecosystem&rsquo;s continued momentum —
            from the public launch of the Cloud Workspace at cfdeworkspace.org, to breakthrough AI
            tools like Reveal and GSFM, to expanding training programs reaching researchers
            worldwide.
          </p>
          <p className="closing__contact">
            2026 NIH CFDE Spring Meeting · March 24–25, 2026 · Bethesda, MD ·{' '}
            <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
