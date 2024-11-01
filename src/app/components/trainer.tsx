"use client";
import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./progress-bar";
import Timer from "./timer";
import TypedText from "./typed-text";
import TextToType from "./text-to-type";
import useTabloidContext, { useSettingsContext } from "@/lib/hooks";
import Tabloid from "./tabloid";
import { DropFont } from "./drop-fonts";
import { DropTheme } from "./drop-theme";
import { DropSound } from "./drop-sound";
import { cn } from "@/lib/utils";
import ThemeChanger from "@/app/components/theme-changer";
import { playKeySound } from "@/lib/helpers";
import Modal from "./modal";
import { usePathname } from "next/navigation";

type TrainerProps = {
  text: string;
  timeLimit?: number;
  demo?: boolean;
};

export default function Trainer({ text, timeLimit, demo }: TrainerProps) {
  const currentPath = usePathname();
  const isChallenge = currentPath.includes("challenge");

  // to do - if challenge is easy and completed is 0 - +1, if is normal and  completed 1 +1, and so on
  const textWithNoSpaces = text.replace(/ /g, "\u00A0");
  // state

  const [textToType, setTextToType] = useState(textWithNoSpaces);
  const [typedText, setTypedText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]); // Use useRef for audio references

  //derived

  const progress = (typedText.length / text.length) * 100;
  // contexts
  const { totalSecs, setCpm, setMistakes, isExpired, setTotalSecs } =
    useTabloidContext();
  const { font, sounds } = useSettingsContext();

  useEffect(() => {
    // reset on unmount cuz it is use state for whole app
    setCpm(0);
    setMistakes(0);
    setTotalSecs(0);
  }, []); // Watch the current path

  useEffect(() => {
    audioRefs.current = [
      new Audio("/soundpack1/key1.wav"),
      new Audio("/soundpack1/key2.wav"),
      new Audio("/soundpack1/key3.wav"),
      new Audio("/soundpack1/key4.wav"),
      new Audio("/soundpack1/key5.wav"),
      new Audio("/soundpack1/key6.wav"),
      new Audio("/soundpack1/space2.wav"),
      new Audio("/soundpack1/shift.wav"),
      new Audio("/soundpack2/1.wav"),
      new Audio("/soundpack2/2.wav"),
    ];
  }, []);

  // Use effects
  useEffect(() => {
    // to count cpm when text changes
    if (typedText.length && totalSecs > 0) {
      setCpm(+((typedText.length / totalSecs) * 60).toFixed());
    }
  }, [typedText.length, totalSecs]);

  useEffect(() => {
    if (isExpired) {
      setIsActive(false);
      setModalIsOpen(true);
      return;
    }
  }, [totalSecs]);

  useEffect(() => {
    // to check if we finished
    if (progress === 100) {
      setIsActive(false);
      setModalIsOpen(true);

      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      let typedChar = e.key;

      playKeySound(typedChar, audioRefs, sounds);

      if (typedChar === " ") typedChar = "\u00A0"; // to replace the space with a keycode
      if (typedChar !== textToType[0]) {
        if (isActive) {
          setMistakes((prev) => prev + 1);
        }
        return;
      }

      setIsActive(true);
      setTypedText((prev) => prev + typedChar);
      setTextToType((prev) => prev.slice(1));
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [textToType]);

  const getMessage = () => {
    if (isExpired) {
      return "Unfortunately time has expired. Try again later";
    } else if (!textToType.length && isChallenge) {
      return "Congratulations! You have completed the Challenge!";
    } else if (!textToType.length) {
      return "Congratulations! You have completed the Mode!";
    } else {
      return "";
    }
  };

  return (
    <main className="flex flex-col w-[90%] mx-auto">
      <Modal
        modalIsOpen={modalIsOpen}
        message={getMessage()}
        isChallenge={isChallenge}
        setModalIsOpen={setModalIsOpen}
        progress={progress}
        currentPath={currentPath}
      />
      <ThemeChanger />
      {/* Audio elements are now managed in useRef */}
      <div className="text-center">
        <Timer
          isActive={isActive}
          timeLimit={timeLimit}
          setIsActive={setIsActive}
        />
      </div>
      <div className="flex justify-center md:justify-between mb-2 flex-wrap  ">
        <div className="flex gap-x-2 relative  flex-wrap max-sm:gap-2 max-sm:justify-center">
          <DropFont />
          {!demo && <DropTheme />}
          <DropSound />
        </div>
        <div className="flex gap-x-3 items-center">
          <Tabloid />
        </div>
      </div>

      <div
        className={`w-full mx-auto h-[100px] bg-black border-2 border-black relative flex  overflow-hidden z-1 text-zinc-300 `}
      >
        <div
          className={cn(`h-full`, {
            "font-poppins": font === "poppins",
            "font-courier": font === "courier",
            "font-sofadi": font === "sofadiOne",
          })}
        >
          <TypedText typedText={typedText} />

          <TextToType textToType={textToType} />
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} />
      </div>
    </main>
  );
}
