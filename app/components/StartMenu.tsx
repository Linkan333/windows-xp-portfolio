"use client";

import Image from "next/image";

export default function StartMenu() {
  return (
    <div className="fixed bottom-21 left-15 z-30">
      <div
        className="
          h-[620px] w-[480px]
          p-[3px]
          rounded-[8px]
          bg-[linear-gradient(to_bottom,#0b4fc8_0%,#1f64dc_8%,#7fa2ef_100%)]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.75),inset_0_3px_3px_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(9,27,96,0.65),0_10px_18px_rgba(0,0,0,0.45)]
        "
          >
        <div className="relative h-full w-full rounded-t-[5px] bg-[#ECE9D8] overflow-hidden">
          
          <div
            className="
              absolute top-0 left-0
              h-[100px] w-full
              bg-gradient-to-b from-[#1D6BD0] to-[#4691EA]
            "
          >
            <div className="absolute bottom-0 left-0 w-full h-[3px]
      bg-gradient-to-r from-transparent via-[#f2a23a] to-transparent opacity-80" />

            <div
              className="
              absolute top-[5px] left-[5px]
              h-[90px] w-[90px]
              rounded-[6px]
              bg-white
              p-[2px]
              shadow-[0_1px_2px_rgba(0,0,0,0.6)]
              "
            >
              <div className="h-full w-full rounded-[4px] border border-[#1b4fa3] overflow-hidden">
                <Image
                  src="/images/profile-picture.jpeg"
                  alt="Profile Picture"
                  width={90}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <h1 className="absolute top-[35px] left-[105px] text-2xl text-white font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)]">
              Linkan333
            </h1>

            <div className="
            mt-[100px]
            ml-60
            h-[520px]
            w-1/2
            bg-[#d3e5fa]
            border-l-[2px]
            border-[#c1daf7]
            flex flex-col">
              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/1472.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Projects
              </button>
              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/312.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Journey
              </button>
              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/1111.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Socials
              </button>
              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/46.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Activity Feeds
              </button>

              <div className="my-4 h-[2px] bg-gradient-to-r from-transparent via-[#bed7f7] to-transparent"></div>

              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/mycomputer.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Computer
              </button>

              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/1018.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                Paint
              </button>
              <button
                className="ml-2 text-[#48578f] mb-2 text-left cursor-pointer">
                <Image
                  src="/images/icons/322.ico"
                  alt="My Projects"
                  width={24}
                  height={24}
                  className="inline-block mr-2"
                />
                My Accomplishments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}