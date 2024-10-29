"use client"; // Ensure this file is treated as a client component
import React, { createContext, useEffect, useRef, useState } from "react";

// Define the context type
type TSettingsContext = {
  theme: string;
  font: string;
  sounds: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  setSounds: React.Dispatch<React.SetStateAction<string>>;
  bodyRef: React.MutableRefObject<HTMLElement | null>; // Update here
};

// Define the props for the context provider
type SettingsContextProviderProps = {
  children: React.ReactNode;
};

// Create the context
export const SettingsContext = createContext<TSettingsContext | null>(null);

// Define the context provider component
export default function SettingsContextProvider({
  children,
}: SettingsContextProviderProps) {
  // Create states with default values
  const [theme, setTheme] = useState("space");
  const [font, setFont] = useState("courier");
  const [sounds, setSounds] = useState("noSoundpack");

  // Allow bodyRef to start as null and update when document.body is available
  const bodyRef = useRef<HTMLElement | null>(null);

  // Set bodyRef to document.body once the component mounts
  useEffect(() => {
    bodyRef.current = document.body;
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");
    const savedSounds = localStorage.getItem("sounds");

    if (savedTheme) setTheme(savedTheme);
    if (savedFont) setFont(savedFont);
    if (savedSounds) setSounds(savedSounds);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  useEffect(() => {
    localStorage.setItem("sounds", sounds);
  }, [sounds]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        font,
        setFont,
        sounds,
        setSounds,
        bodyRef,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
