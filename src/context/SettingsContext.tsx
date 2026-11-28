import { createContext, useContext, type ReactNode } from "react";

import { usePersistedState } from "../hooks/usePersistedState";

export const FONT_SIZE_MIN = 18;
export const FONT_SIZE_MAX = 36;
export const FONT_SIZE_DEFAULT = 24;

type SettingsContextValue = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = usePersistedState(
    "tarteel.fontSize",
    FONT_SIZE_DEFAULT,
  );

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings لازم تنستخدم داخل SettingsProvider");
  }
  return context;
}
