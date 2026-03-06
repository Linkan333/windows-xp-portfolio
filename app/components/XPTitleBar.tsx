"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

interface XPTitleBarProps {
  title: string;
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  iconSrc?: string;
  iconAlt?: string;
}

export default function XPTitleBar({
  title,
  onMouseDown,
  iconSrc = "/images/mycomputer.ico",
  iconAlt = "window icon",
}: XPTitleBarProps) {
  const captionButtonClass =
    "relative flex h-[21px] w-[21px] items-center justify-center rounded-[3px] border border-[#163b97] bg-[linear-gradient(to_bottom,#7ea7ff_0%,#5b8ff6_45%,#3f6ddd_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_1px_0_rgba(0,0,0,0.28)] active:translate-y-px active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]";

  const closeButtonClass =
    "relative flex h-[21px] w-[21px] items-center justify-center rounded-[3px] border border-[#8f2a1f] bg-[linear-gradient(to_bottom,#f78a79_0%,#ea5b4e_42%,#cf3a2d_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_1px_0_rgba(0,0,0,0.28)] active:translate-y-px active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]";

  return (
    <div
      onMouseDown={onMouseDown}
      className="
        h-[36px]
        bg-[linear-gradient(to_bottom,#94b1e9_0%,#7a97df_17%,#7a96df_36%,#7c9ae2_50%,#82a9e9_75%,#81a6e8_83%,#c8d0e5_100%)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(9,27,96,0.62)]
        flex items-center pl-[7px] pr-[6px]
        xp-draggable
      "
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={16}
        height={16}
      />

      <span className="ml-[6px] text-[13px] font-bold text-white [text-shadow:1px_1px_0_rgba(0,0,0,0.45)]">
        {title}
      </span>

      <div className="ml-auto flex items-center gap-[2px]">
        <button
          className={captionButtonClass}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <span className="mt-[7px] h-[2px] w-[8px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]" />
        </button>

        <button
          className={captionButtonClass}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <span className="h-[8px] w-[9px] border-[2px] border-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
        </button>

        <button
          className={closeButtonClass}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <span className="absolute h-[10px] w-[2px] rotate-45 bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
          <span className="absolute h-[10px] w-[2px] -rotate-45 bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
        </button>
      </div>
    </div>
  );
}
