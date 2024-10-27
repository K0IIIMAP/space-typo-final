import { cn } from "@/lib/utils";

import { LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Challenge } from "../challenges/page";
type Mode = {
  id: number;
  title: string;
  approximately: number;
  description: string;
  text: string;
  createdAt: Date;
};
export default function Card({
  mode,
  challenge,
  fourth,
  isLocked,
}: {
  mode?: Mode;
  challenge?: Challenge;
  fourth?: boolean;
  challengesCompleted?: number;
  isLocked?: boolean;
}) {
  const item = mode || challenge; // Either mode or challenge

  if (!item) {
    return null; // Render nothing if neither mode nor challenge is provided
  }

  const slug = item.title.toLowerCase();
  const time = mode
    ? `${mode.approximately} mins`
    : `${challenge?.timeLimit} secs`;

  return (
    <>
      {!isLocked ? (
        <div
          className={cn(
            ` border border-white border-opacity-50 w-[280px] h-[330px]  font-sans text-base flex flex-col overflow-hidden p-4 relative rounded-lg transition-all duration-300 ease-in-out group hover:translate-y-[-20px]`,
            {
              "border-accent border-opacity-100": fourth,
            }
          )}
        >
          <p className="text-xl text-center">{item.title}</p>
          {challenge && (
            <p className="pt-1 flex justify-between text-[16px]">
              Difficulty: <span>{challenge.difficulty}</span>
            </p>
          )}

          <p className="pt-3 flex justify-between text-[16px]">
            {mode ? "Approximately" : "Time Limit"} <span>{time}</span>
          </p>

          <Link
            href={`/${challenge ? "challenge" : "mode"}/${slug}`}
            className="mt-12 bg-transparent border border-white/50 text-white px-4 py-2 text-lg outline-none cursor-pointer w-[40%] self-center transition-all duration-300 ease-in-out hover:scale-105"
          >
            Launch
          </Link>

          <div className=" absolute left-0 bottom-0  translate-y-[100%] bg-white/10 opacity-90 p-2 text-left  duration-400 ease-in-out  group-hover:translate-y-0 duration-300">
            {item.description}
          </div>
        </div>
      ) : (
        <div className="w-[280px] h-[330px] border border-white/50 flex flex-center flex-col rounded-lg">
          {/* <p className="text-[18px] text-center w-full mt-5">{item.title}</p> */}

          <LockClosedIcon className="w-full h-[100px] mt-24" />
        </div>
      )}
    </>
  );
}
