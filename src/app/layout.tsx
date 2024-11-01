import type { Metadata } from "next";

import "../styles/globals.css";
import TabloidContextProvider from "@/contexts/tabloid-context-provider";
import { Poppins } from "next/font/google"; // Import the font

import SettingsContextProvider from "@/contexts/settings-context-provider";
import Header from "./components/header";

import { Toaster } from "sonner";
import Footer from "./components/footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Space Typo",
  description: "Typing trainer By Kirill Amirov",
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased space flex flex-col min-h-screen`}
      >
        <TabloidContextProvider>
          <SettingsContextProvider>
            <SessionProvider>
              <Header />

              {children}
              <Footer />
            </SessionProvider>
          </SettingsContextProvider>
        </TabloidContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
