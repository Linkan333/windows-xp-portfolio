"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import XPTitleBar from "./XPTitleBar";

const WINDOW_WIDTH = 720;
const WINDOW_HEIGHT = 480;

interface MyAccomplishmentsProps {
  zIndex: number;
  onBringToFront: () => void;
}

export default function MyAccomplishments({
  zIndex,
  onBringToFront,
}: MyAccomplishmentsProps) {
  const menuItems = ["File", "Edit", "Format", "View", "Help"];
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleTitleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (position === null && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      offset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setDragging(true);
      return;
    }

    if (!position) return;

    setDragging(true);
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    document.body.classList.toggle("xp-cursor-dragging", dragging);

    return () => {
      document.body.classList.remove("xp-cursor-dragging");
    };
  }, [dragging]);

  const windowStyle = position
    ? { left: position.x, top: position.y, width: WINDOW_WIDTH, height: WINDOW_HEIGHT, zIndex }
    : { width: WINDOW_WIDTH, height: WINDOW_HEIGHT, zIndex };

  return (
    <div ref={windowRef}
      className={`absolute ${position === null ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}
      style={windowStyle}
      onMouseDown={onBringToFront}>
      <div className="
      h-full w-full
      bg-[linear-gradient(to_bottom,#0b4fc8_0%,#1f64dc_8%,#7fa2ef_100%)]
      p-[3px]
      rounded-[8px]
      shadow-[0_10px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)]
      select-none
      ">
        <div className="flex h-full w-full flex-col bg-[#ECE9D8] rounded-[5px] overflow-hidden">
          <XPTitleBar
            title="My Accomplishments.txt"
            onMouseDown={handleTitleMouseDown}
            iconSrc="/images/icons/509.ico"
            iconAlt="My Accomplishments icon"
          />
          <div className="h-[26px] bg-[#ECE9D8] text-[#000] shadow-[inset_0_-1px_0_#FFFFFF,inset_0_-2px_0_#ACA899] flex items-center px-2 text-[13px] gap-2">
            {menuItems.map((item) => (
              <button
                key={item}
                className="px-[8px] py-[1px] leading-none hover:bg-[#316AC5] hover:text-white"
              >
                {item}
                </button>
            ))}
          </div>

          <div className="flex-1 bg-white p-4 text-black overflow-auto [text-shadow:none] antialiased">
            <h2 className="mb-3 border-b border-[#d4d0c2] pb-2 text-[15px] font-bold tracking-[0.01em] text-[#1e4093]">
              Accomplishments
            </h2>

            <ul className="max-w-[68ch] space-y-3 text-[13px] leading-[1.55] tracking-[0.01em] text-[#212121]">
              <li className="space-y-2 rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <h3 className="text-[13px] font-bold leading-[1.35] text-[#1d3f90]">
                  Swedish Security Championships Qualifiers (2026){" "}
                  <span className="text-[12px] font-normal text-[#666]">
                    Finals result to be continued
                  </span>
                </h3>

                <p className="text-[13px] leading-[1.55] text-[#2f2f2f]">
                  In January 2026, I participated in the qualifiers for{" "}
                  <a
                    href="https://ctf.sakerhetssm.se"
                    className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                  >
                    Säkerhetssm
                  </a>.
                  I competed with the team <strong>IPOAC</strong>, where we placed
                  <strong> 2nd in the Swedish qualifiers</strong>.
                </p>

                <p className="text-[13px] leading-[1.55] text-[#2f2f2f]">
                  This year the competition was expanded so teams from the
                  <strong> Nordic Baltic Union (NBU)</strong> could also participate,
                  including teams from Finland, Norway, Sweden, Estonia, and Lithuania.
                  Our team placed <strong>5th overall</strong> across all participating
                  regions.
                </p>
              </li>

              <li className="space-y-2 rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <h3 className="text-[13px] font-bold leading-[1.35] text-[#1d3f90]">
                  Swedish Security Championships Qualifiers (2025)
                </h3>

                <p className="text-[13px] leading-[1.55] text-[#2f2f2f]">
                  In 2025 I participated in both the qualifiers and the finals.
                  Our team placed <strong>14th in the qualifiers</strong>, which was a good
                  result for my first time competing.
                </p>

                <p className="text-[13px] leading-[1.55] text-[#2f2f2f]">
                  In the finals we finished <strong>6th place</strong>, which I was very
                  pleased with. Compared to the previous year, our performance improved
                  significantly, and this year our team achieved roughly a
                  <strong> 700% improvement</strong> in placement.
                </p>

                <p className="text-[13px] leading-[1.55] text-[#2f2f2f]">
                  For the upcoming competitions, my goal is to reach at least
                  <strong> 3rd place</strong>.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
}
