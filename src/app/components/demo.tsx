"use client";
import { PlayIcon } from "@radix-ui/react-icons";

import React, { useState } from "react";
import DemoDialog from "./demo-dialog";
import { useSession } from "next-auth/react";

export default function Demo() {
  const session = useSession();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <button className="w-full mt-10  relative flex justify-center cursor-auto">
        <video src="/final clipped demo.mp4" autoPlay loop muted>
          Your browser does not support the video tag.
        </video>
        {!session.data?.user && (
          <span
            className="ping text-[14px] absolute bottom-[10px] flex cursor-pointer items-center py-2 px-3 bg-black/80 animate-scale-pulse"
            onClick={() => setDialogIsOpen(true)}
          >
            Try out the demo <PlayIcon className="mx-1" /> ( 1 min )
          </span>
        )}
      </button>
      <DemoDialog dialogIsOpen={dialogIsOpen} />
    </>
  );
}
