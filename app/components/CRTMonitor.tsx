import type { ReactNode } from "react";

interface CRTMonitorProps {
  children: ReactNode;
  frameSrc?: string;
}

export default function CRTMonitor({ children, frameSrc }: CRTMonitorProps) {
  return (
    <div className="crt-monitor">
      <div className="crt-screen">{children}</div>
      <div className="crt-layer crt-layer-scanlines" aria-hidden="true" />
      <div className="crt-layer crt-layer-wave" aria-hidden="true" />
      <div className="crt-layer crt-layer-noise" aria-hidden="true" />
      <div className="crt-layer crt-layer-vignette" aria-hidden="true" />
      <div className="crt-layer crt-layer-flicker" aria-hidden="true" />
      {frameSrc ? (
        <div
          className="crt-layer crt-layer-frame"
          style={{ backgroundImage: `url(${frameSrc})` }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
