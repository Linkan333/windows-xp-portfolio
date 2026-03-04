"use client"
import Image from "next/image";
import { useState } from "react";

interface Navbarprops {
  myComputerOpen: boolean;
  toggleMyComputer: () => void;
}

export default function Navbar({
  myComputerOpen,
  toggleMyComputer,
}: Navbarprops) {
    const [startOpen, setStartOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    let time: Date = new Date()
    let h: string|number = new Date(time).getHours();
    let m: string|number = new Date(time).getMinutes();

    h = (h<10) ? '0' + h : h;
    m = (m<10) ? '0' + m : m;
    var output = h + ':' + m;
    return (
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
      <button
      onClick={() => setStartOpen(!startOpen)}
        className="
          h-full px-6 flex items-center gap-3
          rounded-r-3xl
          border-r border-[#1f5f1a]
          bg-gradient-to-r from-[#3a8f2e] via-[#4ea43d] to-[#2f7d25]
          shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.4),0_1px_1px_rgba(0,0,0,0.6)]
          active:translate-y-[1px]
          active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]
          active:bg-gradient-to-r
          active:from-[#2f7d25]
          active:via-[#3f9835]
          active:to-[#276d20]
          transition-none
        "
      >
        <Image
          src="/images/windows-xp-logo.svg"
          alt="Windows XP Logo"
          width={34}
          height={34}
        />
        <span className="text-white font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
          Start
        </span>
      </button>
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
      onClick={() => setActive(active === "my-computer" ? null : "my-computer")}
      className={`
      flex items-center gap-2
      transition-all duration-0
      ${active === "my-computer" ? "w-44 px-4 h-9" : "w-10 h-9 justify-center"}
      rounded-md
      ${
        active === "my-computer"
          ? "bg-[linear-gradient(to_right,#2f66c9_0%,#3f7ff0_50%,#2c5db5_100%)] border border-[#244c96] shadow-[inset_0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]"
          : "bg-transparent border border-transparent shadow-none hover:bg-[#3f75d6]/40"
          }
      `}
      ><Image src="/images/mycomputer.ico" alt="My Computer" width={30} height={30}/>
      {active === "my-computer" && (
        <span className="text-white text-sm font-semibold truncate">My Computer</span>
      )}</button>

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
  );
}
