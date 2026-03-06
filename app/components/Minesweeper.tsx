"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

interface MyProjectsProps {
  zIndex: number;
  onBringToFront: () => void;
}

export default function MineSweeper({ zIndex, onBringToFront }: MyProjectsProps) {
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
      <div className="flex flex-col w-full h-full bg-[#c0c0c0] border-[3px] border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b]">

        {/* Menu bar */}
        <div className="h-7 flex items-center gap-4 px-2 text-sm bg-[#d4d0c8] border-b border-[#7b7b7b]">
          <span className="hover:underline cursor-default">Game</span>
          <span className="hover:underline cursor-default">Help</span>
        </div>

        {/* Scoreboard */}
        <div className="flex items-center justify-between p-2 border-b-2 border-[#7b7b7b]">

          {/* Mine Counter */}
          <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white">
            010
          </div>

          {/* Smiley Reset */}
          <button className="w-8 h-8 flex items-center justify-center bg-[#d4d0c8]
      border-2 border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b]
      active:border-t-[#7b7b7b] active:border-l-[#7b7b7b] active:border-r-white active:border-b-white">
            🙂
          </button>

          {/* Timer */}
          <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white">
            000
          </div>

        </div>

        {/* Game Grid */}
        <div className="flex-1 p-2">
          <div className="grid grid-cols-9 grid-rows-9 gap-[1px] bg-[#7b7b7b] p-[2px] border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white">

            {/* Example cells */}
            {Array.from({ length: 81 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-[#d4d0c8]
          border-2 border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b]"
              />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}