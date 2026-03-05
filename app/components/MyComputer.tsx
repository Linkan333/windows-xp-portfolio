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

  useEffect(() => {
    document.body.classList.toggle("xp-cursor-dragging", dragging);

    return () => {
      document.body.classList.remove("xp-cursor-dragging");
    };
  }, [dragging]);

  const menuItems = ["File", "Edit", "View", "Favorites", "Tools", "Help"];
  const toolbarItems = ["Back", "Forward", "Search", "Folders"];

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
        <div className="flex h-full w-full flex-col bg-[#ECE9D8] rounded-[5px] overflow-hidden">

          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={toggleMaximize}
            className="
              h-[30px]
              bg-[linear-gradient(to_bottom,#0f46b8_0%,#2f6de4_12%,#6ea6ff_22%,#3d7bea_45%,#255fd4_100%)]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(9,27,96,0.62)]
              flex items-center pl-[7px] pr-[6px]
              xp-draggable
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
          <div className="h-[26px] bg-[#ECE9D8] shadow-[inset_0_-1px_0_#FFFFFF,inset_0_-2px_0_#ACA899] flex items-center px-2 text-[13px] text-black gap-2 select-none">
            {menuItems.map((item) => (
              <button
                key={item}
                className="px-[8px] py-[1px] leading-none text-[#000000] hover:bg-[#316AC5] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="h-[36px] bg-[#ECE9D8] shadow-[inset_0_1px_0_#F9F7EE,inset_0_-1px_0_#ACA899] flex items-center px-[6px] gap-[4px]">
            {toolbarItems.map((item, index) => (
              <div key={item} className="flex items-center">
                <button className="h-[26px] px-[8px] rounded-[2px] border border-transparent hover:border-[#8B8A7D] hover:bg-[linear-gradient(to_bottom,#fffdf5_0%,#f1ebd5_100%)] active:translate-y-px flex items-center gap-[5px] text-[13px] text-[#2d3a6c]">
                  <Image
                    src="/images/folders.png"
                    alt={`${item} icon`}
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                  <span>{item}</span>
                </button>
                {index === 1 && (
                  <div className="mx-[6px] h-[22px] w-px bg-[#A7A694] shadow-[1px_0_0_#FFFFFF]" />
                )}
              </div>
            ))}

            <button className="ml-auto h-[24px] w-[23px] rounded-[2px] border border-[#8B8A7D] bg-[linear-gradient(to_bottom,#fffdf5_0%,#e8e2cc_100%)] text-[10px] leading-none text-[#2f4e99]">
              ▼
            </button>
          </div>

          <div className="h-[31px] bg-[#ECE9D8] shadow-[inset_0_1px_0_#FFFFFF,inset_0_-1px_0_#ACA899] flex items-center px-[6px] gap-[6px]">
            <div className="h-[22px] min-w-[68px] px-[8px] text-[12px] text-[#5f5e57] bg-[#ECE9D8] border border-[#B9B7AB] shadow-[inset_1px_1px_0_#FFFFFF,inset_-1px_-1px_0_#DAD8CB] flex items-center">
              Address
            </div>

            <div className="h-[22px] flex-1 bg-white border border-[#7F9DB9] shadow-[inset_0_1px_0_#D8E6F9] flex items-center">
              <Image
                src="/images/folders.png"
                alt="Address icon"
                width={16}
                height={16}
                className="ml-1 mr-1.5"
              />
              <span className="text-[13px] text-[#1b1b1b]">My Computer</span>

              <button className="ml-auto h-full w-[20px] border-l border-[#A6A9B6] bg-[linear-gradient(to_bottom,#f9f9fb_0%,#dfe3ea_100%)] text-[10px] text-[#2f4e99] leading-none">
                ▼
              </button>
            </div>

            <button className="h-[24px] px-[9px] rounded-[2px] border border-[#8B8A7D] bg-[linear-gradient(to_bottom,#fffdf5_0%,#e7e1cb_100%)] text-[13px] text-[#2f4e99]">
              Go
            </button>
          </div>

          <div className="flex-1 p-4 text-black text-sm bg-white">
            Content
          </div>

        </div>
      </div>
    </div>
  );
}
