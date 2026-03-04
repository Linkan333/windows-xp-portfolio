"use client"
import Image from "next/image";
import { useState } from "react";
import StartMenu from "./StartMenu";

interface Navbarprops {
  myComputerState: "closed" | "open" | "minimized";
  toggleMyComputer: () => void;
}

export default function Navbar({
  myComputerState,
  toggleMyComputer,
}: Navbarprops) {
    const [startOpen, setStartOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    const time: Date = new Date()
    let h: string|number = new Date(time).getHours();
    let m: string|number = new Date(time).getMinutes();

    h = (h<10) ? '0' + h : h;
    m = (m<10) ? '0' + m : m;
    const output = h + ':' + m;
    const myComputerRunning = myComputerState !== "closed";
    const myComputerOpen = myComputerState === "open";
    return (
    <>
      {startOpen && <StartMenu />}
      <div
        className="
          fixed bottom-0 left-0 w-full h-12
          bg-gradient-to-b
          from-[#3a6fd8]
          via-[#245edb]
          to-[#1941a5]
          border-t border-[#6ea0ff]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]
          flex items-center
        "
      >
        <div className="relative h-full w-[172px] shrink-0">
          <button
            onClick={() => setStartOpen(!startOpen)}
            className="relative z-10 h-full w-full
                      pl-3 pr-8
                      flex items-center justify-start gap-2
                      bg-gradient-to-r from-[#3a8f2e] via-[#4ea43d] to-[#2f7d25]
                      shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.4),0_1px_1px_rgba(0,0,0,0.6)]
                      active:translate-y-[1px]
                      active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]
                      active:bg-gradient-to-r
                      active:from-[#2f7d25]
                      active:via-[#3f9835]
                      active:to-[#276d20]
                      transition-none"
          >
            <Image
              src="/images/windows-xp-logo.svg"
              alt="Windows XP Logo"
              width={0}
              height={0}
              className="h-[1.2em] w-auto"
            />

            <span
              className="
        text-white
        font-semibold
        text-[1.30rem]
        leading-none
        drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]
      "
            >
              Start
            </span>
          </button>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[46px]
                      bg-gradient-to-b
                      from-[#3a6fd8]
                      via-[#245edb]
                      to-[#1941a5]
                      [--notch:38px]
                      [--notch-x:8px]
                      [-webkit-mask:radial-gradient(circle_var(--notch)_at_var(--notch-x)_50%,transparent_0_calc(var(--notch)-.5px),#000_calc(var(--notch)+.5px))]
                      [mask:radial-gradient(circle_var(--notch)_at_var(--notch-x)_50%,transparent_0_calc(var(--notch)-.5px),#000_calc(var(--notch)+.5px))]"
          />
        </div>
      <div className="w-5"></div>

      <button
        onClick={() => setActive(active === "minesweeper" ? null : "minesweeper")}
        className={`
          flex items-center gap-2
          transition-all duration-0
          ${active === "minesweeper" ? "w-44 px-4 h-9" : "w-10 h-9 justify-center"}
          rounded-md
          ${
            active === "minesweeper"
              ? "bg-[linear-gradient(to_right,#2f66c9_0%,#3f7ff0_50%,#2c5db5_100%)] border border-[#244c96] shadow-[inset_0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]"
              : "bg-transparent border border-transparent shadow-none hover:bg-[#3f75d6]/40"
          }
        `}
      >
        <Image src="/images/minesweeper.ico" alt="Minesweeper" width={40} height={40} />
        {active === "minesweeper" && (
          <span className="text-white text-sm font-semibold truncate">
            Minesweeper
          </span>
        )}
      </button>

      <button
        onClick={toggleMyComputer}
        className={`
          relative flex items-center gap-2 overflow-hidden rounded-[3px] transition-none
          ${myComputerRunning ? "my-[3px] self-stretch" : "h-9"}
          ${myComputerRunning ? "w-[162px] px-[10px] justify-start" : "w-10 justify-center"}
          ${
            myComputerOpen
              ? "border border-[#1f4f9b] bg-[linear-gradient(to_bottom,#74a0f6_0%,#4f87ea_16%,#2f66cf_55%,#2759bd_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_2px_4px_rgba(0,0,0,0.22)]"
              : myComputerRunning
                ? "border border-[#3e73ca] bg-[linear-gradient(to_bottom,#6f9df0_0%,#4b84e8_18%,#2e67cf_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_1px_0_rgba(0,0,0,0.24)]"
                : "border border-transparent bg-transparent shadow-none hover:bg-[#3f75d6]/40"
          }
        `}
      >
        {myComputerRunning && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-[45%] ${
              myComputerOpen
                ? "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0.02))]"
                : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.08))]"
            }`}
          />
        )}
        <Image
          src="/images/mycomputer.ico"
          alt="My Computer"
          width={30}
          height={30}
          className="relative z-10"
        />
        {myComputerRunning && (
          <span className="relative z-10 text-white text-sm font-semibold truncate [text-shadow:1px_1px_0_rgba(0,0,0,0.35)]">
            My Computer
          </span>
        )}
      </button>

      <div className="flex-1"></div>

      
      <div
        className="
          h-full px-6 flex items-center
          bg-gradient-to-b
          from-[#3c7cf4]
          via-[#2f6de1]
          to-[#1c4fbf]
          border-l border-[#163c9c]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.4)]
          text-white text-sm font-semibold
        "
      >
        {output}
      </div>
      </div>
    </>
  );
}
