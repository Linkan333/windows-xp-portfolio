"use client";

import TextDocumentWindow from "./TextDocumentWindow";

interface MySocialsProps {
  zIndex: number;
  onBringToFront: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export default function MySocials({
  zIndex,
  onBringToFront,
  onMinimize,
  onClose,
}: MySocialsProps) {
  return (
    <TextDocumentWindow
      title="My Socials.txt"
      iconSrc="/images/icons/1111.ico"
      iconAlt="My Socials icon"
      zIndex={zIndex}
      onBringToFront={onBringToFront}
      onMinimize={onMinimize}
      onClose={onClose}
    >
      <h2 className="mb-3 border-b border-[#d4d0c2] pb-2 text-[15px] font-bold tracking-[0.01em] text-[#1e4093]">
        My Socials
      </h2>

      <ul className="max-w-[66ch] space-y-2 text-[13px] leading-[1.55] tracking-[0.01em] text-[#212121]">
        <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
          <a
            href="https://github.com/Linkan333"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
          >
            GitHub
          </a>
          <p className="mt-1 text-[#2f2f2f]">Source code, security tooling, and experiments.</p>
        </li>
        <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
          <a
            href="https://linkan.dev"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
          >
            Portfolio
          </a>
          <p className="mt-1 text-[#2f2f2f]">Main home page and project overview.</p>
        </li>
      </ul>
    </TextDocumentWindow>
  );
}
