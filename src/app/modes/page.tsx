import prisma from "@/lib/db";
import Card from "../components/card";
import AppH1 from "../components/app-h1";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ModesPage() {
  const modes = await prisma.mode.findMany();
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <main>
      <AppH1>
        This place contains modes where you can practice your <br /> Typing
        Skills before trying challenges!
      </AppH1>

      <div className="flex flex-wrap justify-evenly px-[5%] mt-20 gap-6 mb-10">
        {modes.map((mode, index) => (
          <Card
            mode={mode}
            key={mode.id}
            fourth={index === modes.length - 1 ? true : false}
          />
        ))}
      </div>
    </main>
  );
}
