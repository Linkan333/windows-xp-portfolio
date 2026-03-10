"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import XPTitleBar from "./XPTitleBar";

const WINDOW_WIDTH = 720;
const WINDOW_HEIGHT = 480;

interface TextDocumentWindowProps {
  title: string;
  iconSrc: string;
  iconAlt: string;
  zIndex: number;
  onBringToFront: () => void;
  onMinimize: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function TextDocumentWindow({
  title,
  iconSrc,
  iconAlt,
  zIndex,
  onBringToFront,
  onMinimize,
  onClose,
  children,
}: TextDocumentWindowProps) {
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
      className={`absolute ${
        position === null ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
      }`}
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
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] bg-[#ECE9D8]">
          <XPTitleBar
            title={title}
            onMouseDown={handleTitleMouseDown}
            iconSrc={iconSrc}
            iconAlt={iconAlt}
            onMinimize={onMinimize}
            onClose={onClose}
          />

          <div className="flex h-[26px] items-center gap-2 bg-[#ECE9D8] px-2 text-[13px] text-[#000] shadow-[inset_0_-1px_0_#FFFFFF,inset_0_-2px_0_#ACA899]">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                className="px-[8px] py-[1px] leading-none hover:bg-[#316AC5] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto bg-white p-4 text-black [text-shadow:none] antialiased">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
