"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import MyComputer from "./components/MyComputer";
import Image from "next/image";

export default function Home() {
  const [myComputerState, setMyComputerState] = useState<
    "closed" | "open" | "minimized"
  >("closed");

  const toggleMyComputer = () => {
    setMyComputerState((prev) => {
      if (prev === "open") return "minimized";
      return "open";
    });
  };

  const minimizeMyComputer = () => {
    setMyComputerState("minimized");
  };

  const closeMyComputer = () => {
    setMyComputerState("closed");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      <Image
        src="/images/bliss.jpg"
        alt="Windows XP Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {myComputerState === "open" && (
        <MyComputer
          onMinimize={minimizeMyComputer}
          onClose={closeMyComputer}
        />
      )}


      <Navbar
        myComputerState={myComputerState}
        toggleMyComputer={toggleMyComputer}
      />

    </div>
  );
}
