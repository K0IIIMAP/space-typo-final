"use client";
import { PlayIcon } from "@radix-ui/react-icons";

import React, { useState } from "react";
import DemoDialog from "./demo-dialog";

export default function Demo() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <button
        className="w-full mt-10  relative flex justify-center"
        onClick={() => setDialogIsOpen(true)}
      >
        <video src="/final clipped demo.mp4" autoPlay loop muted>
          Your browser does not support the video tag.
        </video>
        <span className="absolute bottom-[10px] flex cursor-pointer items-center py-2 px-3 bg-black/80 animate-scale-pulse">
          Try out the demo <PlayIcon className="ml-1" />
        </span>
      </button>
      <DemoDialog dialogIsOpen={dialogIsOpen} />
    </>
  );
}
