"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import XPTitleBar from "./XPTitleBar";

const WINDOW_WIDTH = 720;
const WINDOW_HEIGHT = 480;

export default function MyProjects() {
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
    ? { left: position.x, top: position.y, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }
    : { width: WINDOW_WIDTH, height: WINDOW_HEIGHT };

  return (
    <div ref={windowRef}
      className={`absolute ${position === null ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""}`}
      style={windowStyle}>
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
        </div>
      </div>
      </div>
    );
}
