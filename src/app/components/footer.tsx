import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="w-full  min-h-[30px]  mt-auto border-t border-white/10  flex justify-between text-[11px] items-center px-[5%] text-white/40 max-sm:block max-sm:items-center max-sm:block">
        <p className="max-sm:w-full text-center">
          Copyright &copy; 2024 SpaceTypo
        </p>
        <p className="max-sm:w-full text-center">All rights reserved</p>
        <p className="text-center">
          Developed by{" "}
          <a
            href="https://wa.me/380965360759"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500/60 hover:underline hover:text-blue-500 font-semibold"
          >
            Kirill Amirov
          </a>
        </p>
      </footer>
    </>
  );
}
