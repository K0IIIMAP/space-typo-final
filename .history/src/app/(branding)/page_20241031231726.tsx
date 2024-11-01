import Link from "next/link";

import Demo from "../components/demo";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row justify-between px-[5%]  mt-8 lg:mt-[115px] ">
      <section className="flex-1 flex flex-col items-center lg:block">
        <h1 className="text-[3rem]  font-semibold mb-6">
          Space <span className="italic">Typo</span>
        </h1>
        <div className="flex flex-col gap-y-7  text-xl sm:text-2xl md-custom:text-3xl">
          <p className="">Explore the universe,one key at a time!</p>
          <p className=" ">
            Only <span className="text-accent font-bold">20</span> minutes per
            day <br /> Will launch you typing into{" "}
            <span className="text-accent font-bold italic underline">
              WARP SPEED
            </span>
          </p>
          <p className=" ">
            Joint the <span className="text-accent font-bold">SPACE</span>{" "}
            Typing Adventure Now!
          </p>

          <Link
            href="/log-in"
            className="bg-accent/90 px-20 py-3 w-fit text-[16px] mt-3 mx-auto lg:mx-0"
          >
            Launch right now!
          </Link>
        </div>
      </section>
      <section className="flex-1 mb-10">
        <Demo />
      </section>
    </main>
  );
}
