"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface MyComputerProps {
  onMinimize: () => void;
}

export default function MyComputer({ onMinimize }: MyComputerProps) {
  const [position, setPosition] = useState({ x: 400, y: 200 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
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

  return (
    <div
      className="absolute"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="
          w-[560px] h-[480px]
          bg-[linear-gradient(to_bottom,#7481D7_0%,#6C76D8_100%)]
          p-[2px]
          rounded-[6px]
          shadow-[4px_4px_12px_rgba(0,0,0,0.5)]
          select-none
        "
      >
        <div className="w-full h-full bg-[#ECE9D8] rounded-[4px] overflow-hidden">

          <div
            onMouseDown={handleMouseDown}
            className="
              h-[30px]
              bg-[linear-gradient(to_bottom,#97AEE5_0%,#7D91DB_50%,#6B84D6_100%)]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.4)]
              flex items-center px-3
              cursor-move
            "
          >
            <Image
              src="/images/mycomputer.ico"
              alt="My Computer"
              width={20}
              height={20}
            />

            <span className="ml-2 text-white text-sm font-semibold">
              My Computer
            </span>

            <div className="ml-auto">
              <button
                onClick={onMinimize}
                className="
                  w-5 h-5
                  bg-yellow-400
                  border border-black
                  text-black text-xs
                  flex items-center justify-center
                "
              >
                _
              </button>
            </div>

          </div>

          <div className="p-4 text-black text-sm">
            Content
          </div>

        </div>
      </div>
    </div>
  );
}