"use client";

import TextDocumentWindow from "./TextDocumentWindow";

interface MyActivityFeedsProps {
  zIndex: number;
  onBringToFront: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export default function MyActivityFeeds({
  zIndex,
  onBringToFront,
  onMinimize,
  onClose,
}: MyActivityFeedsProps) {
  return (
    <TextDocumentWindow
      title="My Activity Feeds.txt"
      iconSrc="/images/icons/46.ico"
      iconAlt="My Activity Feeds icon"
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      onMinimize={onMinimize}
      onClose={onClose}
    >
      <h2 className="mb-3 border-b border-[#d4d0c2] pb-2 text-[15px] font-bold tracking-[0.01em] text-[#1e4093]">
        My Activity Feeds
      </h2>

      <div className="max-w-[68ch] space-y-3 text-[13px] leading-[1.55] tracking-[0.01em] text-[#212121]">
        <p>
          This panel is for ongoing updates: current builds, CTF preparation, writeups in
          progress, and tool updates.
        </p>
        <p>
          You can replace this text with a live feed later, for example by consuming data
          from GitHub events, RSS, or a simple JSON endpoint.
        </p>
      </div>
    </TextDocumentWindow>
  );
}
