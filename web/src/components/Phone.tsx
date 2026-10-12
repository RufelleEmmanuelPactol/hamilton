"use client";
import Link from "next/link";
import { Hydrated } from "./ScenarioRuntime";

/** Shows a 390×844 field-app screen: framed and centred on desktop, full-bleed on a phone. */
export function Phone({ children, caption }: { children: React.ReactNode; caption?: React.ReactNode }) {
  return (
    <div className="ham-phone-page">
      <style>{`
        .ham-phone-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px 16px;background:#EEF0F4}
        .ham-phone{width:390px;height:844px;border-radius:28px;overflow:hidden;background:var(--panel);box-shadow:0 0 0 1px var(--line2),0 24px 48px rgba(16,24,40,.16);position:relative}
        .ham-phone-bar{display:flex;align-items:center;gap:12px;font-size:12px;color:var(--mute)}
        @media (max-width:480px){.ham-phone-page{padding:0;gap:0;background:var(--panel)}.ham-phone{width:100%;height:100vh;min-height:640px;border-radius:0;box-shadow:none}.ham-phone-bar{display:none}}
      `}</style>
      <div className="ham-phone-bar">
        <Link href="/console">← Admin console</Link>
        {caption ? <span>· {caption}</span> : null}
      </div>
      <div className="ham-phone ham-app">
        <Hydrated>{children}</Hydrated>
      </div>
    </div>
  );
}
