"use client";

export default function StartMenu() {
  return (
    <div
      className="
        fixed bottom-18 left-0 z-30
        h-[620px] w-[480px]
        rounded-t-[8px]
        bg-[#ece9d8]
        shadow-[6px_0_16px_rgba(0,0,0,0.38)]
      "
    >
      <div
        className="
          rounded-t-[8px]
          absolute top-0 left-0 z-31
          h-[120px] w-full
          bg-gradient-to-b from-[#1D6BD0] to-[#4691EA]
        "></div>
    </div>
  );
}
