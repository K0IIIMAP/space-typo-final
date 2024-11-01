import React from "react";

import Navbar from "./navbar";

export default async function Header() {
  return (
    <header className="flex justify-between px-[5%] min-h-[80px] max-sm:min-h-[85px] items-center   border-b border-white/20 max-sm:flex-col max-sm:justify-center">
      <Navbar></Navbar>
    </header>
  );
}
