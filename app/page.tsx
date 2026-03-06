"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import MyAccomplishments from "./components/MyAccomplishments";
import MyComputer from "./components/MyComputer";
import MyProjects from "./components/MyProjects";
import Navbar from "./components/Navbar";

type WindowKey = "myComputer" | "myProjects" | "myAccomplishments";

export default function Home() {
  const [myComputerState, setMyComputerState] = useState<
    "closed" | "open" | "minimized"
  >("closed");
  const zCounterRef = useRef(30);
  const [windowZOrder, setWindowZOrder] = useState<Record<WindowKey, number>>({
    myComputer: 10,
    myProjects: 20,
    myAccomplishments: 30,
  });

  const bringToFront = (windowKey: WindowKey) => {
    zCounterRef.current += 1;
    setWindowZOrder((previous) => ({
      ...previous,
      [windowKey]: zCounterRef.current,
    }));
  };

  const toggleMyComputer = () => {
    setMyComputerState((prev) => {
      if (prev === "open") return "minimized";
      bringToFront("myComputer");
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
          zIndex={windowZOrder.myComputer}
          onBringToFront={() => bringToFront("myComputer")}
        />
      )}

      <MyProjects
        zIndex={windowZOrder.myProjects}
        onBringToFront={() => bringToFront("myProjects")}
      />
      <MyAccomplishments
        zIndex={windowZOrder.myAccomplishments}
        onBringToFront={() => bringToFront("myAccomplishments")}
      />


      <Navbar
        myComputerState={myComputerState}
        toggleMyComputer={toggleMyComputer}
      />
    </div>
  );
}
