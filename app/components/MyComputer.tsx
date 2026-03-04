"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface MyComputerProps {
  onMinimize: () => void;
  onClose: () => void;
}

export default function MyComputer({ onMinimize, onClose }: MyComputerProps) {
  const [position, setPosition] = useState({ x: 400, y: 200 });
  const [dragging, setDragging] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (maximized) return;

    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const toggleMaximize = () => {
    setMaximized((prev) => !prev);
  };

  const windowStyle = maximized
    ? {
        left: 8,
        top: 8,
        width: "calc(100vw - 16px)",
        height: "calc(100vh - 88px)",
      }
    : {
        left: position.x,
        top: position.y,
        width: 560,
        height: 480,
      };

  const captionButtonClass =
    "relative flex h-[21px] w-[21px] items-center justify-center rounded-[3px] border border-[#163b97] bg-[linear-gradient(to_bottom,#7ea7ff_0%,#5b8ff6_45%,#3f6ddd_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_1px_0_rgba(0,0,0,0.28)] active:translate-y-px active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]";

  const closeButtonClass =
    "relative flex h-[21px] w-[21px] items-center justify-center rounded-[3px] border border-[#8f2a1f] bg-[linear-gradient(to_bottom,#f78a79_0%,#ea5b4e_42%,#cf3a2d_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_1px_0_rgba(0,0,0,0.28)] active:translate-y-px active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]";

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
      style={windowStyle}
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
        <div className="w-full h-full bg-[#ECE9D8] rounded-[5px] overflow-hidden">

          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={toggleMaximize}
            className="
              h-[30px]
              bg-[linear-gradient(to_bottom,#0f46b8_0%,#2f6de4_12%,#6ea6ff_22%,#3d7bea_45%,#255fd4_100%)]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(9,27,96,0.62)]
              flex items-center pl-[7px] pr-[6px]
              cursor-move
            "
          >
            <Image
              src="/images/mycomputer.ico"
              alt="My Computer"
              width={16}
              height={16}
            />

            <span className="ml-[6px] text-[13px] font-bold leading-none text-white [text-shadow:1px_1px_0_rgba(0,0,0,0.45)]">
              My Computer
            </span>

            <div className="ml-auto flex items-center gap-[2px]">
              <button
                type="button"
                onClick={onMinimize}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Minimize"
                className={captionButtonClass}
              >
                <span className="mt-[7px] h-[2px] w-[8px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]" />
              </button>

              <button
                type="button"
                onClick={toggleMaximize}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label={maximized ? "Restore" : "Maximize"}
                className={captionButtonClass}
              >
                {maximized ? (
                  <>
                    <span className="absolute left-[6px] top-[5px] h-[7px] w-[8px] border-[2px] border-white border-b-0 shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
                    <span className="absolute left-[8px] top-[7px] h-[7px] w-[8px] border-[2px] border-white bg-transparent shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
                  </>
                ) : (
                  <span className="h-[8px] w-[9px] border-[2px] border-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Close"
                className={closeButtonClass}
              >
                <span className="absolute h-[10px] w-[2px] rotate-45 bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
                <span className="absolute h-[10px] w-[2px] -rotate-45 bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
              </button>
            </div>
          </div>
          <div
            className="
              h-[26px]
              bg-[#ECE9D8]
              shadow-[inset_0_-1px_0_#FFFFFF,inset_0_-2px_0_#ACA899]
              flex items-center
              px-2
              text-[13px]
              text-black
              gap-6
              select-none
            "
          >
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">File</button>
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">Edit</button>
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">View</button>
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">Favorites</button>
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">Tools</button>
            <button className="px-1 text-[#D4D0C8] hover:bg-[#316AC5] hover:text-white">Help</button>

            <div
              className="
                ml-auto
                mr-[-7px]
                mt-[-2]
                h-[22px]
                px-[6px]
                bg-white
                flex items-center justify-center
              "
            >
              <Image
                src="/images/windows-xp-logo.svg"
                alt="Windows XP"
                width={0}
                height={0}
                className="h-[16px] w-auto"
              />
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
