"use client";

import Image from "next/image";
import { useState } from "react";
import MyAccomplishments from "./components/MyAccomplishments";
import MyComputer from "./components/MyComputer";
import MyProjects from "./components/MyProjects";
import Navbar from "./components/Navbar";

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

      <MyProjects />
      <MyAccomplishments />


      <Navbar
        myComputerState={myComputerState}
        toggleMyComputer={toggleMyComputer}
      />
    </div>
  );
}
