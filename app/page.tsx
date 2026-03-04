"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import MyComputer from "./components/MyComputer";
import Image from "next/image";

export default function Home() {
  const [myComputerOpen, setMyComputerOpen] = useState(false);

  const toggleMyComputer = () => {
    setMyComputerOpen((prev) => !prev);
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

      {myComputerOpen && (
        <MyComputer onMinimize={toggleMyComputer} />
      )}

      <Navbar
        myComputerOpen={myComputerOpen}
        toggleMyComputer={toggleMyComputer}
      />

    </div>
  );
}