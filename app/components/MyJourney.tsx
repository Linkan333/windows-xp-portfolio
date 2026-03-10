"use client";

import TextDocumentWindow from "./TextDocumentWindow";

interface MyJourneyProps {
  zIndex: number;
  onBringToFront: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export default function MyJourney({
  zIndex,
  onBringToFront,
  onMinimize,
  onClose,
}: MyJourneyProps) {
  return (
    <TextDocumentWindow
      title="My Journey.txt"
      iconSrc="/images/icons/312.ico"
      iconAlt="My Journey icon"
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      onMinimize={onMinimize}
      onClose={onClose}
    >
      <h2 className="mb-3 border-b border-[#d4d0c2] pb-2 text-[15px] font-bold tracking-[0.01em] text-[#1e4093]">
        My Journey
      </h2>

      <div className="max-w-[68ch] space-y-3 text-[13px] leading-[1.55] tracking-[0.01em] text-[#212121]">
        <p>
          I started out building and breaking small systems to understand how things
          worked under the hood, then moved into security-focused tooling and CTF
          workflows.
        </p>
        <p>
          Over time, my focus shifted from solving isolated problems to building repeatable
          workflows, documenting findings, and shipping practical tools that save time during
          reconnaissance and testing.
        </p>
        <p>
          Current direction: keep improving exploit depth, reverse engineering skills, and
          production-quality engineering for security tools.
        </p>
      </div>
    </TextDocumentWindow>
  );
}
