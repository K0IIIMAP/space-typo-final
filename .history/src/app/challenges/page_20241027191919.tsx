import prisma from "@/lib/db";
import Card from "../components/card";
import AppH1 from "../components/app-h1";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
type Challenge = {
  id: number;
  title: string;
  difficulty: string;
  timeLimit: number;
  description: string;
  text: string;
  createdAt: Date;
};

export default async function ChallengesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });
  const challengesCompleted = user?.challengesCompleted || 0;

  const challenges = await prisma.challenge.findMany();

  return (
    <main>
      <AppH1>Test your skills with the hardest challenges ever!</AppH1>

      <div className="flex flex-wrap justify-evenly px-[5%] mt-20 gap-6">
        {challenges.map((challenge: Challenge, index: number) => (
          <Card
            isLocked={index > 0 && challengesCompleted < index}
            challenge={challenge}
            key={challenge.id}
            fourth={index === challenges.length - 1 ? true : false}
          />
        ))}
      </div>
    </main>
  );
}
