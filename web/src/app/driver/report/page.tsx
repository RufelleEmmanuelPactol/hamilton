"use client";
import { useEffect } from "react";

/** The driver app moved to /app. Keeps old links working. */
export default function Page() {
  useEffect(() => {
    window.location.replace("/app/report/" + window.location.search);
  }, []);
  return null;
}
