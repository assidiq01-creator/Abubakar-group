'use client';

import { useState } from 'react';

export default function CookiePrefs() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: true, preferences: true });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs(p => ({ ...p, [key]: !p[key] }));

  const save = () => {
    document.cookie = `cso_cookie_prefs=${JSON.stringify(prefs)};path=/;max-age=31536000`;
    setOpen(false);
  };

  const acceptAll = () => {
    const all = { analytics: true, marketing: true, preferences: true };
    setPrefs(all);
    document.cookie = `cso_cookie_prefs=${JSON.stringify(all)};path=/;max-age=31536000`;
    setOpen(false);
  };

  return (
    <>
      <style>{`
        #ag-cookie-btn{position:fixed;bottom:24px;left:24px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:99998;transition:border-color 0.2s,background 0.2s}
        #ag-cookie-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.22)}
        #ag-cookie-btn svg{width:18px;height:18px;stroke:rgba(255,255,255,0.4);stroke-width:1.6;fill:none;transition:stroke 0.2s}
        #ag-cookie-btn:hover svg{stroke:rgba(255,255,255,0.7)}
        #ag-cookie-panel{position:fixed;bottom:76px;left:24px;width:280px;background:#0f1929;border-top:3px solid #D4AF37;border-radius:4px;z-index:99998;font-family:var(--font-montserrat),sans-serif}
        .cp-head{padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .cp-eyebrow{font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#D4AF37;margin-bottom:4px}
        .cp-sub{font-size:10px;color:rgba(255,255,255,0.35);line-height:1.5}
        .cp-rows{padding:4px 18px}
        .cp-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
        .cp-row:last-child{border-bottom:none}
        .cp-name{font-size:11px;font-weight:600;color:rgba(255,255,255,0.7)}
        .cp-desc{font-size:9px;color:rgba(255,255,255,0.28);margin-top:2px}
        .cp-toggle{position:relative;width:32px;height:17px;flex-shrink:0;margin-left:12px;display:inline-block}
        .cp-toggle input{opacity:0;width:0;height:0;position:absolute}
        .cp-slider{position:absolute;inset:0;background:rgba(255,255,255,0.1);border-radius:17px;cursor:pointer;transition:background 0.2s}
        .cp-slider::before{content:"";position:absolute;width:11px;height:11px;background:rgba(255,255,255,0.35);border-radius:50%;left:3px;top:3px;transition:transform 0.2s,background 0.2s}
        .cp-toggle input:checked+.cp-slider{background:rgba(212,175,55,0.2)}
        .cp-toggle input:checked+.cp-slider::before{transform:translateX(15px);background:#D4AF37}
        .cp-toggle input:disabled+.cp-slider{opacity:0.5;cursor:not-allowed}
        .cp-foot{padding:12px 18px 16px;display:flex;gap:8px}
        .cp-save{flex:1;background:#D4AF37;color:#0a0a0a;border:none;font-family:inherit;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:9px;border-radius:2px;cursor:pointer}
        .cp-all{background:none;color:rgba(255,255,255,0.3);border:1px solid rgba(255,255,255,0.1);font-family:inherit;font-size:9px;letter-spacing:1px;text-transform:uppercase;padding:9px 10px;border-radius:2px;cursor:pointer;white-space:nowrap}
      `}</style>

      <button id="ag-cookie-btn" aria-label="Cookie preferences" onClick={() => setOpen(o => !o)}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {open && (
        <div id="ag-cookie-panel">
          <div className="cp-head">
            <div className="cp-eyebrow">Cookie preferences</div>
            <div className="cp-sub">Choose which cookies you allow.</div>
          </div>
          <div className="cp-rows">
            <div className="cp-row">
              <div><div className="cp-name">Necessary</div><div className="cp-desc">Required for the site to function</div></div>
              <label className="cp-toggle"><input type="checkbox" checked disabled/><span className="cp-slider"/></label>
            </div>
            {([
              ['analytics', 'Analytics', 'Understand how visitors use the site'],
              ['marketing', 'Marketing', 'Personalised ads and content'],
              ['preferences', 'Preferences', 'Remember your site settings'],
            ] as [keyof typeof prefs, string, string][]).map(([key, name, desc]) => (
              <div className="cp-row" key={key}>
                <div><div className="cp-name">{name}</div><div className="cp-desc">{desc}</div></div>
                <label className="cp-toggle">
                  <input type="checkbox" checked={prefs[key]} onChange={() => toggle(key)}/>
                  <span className="cp-slider"/>
                </label>
              </div>
            ))}
          </div>
          <div className="cp-foot">
            <button className="cp-all" onClick={acceptAll}>Accept all</button>
            <button className="cp-save" onClick={save}>Save choices</button>
          </div>
        </div>
      )}
    </>
  );
}
