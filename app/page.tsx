"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import MineSweeper from "./components/Minesweeper";
import MyAccomplishments from "./components/MyAccomplishments";
import MyActivityFeeds from "./components/MyActivityFeeds";
import MyComputer from "./components/MyComputer";
import MyJourney from "./components/MyJourney";
import MyProjects from "./components/MyProjects";
import MySocials from "./components/MySocials";
import Navbar from "./components/Navbar";
import type { TaskbarWindow, WindowState } from "./components/windowTypes";

export default function Home() {
  const [windowState, setWindowState] = useState<Record<TaskbarWindow, WindowState>>({
    myComputer: "closed",
    myProjects: "open",
    myJourney: "closed",
    mySocials: "closed",
    myActivityFeeds: "closed",
    myAccomplishments: "open",
    minesweeper: "open",
  });

  const zCounterRef = useRef(70);
  const [windowZOrder, setWindowZOrder] = useState<Record<TaskbarWindow, number>>({
    myComputer: 10,
    myProjects: 20,
    myJourney: 30,
    mySocials: 40,
    myActivityFeeds: 50,
    myAccomplishments: 60,
    minesweeper: 70,
  });

  const bringToFront = (windowKey: TaskbarWindow) => {
    zCounterRef.current += 1;
    setWindowZOrder((previous) => ({
      ...previous,
      [windowKey]: zCounterRef.current,
    }));
  };

  const openWindow = (windowKey: TaskbarWindow) => {
    bringToFront(windowKey);
    setWindowState((previous) => ({
      ...previous,
      [windowKey]: "open",
    }));
  };

  const toggleWindow = (windowKey: TaskbarWindow) => {
    const currentState = windowState[windowKey];
    if (currentState !== "open") {
      bringToFront(windowKey);
    }

    setWindowState((previous) => ({
      ...previous,
      [windowKey]: previous[windowKey] === "open" ? "minimized" : "open",
    }));
  };

  const minimizeWindow = (windowKey: TaskbarWindow) => {
    setWindowState((previous) => ({
      ...previous,
      [windowKey]: "minimized",
    }));
  };

  const closeWindow = (windowKey: TaskbarWindow) => {
    setWindowState((previous) => ({
      ...previous,
      [windowKey]: "closed",
    }));
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/images/bliss.jpg"
        alt="Windows XP Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {windowState.myComputer === "open" && (
        <MyComputer
          onMinimize={() => minimizeWindow("myComputer")}
          onClose={() => closeWindow("myComputer")}
          zIndex={windowZOrder.myComputer}
          onBringToFront={() => bringToFront("myComputer")}
        />
      )}

      {windowState.myProjects === "open" && (
        <MyProjects
          zIndex={windowZOrder.myProjects}
          onBringToFront={() => bringToFront("myProjects")}
          onMinimize={() => minimizeWindow("myProjects")}
          onClose={() => closeWindow("myProjects")}
        />
      )}

      {windowState.myJourney === "open" && (
        <MyJourney
          zIndex={windowZOrder.myJourney}
          onBringToFront={() => bringToFront("myJourney")}
          onMinimize={() => minimizeWindow("myJourney")}
          onClose={() => closeWindow("myJourney")}
        />
      )}

      {windowState.mySocials === "open" && (
        <MySocials
          zIndex={windowZOrder.mySocials}
          onBringToFront={() => bringToFront("mySocials")}
          onMinimize={() => minimizeWindow("mySocials")}
          onClose={() => closeWindow("mySocials")}
        />
      )}

      {windowState.myActivityFeeds === "open" && (
        <MyActivityFeeds
          zIndex={windowZOrder.myActivityFeeds}
          onBringToFront={() => bringToFront("myActivityFeeds")}
          onMinimize={() => minimizeWindow("myActivityFeeds")}
          onClose={() => closeWindow("myActivityFeeds")}
        />
      )}

      {windowState.myAccomplishments === "open" && (
        <MyAccomplishments
          zIndex={windowZOrder.myAccomplishments}
          onBringToFront={() => bringToFront("myAccomplishments")}
          onMinimize={() => minimizeWindow("myAccomplishments")}
          onClose={() => closeWindow("myAccomplishments")}
        />
      )}

      {windowState.minesweeper === "open" && (
        <MineSweeper
          zIndex={windowZOrder.minesweeper}
          onBringToFront={() => bringToFront("minesweeper")}
          onMinimize={() => minimizeWindow("minesweeper")}
          onClose={() => closeWindow("minesweeper")}
        />
      )}

      <Navbar windows={windowState} toggleWindow={toggleWindow} openWindow={openWindow} />
    </div>
  );
}
