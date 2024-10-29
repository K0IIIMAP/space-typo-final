import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed data for Modes
  const modes = [
    {
      title: "Classic",
      approximately: 15,
      description: "The traditional mode for typing practice.",
      text: "Classic typing practice with common words.",
    },
    {
      title: "Uncommon",
      approximately: 20,
      description: "A mode featuring less common words.",
      text: "Uncommon words to challenge your typing skills.",
    },
    {
      title: "Unique",
      approximately: 25,
      description: "Typing practice with unique and creative text.",
      text: "Unique phrases to expand your vocabulary.",
    },
    {
      title: "Space",
      approximately: 30,
      description: "A mode themed around space-related terminology.",
      text: "Typing challenge with space-related terms.",
    },
  ];

  // Seed data for Challenges
  const challenges = [
    {
      title: "Easy",
      difficulty: "Easy",
      timeLimit: 10,
      description: "A simple challenge for beginners.",
      text: "Basic typing test to get started.",
    },
    {
      title: "Normal",
      difficulty: "Normal",
      timeLimit: 15,
      description: "A moderate challenge to improve speed.",
      text: "Intermediate level typing challenge.",
    },
    {
      title: "Difficult",
      difficulty: "Difficult",
      timeLimit: 15,
      description: "A challenging task for advanced users.",
      text: "Advanced level typing with complex words.",
    },
    {
      title: "Impossible",
      difficulty: "Impossible",
      timeLimit: 10,
      description: "An extreme challenge that tests your limits.",
      text: "Type at the speed of light!",
    },
  ];

  // Insert Modes
  for (const mode of modes) {
    await prisma.mode.create({
      data: mode,
    });
  }

  // Insert Challenges
  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: challenge,
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
