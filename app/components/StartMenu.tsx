"use client";

import Image from "next/image";
import type { TaskbarWindow } from "./windowTypes";

interface StartMenuProps {
  openWindow: (windowKey: TaskbarWindow) => void;
  onClose: () => void;
}

interface StartMenuItem {
  label: string;
  iconSrc: string;
  windowKey: TaskbarWindow;
}

const PRIMARY_ITEMS: StartMenuItem[] = [
  { label: "My Projects", iconSrc: "/images/icons/1472.ico", windowKey: "myProjects" },
  { label: "My Journey", iconSrc: "/images/icons/312.ico", windowKey: "myJourney" },
  { label: "My Socials", iconSrc: "/images/icons/1111.ico", windowKey: "mySocials" },
  {
    label: "My Activity Feeds",
    iconSrc: "/images/icons/46.ico",
    windowKey: "myActivityFeeds",
  },
];

const SECONDARY_ITEMS: StartMenuItem[] = [
  { label: "My Computer", iconSrc: "/images/mycomputer.ico", windowKey: "myComputer" },
  { label: "Paint", iconSrc: "/images/icons/1018.ico", windowKey: "minesweeper" },
  {
    label: "My Accomplishments",
    iconSrc: "/images/icons/322.ico",
    windowKey: "myAccomplishments",
  },
];

export default function StartMenu({ openWindow, onClose }: StartMenuProps) {
  const handleOpenWindow = (windowKey: TaskbarWindow) => {
    openWindow(windowKey);
    onClose();
  };

  return (
    <div className="fixed bottom-24 left-15 z-30">
      <div
        className="
          h-[620px] w-[480px]
          rounded-[8px]
          bg-[linear-gradient(to_bottom,#0b4fc8_0%,#1f64dc_8%,#7fa2ef_100%)]
          p-[3px]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.75),inset_0_3px_3px_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(9,27,96,0.65),0_10px_18px_rgba(0,0,0,0.45)]
        "
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-[5px] bg-[#ECE9D8]">
          <div
            className="
              absolute left-0 top-0
              h-[100px] w-full
              bg-gradient-to-b from-[#1D6BD0] to-[#4691EA]
            "
          >
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#f2a23a] to-transparent opacity-80" />

            <div
              className="
                absolute left-[5px] top-[5px]
                h-[90px] w-[90px]
                rounded-[6px] bg-white p-[2px]
                shadow-[0_1px_2px_rgba(0,0,0,0.6)]
              "
            >
              <div className="h-full w-full overflow-hidden rounded-[4px] border border-[#1b4fa3]">
                <Image
                  src="/images/profile-picture.jpeg"
                  alt="Profile Picture"
                  width={90}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <h1 className="absolute left-[105px] top-[35px] text-2xl font-bold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
              Linkan333
            </h1>

            <div className="mt-[100px] ml-60 flex h-[520px] w-1/2 flex-col border-l-[2px] border-[#c1daf7] bg-[#d3e5fa]">
              {PRIMARY_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleOpenWindow(item.windowKey)}
                  className="mb-2 ml-2 text-left text-[#48578f] cursor-pointer"
                >
                  <Image
                    src={item.iconSrc}
                    alt={`${item.label} icon`}
                    width={24}
                    height={24}
                    className="mr-2 inline-block"
                  />
                  {item.label}
                </button>
              ))}

              <div className="my-4 h-[2px] bg-gradient-to-r from-transparent via-[#bed7f7] to-transparent" />

              {SECONDARY_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleOpenWindow(item.windowKey)}
                  className="mb-2 ml-2 text-left text-[#48578f] cursor-pointer"
                >
                  <Image
                    src={item.iconSrc}
                    alt={`${item.label} icon`}
                    width={24}
                    height={24}
                    className="mr-2 inline-block"
                  />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
