import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CfdeWheel from '@/components/CfdeWheel';

/*
 * Floating "explore the CFDE" button, stacked above the Copilot chat bubble,
 * that opens the CFDE wheel in a dialog — the same pattern as info.cfde.cloud.
 */

const WHEEL_SIZE = 700; // CfdeWheel's fixed frame, in px
const VIEWPORT_GUTTER = 48; // breathing room kept around the wheel in the dialog

const fitScale = () =>
  Math.min(
    1,
    (window.innerWidth - VIEWPORT_GUTTER) / WHEEL_SIZE,
    (window.innerHeight - VIEWPORT_GUTTER) / WHEEL_SIZE,
  );

export default function WheelFab() {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const fabRef = useRef(null);
  const closeRef = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // Browser back/forward while the dialog is up should not leave it hanging open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onResize = () => setScale(fitScale());
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    const fab = fabRef.current;

    onResize();
    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
      fab?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={`wheelfab${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close the CFDE ecosystem wheel' : 'Explore the CFDE ecosystem'}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="cfde-wheel-dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <img src="/images/wheel/cfde-unified-icon.svg" alt="" />
        <span className="wheelfab__tip" aria-hidden="true">Explore the CFDE</span>
      </button>

      {open && (
        <div
          className="wheelmodal"
          id="cfde-wheel-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="CFDE ecosystem wheel"
          onClick={(e) => {
            // Clicks on empty space (the frame passes them through) close the dialog.
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="wheelmodal__close" aria-label="Close" onClick={close}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="wheelmodal__frame" style={{ width: WHEEL_SIZE * scale, height: WHEEL_SIZE * scale }}>
            <div className="wheelmodal__scaled" style={{ transform: `scale(${scale})` }}>
              <CfdeWheel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
