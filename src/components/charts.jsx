/*
 * Small, dependency-free charts for meeting dashboards.
 *
 * Both are single-series, so every mark wears one colour (--blue, validated
 * against the white and tinted section surfaces) and there is no legend box —
 * the chart title names what is plotted. Each value is also printed as a
 * direct label, the hover/focus tooltip only adds context, and a table view
 * carries every number for readers who can't use the graphic.
 */

function TableView({ caption, columns, rows }) {
  return (
    <details className="chart__table">
      <summary>View as table</summary>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/*
 * Horizontal bars, one per category, sorted by the caller.
 * rows: [{ label, value, tip? }] — `tip` is the extra context shown on hover/focus.
 */
export function BarChart({ title, subtitle, rows, unit, total }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <figure className="chart">
      <figcaption className="chart__head">
        <span className="chart__title">{title}</span>
        {subtitle && <span className="chart__sub">{subtitle}</span>}
      </figcaption>
      <ul className="hbar">
        {rows.map((r) => {
          const share = total ? ` · ${Math.round((r.value / total) * 100)}% of ${total}` : '';
          const tip = r.tip || `${r.value} ${unit}${share}`;
          return (
            <li key={r.label} className="hbar__row" tabIndex={0} aria-label={`${r.label}: ${tip}`}>
              <span className="hbar__label">{r.label}</span>
              <span className="hbar__track">
                {/* Scale against the track minus room for the value label, so the longest bar's number stays inside the card. */}
                <span className="hbar__bar" style={{ width: `calc((100% - 2.5rem) * ${r.value / max})` }} />
                <span className="hbar__value">{r.value}</span>
              </span>
              <span className="chart__tip" aria-hidden="true">
                <b>{r.value}</b> {tip.replace(/^\d+\s*/, '')}
              </span>
            </li>
          );
        })}
      </ul>
      <TableView caption={title} columns={['', unit]} rows={rows.map((r) => [r.label, r.value])} />
    </figure>
  );
}

/*
 * Dot plot on a bounded rating scale (e.g. 1–5 stars). A dot, not a bar, because
 * the averages sit in a narrow band near the top: bars grown from zero would all
 * look full and hide the differences the reader came for.
 * rows: [{ label, mean, n, top }] — `top` = respondents who gave 4 or 5.
 */
export function DotPlot({ title, subtitle, rows, min = 1, max = 5 }) {
  const pos = (v) => `${((v - min) / (max - min)) * 100}%`;
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <figure className="chart">
      <figcaption className="chart__head">
        <span className="chart__title">{title}</span>
        {subtitle && <span className="chart__sub">{subtitle}</span>}
      </figcaption>
      <div className="dotplot">
        <div className="dotplot__axis" aria-hidden="true">
          <span className="dotplot__label" />
          <span className="dotplot__scale">
            {ticks.map((t) => <span key={t} className="dotplot__tick" style={{ left: pos(t) }}>{t}</span>)}
          </span>
        </div>
        <ul className="dotplot__rows">
          {rows.map((r) => {
            const tip = `${r.mean.toFixed(1)} average · ${r.top} of ${r.n} rated 4–5 stars`;
            return (
              <li key={r.label} className="dotplot__row" tabIndex={0} aria-label={`${r.label}: ${tip}`}>
                <span className="dotplot__label">{r.label}</span>
                <span className="dotplot__scale">
                  {ticks.map((t) => <span key={t} className="dotplot__grid" style={{ left: pos(t) }} />)}
                  <span className="dotplot__dot" style={{ left: pos(r.mean) }} />
                </span>
                <span className="dotplot__value">{r.mean.toFixed(1)}</span>
                <span className="chart__tip" aria-hidden="true">
                  <b>{r.mean.toFixed(1)}</b> average · {r.top} of {r.n} rated 4–5★
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <TableView
        caption={title}
        columns={['Question', 'Average (1–5)', 'Rated 4–5', 'Responses']}
        rows={rows.map((r) => [r.label, r.mean.toFixed(2), r.top, r.n])}
      />
    </figure>
  );
}
