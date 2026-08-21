/* Small shared building blocks used across the public pages. */

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
  );
}

export function Mesh() {
  return (
    <div className="hero__mesh" aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5fd0d8" />
            <stop offset="100%" stopColor="#3d8fd6" />
          </linearGradient>
        </defs>
        <g stroke="url(#edge)" strokeWidth="1.1" fill="none" opacity=".5">
          <path d="M90 470 L245 300 L120 150 M245 300 L470 385 L640 210 M470 385 L520 545 M640 210 L845 265 L1010 130 M845 265 L930 450 L1120 500 M930 450 L640 210 M245 300 L520 545 M1010 130 L1120 500" />
        </g>
        <g fill="#7fdfe4">
          <circle cx="90" cy="470" r="4.5" /><circle cx="245" cy="300" r="6.5" />
          <circle cx="120" cy="150" r="4" /><circle cx="470" cy="385" r="6" />
          <circle cx="640" cy="210" r="7.5" /><circle cx="520" cy="545" r="4" />
          <circle cx="845" cy="265" r="6" /><circle cx="1010" cy="130" r="4.5" />
          <circle cx="930" cy="450" r="6.5" /><circle cx="1120" cy="500" r="4" />
        </g>
      </svg>
    </div>
  );
}

/* Compact dark hero for interior pages. */
export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="hero pagehero">
      <Mesh />
      <div className="wrap hero__inner">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1 className="hero__title">{title}</h1>
        {sub && <p className="hero__sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function Section({ tint, tight, id, kicker, title, lede, children, className = '' }) {
  const cls = [
    'section',
    tight ? 'section--tight' : '',
    tint ? 'section--tint' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={cls} id={id}>
      <div className="wrap">
        {kicker && <p className="kicker">{kicker}</p>}
        {title && <h2 className="h2">{title}</h2>}
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export function Stats({ items }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Session({ time, where, title, children }) {
  return (
    <article className="session">
      {(time || where) && (
        <p className="session__meta">
          {time && <time>{time}</time>}
          {where && <span className="where">{where}</span>}
        </p>
      )}
      {title && <h4>{title}</h4>}
      {children}
    </article>
  );
}

export function DayHead({ title, date }) {
  return (
    <div className="dayhead">
      <h3>{title}</h3>
      {date && <span>{date}</span>}
    </div>
  );
}

export function Person({ img, name, org, children }) {
  return (
    <div className="person">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p className="person__org">{org}</p>
      <p>{children}</p>
    </div>
  );
}
