"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { detectTimezone } from "@/lib/timezone";

const TimezoneContext = createContext("Europe/Budapest");

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [tz, setTz] = useState("Europe/Budapest");

  useEffect(() => {
    setTz(detectTimezone());
  }, []);

  return <TimezoneContext.Provider value={tz}>{children}</TimezoneContext.Provider>;
}

export function useTimezone() {
  return useContext(TimezoneContext);
}
