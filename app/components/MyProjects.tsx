"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import XPTitleBar from "./XPTitleBar";

const WINDOW_WIDTH = 720;
const WINDOW_HEIGHT = 480;

interface MyProjectsProps {
  zIndex: number;
  onBringToFront: () => void;
}

export default function MyProjects({ zIndex, onBringToFront }: MyProjectsProps) {
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
    <div
      ref={windowRef}
      className={`absolute ${position === null ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}
      style={windowStyle}
      onMouseDown={onBringToFront}
    >
      <div
        className="
        h-full w-full
        bg-[linear-gradient(to_bottom,#0b4fc8_0%,#1f64dc_8%,#7fa2ef_100%)]
        p-[3px]
        rounded-[8px]
        shadow-[0_10px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)]
        select-none
      "
      >
        <div className="flex h-full w-full flex-col bg-[#ECE9D8] rounded-[5px] overflow-hidden">

          <XPTitleBar
            title="My Projects.txt"
            onMouseDown={handleTitleMouseDown}
            iconSrc="/images/icons/509.ico"
            iconAlt="My Projects icon"
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
              Projects & Links
            </h2>

            <ul className="max-w-[66ch] space-y-2 text-[13px] leading-[1.55] tracking-[0.01em] text-[#212121]">
              <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <a
                  href="https://github.com/Linkan333/APIHawk"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                >
                  APIHawk
                </a>
                <p className="mt-1 text-[#2f2f2f]">
                  Easy-to-use tool built for API endpoint fuzzing during reconnaissance.
                </p>
              </li>

              <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <a
                  href="https://github.com/Linkan333/SubHawk"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                >
                  SubHawk
                </a>
                <p className="mt-1 text-[#2f2f2f]">
                  Companion tool focused on subdomain enumeration for recon workflows.
                </p>
              </li>

              <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <a
                  href="https://buzzwork.se"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                >
                  Buzzwork
                </a>
                <p className="mt-1 text-[#2f2f2f]">
                  Company site that I designed and built.
                </p>
              </li>

              <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <a
                  href="https://dronarflex.se"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                >
                  Dronarflex
                </a>
                <p className="mt-1 text-[#2f2f2f]">
                  Website project delivered for a client company.
                </p>
              </li>

              <li className="rounded-[3px] border border-[#c9c6b8] bg-[#fffef9] px-3 py-2">
                <a
                  href="https://github.com/Linkan333/ctf-solves"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#17439c] underline underline-offset-2 hover:text-[#0b2f79]"
                >
                  CTF Solves
                </a>
                <p className="mt-1 text-[#2f2f2f]">
                  Writeups from CTF challenges and exploit practice notes.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
