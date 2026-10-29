import { useEffect, useRef, useState } from 'react';

/*
 * Two-level agenda explorer for meeting recaps: a tab per day, then a tab per
 * session, with one session's detail shown at a time so a long programme fits
 * on one screen instead of one long scroll.
 *
 * days: [{ id, label, date, sessions: [{
 *   id, time, tag, name,          // shown in the session list
 *   title?, where, who?,          // detail header (title falls back to name)
 *   intro?, points?, cards?, note? // detail body; cards: [{ label, body }]
 * }] }]
 */

// Arrow/Home/End movement inside a tablist (WAI-ARIA tabs, automatic activation).
// Both axes are handled because the session list is vertical on desktop and a
// horizontal strip on phones.
function onTabKey(e, index, count, select, refs) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  let next;
  if (step) next = (index + step + count) % count;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = count - 1;
  else return;
  e.preventDefault();
  select(next);
  refs.current[next]?.focus();
}

function Body({ session }) {
  return (
    <>
      {session.intro && <p className="agenda__intro">{session.intro}</p>}
      {session.points && (
        <ul className="agenda__points">
          {session.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
      {session.cards && (
        <div className="agenda__cards">
          {session.cards.map((c) => (
            <section className="agenda__card" key={c.label}>
              <h4>{c.label}</h4>
              {typeof c.body === 'string' ? <p>{c.body}</p> : c.body}
            </section>
          ))}
        </div>
      )}
      {session.note && <p className="agenda__note">{session.note}</p>}
    </>
  );
}

export default function Agenda({ days, idPrefix = 'agenda' }) {
  const [dayIx, setDayIx] = useState(0);
  const [sessionIx, setSessionIx] = useState(0);
  const dayRefs = useRef([]);
  const sessionRefs = useRef([]);
  const listRef = useRef(null);
  const panelRef = useRef(null);

  const day = days[dayIx];
  const session = day.sessions[sessionIx];
  const tabId = (d, s) => `${idPrefix}-${d.id}-${s.id}`;

  const selectDay = (i) => {
    setDayIx(i);
    setSessionIx(0);
  };

  // One running order across both days, so the pager steps from the last
  // session of Day 1 straight into the first of Day 2.
  const order = days.flatMap((d, di) => d.sessions.map((s, si) => ({ di, si, d, s })));
  const at = order.findIndex((o) => o.di === dayIx && o.si === sessionIx);
  const prev = order[at - 1];
  const next = order[at + 1];

  const step = (o) => {
    setDayIx(o.di);
    setSessionIx(o.si);
    // Coming from the bottom of a long session, bring the new one's top back into view.
    const panel = panelRef.current;
    if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  // On phones the session list is a horizontal strip: keep the selected session
  // visible in it. Only the strip scrolls, never the page.
  useEffect(() => {
    const list = listRef.current;
    const item = sessionRefs.current[sessionIx];
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const l = list.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    if (r.left < l.left || r.right > l.right) list.scrollBy({ left: r.left - l.left - 4, behavior: 'smooth' });
  }, [dayIx, sessionIx]);

  return (
    <div className="agenda">
      <div className="agenda__days" role="tablist" aria-label="Meeting days">
        {days.map((d, i) => (
          <button
            key={d.id}
            ref={(el) => { dayRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${idPrefix}-${d.id}`}
            aria-selected={i === dayIx}
            aria-controls={`${idPrefix}-${d.id}-panel`}
            tabIndex={i === dayIx ? 0 : -1}
            className="agenda__day"
            onClick={() => selectDay(i)}
            onKeyDown={(e) => onTabKey(e, i, days.length, selectDay, dayRefs)}
          >
            <span className="agenda__dayname">{d.label}</span>
            <span className="agenda__daydate">{d.date}</span>
            <span className="agenda__daydate">{d.sessions.length} sessions</span>
          </button>
        ))}
      </div>

      <div className="agenda__body" role="tabpanel" id={`${idPrefix}-${day.id}-panel`} aria-labelledby={`${idPrefix}-${day.id}`}>
        <div className="agenda__list" role="tablist" aria-label={`${day.label} sessions`} aria-orientation="vertical" ref={listRef}>
          {day.sessions.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { sessionRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={tabId(day, s)}
              aria-selected={i === sessionIx}
              aria-controls={`${idPrefix}-session`}
              tabIndex={i === sessionIx ? 0 : -1}
              className="agenda__item"
              onClick={() => setSessionIx(i)}
              onKeyDown={(e) => onTabKey(e, i, day.sessions.length, setSessionIx, sessionRefs)}
            >
              <span className="agenda__time">{s.time}</span>
              <span className="agenda__tag">{s.tag}</span>
              <span className="agenda__name">{s.name}</span>
            </button>
          ))}
        </div>

        <article
          className="agenda__panel"
          role="tabpanel"
          id={`${idPrefix}-session`}
          aria-labelledby={tabId(day, session)}
          tabIndex={0}
          ref={panelRef}
          style={{ scrollMarginTop: 96 }}
        >
          <p className="agenda__meta">
            <b>{session.tag}</b>
            <span>{day.label}, {day.date}</span>
            <span>{session.where}</span>
          </p>
          <h3 className="agenda__title">{session.title || session.name}</h3>
          {session.who && <p className="agenda__who">{session.who}</p>}
          <Body session={session} />

          <footer className="agenda__pager">
            <button type="button" onClick={() => step(prev)} disabled={!prev} aria-label={prev ? `Previous session: ${prev.s.name}` : undefined}>
              {/* Phones show just "Previous"/"Next"; wider screens name the session. */}
              ← <span className="agenda__pagename">{prev && prev.di !== dayIx && `${prev.d.label}: `}{prev?.s.name}</span>
              <span className="agenda__pageshort">Previous</span>
            </button>
            <span className="agenda__count">{sessionIx + 1} of {day.sessions.length} · {day.label}</span>
            <button type="button" onClick={() => step(next)} disabled={!next} aria-label={next ? `Next session: ${next.s.name}` : undefined}>
              <span className="agenda__pagename">{next && next.di !== dayIx && `${next.d.label}: `}{next?.s.name}</span>
              <span className="agenda__pageshort">{next && next.di !== dayIx ? next.d.label : 'Next'}</span> →
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
