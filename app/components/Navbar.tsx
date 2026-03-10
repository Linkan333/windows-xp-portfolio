"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import StartMenu from "./StartMenu";
import type { TaskbarWindow, WindowState } from "./windowTypes";

interface NavbarProps {
  windows: Record<TaskbarWindow, WindowState>;
  toggleWindow: (windowKey: TaskbarWindow) => void;
  openWindow: (windowKey: TaskbarWindow) => void;
}

interface TaskbarApp {
  key: TaskbarWindow;
  label: string;
  iconSrc: string;
  iconSize: number;
}

const APP_MAP: Record<TaskbarWindow, TaskbarApp> = {
  myComputer: {
    key: "myComputer",
    label: "My Computer",
    iconSrc: "/images/mycomputer.ico",
    iconSize: 30,
  },
  myProjects: {
    key: "myProjects",
    label: "My Projects",
    iconSrc: "/images/icons/1472.ico",
    iconSize: 24,
  },
  myJourney: {
    key: "myJourney",
    label: "My Journey",
    iconSrc: "/images/icons/312.ico",
    iconSize: 24,
  },
  mySocials: {
    key: "mySocials",
    label: "My Socials",
    iconSrc: "/images/icons/1111.ico",
    iconSize: 24,
  },
  myActivityFeeds: {
    key: "myActivityFeeds",
    label: "My Activity Feeds",
    iconSrc: "/images/icons/46.ico",
    iconSize: 24,
  },
  myAccomplishments: {
    key: "myAccomplishments",
    label: "My Accomplishments",
    iconSrc: "/images/icons/322.ico",
    iconSize: 24,
  },
  minesweeper: {
    key: "minesweeper",
    label: "Minesweeper",
    iconSrc: "/images/minesweeper.ico",
    iconSize: 28,
  },
};

const PINNED_KEYS: TaskbarWindow[] = [
  "myComputer",
  "myProjects",
  "myAccomplishments",
  "minesweeper",
];

const START_MENU_KEYS: TaskbarWindow[] = [
  "myJourney",
  "mySocials",
  "myActivityFeeds",
];

export default function Navbar({ windows, toggleWindow, openWindow }: NavbarProps) {
  const [startOpen, setStartOpen] = useState(false);
  const time = new Date();
  const output = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const taskbarApps = useMemo(() => {
    const dynamicRunning = START_MENU_KEYS.filter((windowKey) => windows[windowKey] !== "closed");
    return [...PINNED_KEYS, ...dynamicRunning].map((windowKey) => APP_MAP[windowKey]);
  }, [windows]);

  const handleStartMenuOpenWindow = (windowKey: TaskbarWindow) => {
    openWindow(windowKey);
    setStartOpen(false);
  };

  return (
    <div className="fixed bottom-13 left-22 z-30 w-[93vw]">
      {startOpen && (
        <StartMenu
          openWindow={handleStartMenuOpenWindow}
          onClose={() => setStartOpen(false)}
        />
      )}

      <div className="relative h-12 overflow-hidden rounded-b-[26px] border-t border-[#6ea0ff] bg-gradient-to-b from-[#3a6fd8] via-[#245edb] to-[#1941a5] shadow-lg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[1.1%] bottom-[-0.45rem] z-0 h-7 rounded-b-[999px] bg-[#1652d9]"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="relative h-full w-[172px] shrink-0">
            <button
              type="button"
              onClick={() => setStartOpen((previous) => !previous)}
              className="relative z-10 flex h-full w-full items-center justify-start gap-2 bg-gradient-to-r from-[#3a8f2e] via-[#4ea43d] to-[#2f7d25] pl-3 pr-8 shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.4),0_1px_1px_rgba(0,0,0,0.6)] transition-none active:translate-y-[1px] active:bg-gradient-to-r active:from-[#2f7d25] active:via-[#3f9835] active:to-[#276d20] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              <Image
                src="/images/windows-xp-logo.svg"
                alt="Windows XP Logo"
                width={20}
                height={20}
                className="h-[1.2em] w-auto"
              />
              <span className="text-[1.3rem] font-semibold leading-none text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                Start
              </span>
            </button>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[46px] bg-gradient-to-b from-[#3a6fd8] via-[#245edb] to-[#1941a5] [--notch:38px] [--notch-x:8px] [-webkit-mask:radial-gradient(circle_var(--notch)_at_var(--notch-x)_50%,transparent_0_calc(var(--notch)-.5px),#000_calc(var(--notch)+.5px))] [mask:radial-gradient(circle_var(--notch)_at_var(--notch-x)_50%,transparent_0_calc(var(--notch)-.5px),#000_calc(var(--notch)+.5px))]"
            />
          </div>

          <div className="w-5 shrink-0" />

          {taskbarApps.map((app) => {
            const isRunning = windows[app.key] !== "closed";
            const isOpen = windows[app.key] === "open";

            return (
              <button
                key={app.key}
                type="button"
                onClick={() => toggleWindow(app.key)}
                className={`
                  relative mr-1 flex items-center gap-2 overflow-hidden rounded-[3px] transition-none
                  ${isRunning ? "my-[3px] w-[148px] self-stretch justify-start px-[10px]" : "h-9 w-10 justify-center"}
                  ${
                    isOpen
                      ? "border border-[#1f4f9b] bg-[linear-gradient(to_bottom,#74a0f6_0%,#4f87ea_16%,#2f66cf_55%,#2759bd_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_2px_4px_rgba(0,0,0,0.22)]"
                      : isRunning
                        ? "border border-[#3e73ca] bg-[linear-gradient(to_bottom,#6f9df0_0%,#4b84e8_18%,#2e67cf_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_1px_0_rgba(0,0,0,0.24)]"
                        : "border border-transparent bg-transparent shadow-none hover:bg-[#3f75d6]/40"
                  }
                `}
              >
                {isRunning && (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[45%] ${
                      isOpen
                        ? "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0.02))]"
                        : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.08))]"
                    }`}
                  />
                )}

                <Image
                  src={app.iconSrc}
                  alt={app.label}
                  width={app.iconSize}
                  height={app.iconSize}
                  className="relative z-10"
                />

                {isRunning && (
                  <span className="relative z-10 truncate text-sm font-semibold text-white [text-shadow:1px_1px_0_rgba(0,0,0,0.35)]">
                    {app.label}
                  </span>
                )}
              </button>
            );
          })}

          <div className="flex-1" />

          <div className="flex h-full items-center border-l border-[#163c9c] bg-gradient-to-b from-[#3c7cf4] via-[#2f6de1] to-[#1c4fbf] px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.4)]">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}
