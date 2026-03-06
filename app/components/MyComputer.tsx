"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MyComputerProps {
  onMinimize: () => void;
  onClose: () => void;
  zIndex: number;
  onBringToFront: () => void;
}

function ToolbarArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8.5" cy="8.5" r="7.5" fill="#c6c6c6" stroke="#b2b1aa" />
      <circle cx="8.5" cy="8.5" r="6.5" fill="#d7d7d7" />
      <path
        d={
          direction === "left"
            ? "M10.8 5.2L6.7 8.5L10.8 11.8V5.2Z"
            : "M6.2 5.2L10.3 8.5L6.2 11.8V5.2Z"
        }
        fill="#ffffff"
      />
    </svg>
  );
}

export default function MyComputer({
  onMinimize,
  onClose,
  zIndex,
  onBringToFront,
}: MyComputerProps) {
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
        zIndex,
      }
    : {
        left: position.x,
        top: position.y,
        width: 720,
        height: 480,
        zIndex,
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
  const toolbarItems = ["back", "forward", "search", "folders"] as const;
  const sidebarLinkClass =
    "ml-2 flex min-h-[20px] items-center gap-[5px] text-[10px] font-semibold leading-none text-[#81abe8]";

  return (
    <div
      className="absolute"
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

          <div
            onMouseDown={handleMouseDown}
            className="
              h-[36px]
              bg-[linear-gradient(to_bottom,#94b1e9_0%,#7a97df_17%,#7a96df_36%,#7c9ae2_50%,#82a9e9_75%,#81a6e8_83%,#c8d0e5_100%)]
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
                className={captionButtonClass}
              >
                  <span className="h-[8px] w-[9px] border-[2px] border-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
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
                className="px-[8px] py-[1px] leading-none text-[#cec8c0] hover:bg-[#316AC5] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="h-[36px] bg-[#ECE9D8] shadow-[inset_0_1px_0_#F9F7EE,inset_0_-1px_0_#ACA899] flex items-center px-[6px] gap-[4px]">
            {toolbarItems.map((item) => (
              <div key={item} className="flex items-center">
                {item === "back" && (
                  <button
                    aria-label="Back"
                    className="h-[26px] rounded-[2px] border border-transparent px-[7px] text-[13px] font-semibold text-[#8d8d8d] hover:border-[#8B8A7D] hover:bg-[linear-gradient(to_bottom,#fffdf5_0%,#f1ebd5_100%)] active:translate-y-px flex items-center gap-[5px]"
                  >
                    <ToolbarArrowIcon direction="left" />
                    <span>Back</span>
                  </button>
                )}

                {item === "forward" && (
                  <button
                    aria-label="Forward"
                    className="h-[26px] w-[26px] rounded-[2px] border border-transparent text-[13px] text-[#8d8d8d] hover:border-[#8B8A7D] hover:bg-[linear-gradient(to_bottom,#fffdf5_0%,#f1ebd5_100%)] active:translate-y-px flex items-center justify-center"
                  >
                    <ToolbarArrowIcon direction="right" />
                  </button>
                )}

                {(item === "search" || item === "folders") && (
                  <button className="h-[26px] px-[8px] rounded-[2px] border border-transparent hover:border-[#8B8A7D] hover:bg-[linear-gradient(to_bottom,#fffdf5_0%,#f1ebd5_100%)] active:translate-y-px flex items-center gap-[5px] text-[13px] text-[#2d3a6c]">
                    <Image
                      src={item === "search" ? "/images/Search.ico" : "/images/icons/37.ico"}
                      alt={item === "search" ? "Search icon" : "Folders icon"}
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    <span>{item === "search" ? "Search" : "Folders"}</span>
                  </button>
                )}

                {item === "forward" && (
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
                src="/images/mycomputer.ico"
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
            <div
              className="
              mt-[-16px]
              ml-[-16px]
              h-[750px]
              w-1/3
              bg-[linear-gradient(to_bottom,#a0b4d3_0%,#7aa0e6_6%,#789de4_18%,#7497e2_40%,#6f8fde_62%,#6a87db_82%,#657dd9_100%)]
              flex flex-col
              items-center"
            >
              <div className="
              mt-5
              h-[90px]
              rounded-tr-[4px] rounded-tl-[4px]
              w-[170px]
              bg-[#d6dff7]
              "
              >
                <div className="
                w-full
                h-[20px]
                mb-[3px]
                bg-[linear-gradient(to_right,#ffffff_50%,#c6d3f6_100%)]
                rounded-tr-[4px] rounded-tl-[4px]
                flex items-center justify-between pl-2 pr-[3px]
                ">
                  <h2
                    className="text-[13px] text-[#779cdb] font-bold"
                  >System Tasks</h2>
                  <Image
                    src="/images/pulldown.webp"
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                    className="h-[16px] w-[16px] shrink-0"
                  />
                </div>
                <button
                  className={sidebarLinkClass}>
                  <Image
                    src="/images/System Info.ico"
                    alt="System Properties icon"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>View system information</span>
                </button>
                <button
                  className={sidebarLinkClass}>
                  <Image
                    src="/images/Add Remove.ico"
                    alt="Disk Image File icon"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Add or remove programs</span>
                </button>
                <button
                  className={sidebarLinkClass}>
                  <Image
                    src="/images/Settings & Control.ico"
                    alt="Change Setting icon"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Change a setting</span>
                </button>
              </div>
              <div>
                <div className="
                mt-5
                h-[120px]
                rounded-tr-[4px] rounded-tl-[4px]
                w-[170px]
                bg-[#d6dff7]
                "
                >
                  <div className="
                  w-full
                  h-[20px]
                  mb-[3px]
                  bg-[linear-gradient(to_right,#ffffff_50%,#c6d3f6_100%)]
                  rounded-tr-[4px] rounded-tl-[4px]
                  flex items-center justify-between pl-2 pr-[3px]
                  ">
                    <h2
                      className="text-[13px] text-[#779cdb] font-bold"
                    >Other Places</h2>
                    <Image
                      src="/images/pulldown.webp"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="h-[16px] w-[16px] shrink-0"
                    />
                  </div>

                  <button
                    className={sidebarLinkClass}>
                    <Image
                      src="/images/My Network Places.ico"
                      alt="My Network Places icon"
                      width={18}
                      height={18}
                      className="shrink-0"
                    />
                    <span>My Network Places</span>
                  </button>
                  <button
                    className={sidebarLinkClass}>
                    <Image
                      src="/images/My Documents.ico"
                      alt="My Documents icon"
                      width={18}
                      height={18}
                      className="shrink-0"
                    />
                    My Documents
                  </button>
                  <button
                    className={sidebarLinkClass}>
                    <Image
                      src="/images/Shared Documents.ico"
                      alt="Shared Documents icon"
                      width={18}
                      height={18}
                      className="shrink-0"
                    />
                    Shared Documents
                  </button>
                  <button
                    className={sidebarLinkClass}>
                    <Image
                      src="/images/Settings & Control.ico"
                      alt="Control Panel icon"
                      width={18}
                      height={18}
                      className="shrink-0"
                    />
                    Control Panel
                  </button>
                </div>

                <div className="
                mt-5
                h-[70px]
                rounded-tr-[4px] rounded-tl-[4px]
                w-[170px]
                bg-[#d6dff7]
                ">
                  <div className="
                  w-full
                  h-[20px]
                  bg-[linear-gradient(to_right,#ffffff_50%,#c6d3f6_100%)]
                  rounded-tr-[4px] rounded-tl-[4px]
                  flex items-center justify-between pl-2 pr-[3px]
                  ">
                    <h2
                      className="text-[13px] text-[#779cdb] font-bold"
                    >
                      Details
                    </h2>
                    <Image
                      src="/images/pulldown.webp"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="h-[16px] w-[16px] shrink-0"
                    />
                  </div>
                  <p className="text-[10px] font-semibold mt-2 ml-2 text-[#000]">
                    My Computer
                  </p>
                  <p className="text-[10px] ml-2 text-[#000]">
                    System Folder
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
