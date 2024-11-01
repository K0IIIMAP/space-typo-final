"use client";
import useTabloidContext from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";

import { submitData } from "@/actions/actions";

type ModalProps = {
  modalIsOpen: boolean;
  message: string;
  isChallenge: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;

  currentPath: string;
};
export default function Modal({
  modalIsOpen,
  isChallenge,
  message,
  setModalIsOpen,
  progress,
  currentPath,
}: ModalProps) {
  const router = useRouter();
  const path = usePathname();
  const onMainPage = path === "/";
  const { setIsExpired, cpm: statsCpm } = useTabloidContext();

  // Disable keyboard events when the modal is open
  useEffect(() => {
    if (modalIsOpen) {
      const disableKeyboard = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };

      document.addEventListener("keydown", disableKeyboard);
      return () => {
        document.removeEventListener("keydown", disableKeyboard);
      };
    }
  }, [modalIsOpen]);

  if (!modalIsOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center  z-[9999] text-white/80">
        <div className=" bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-w-full">
          {onMainPage ? (
            <h2 className="text-xl font-bold mb-4 text-center">
              Congratulations! Let&apos;s create an account!{" "}
            </h2>
          ) : (
            <h2 className="text-xl font-bold mb-4 text-center">{message}</h2>
          )}

          {!onMainPage ? (
            <div>
              {progress < 100 || !isChallenge ? (
                <button
                  onClick={async () => {
                    setModalIsOpen(false);
                    setIsExpired(false);
                    location.reload();
                  }}
                  className="mt-4 w-full bg-accent text-white py-2 rounded hover:scale-[1.02] transition-all"
                >
                  Again
                </button>
              ) : (
                ""
              )}
              <button
                onClick={async () => {
                  await submitData(
                    currentPath,
                    progress,
                    isChallenge,
                    statsCpm
                  );

                  setModalIsOpen(false);
                  setIsExpired(false);
                  if (isChallenge) {
                    router.push("/challenges");
                  } else {
                    router.push("/modes");
                  }
                }}
                className="mt-4 w-full bg-accent  disabled:bg-accent/50 text-white py-2 rounded  transition-all"
              >
                {isChallenge ? "Challenges" : "Modes"}
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setModalIsOpen(false);
                  setIsExpired(false);
                  router.push("/log-in");
                }}
                className="mt-4 w-full bg-accent text-white py-2 rounded hover:scale-[1.02]  transition-all"
              >
                Create an account
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
