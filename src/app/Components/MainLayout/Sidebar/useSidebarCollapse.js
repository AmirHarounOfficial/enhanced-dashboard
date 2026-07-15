"use client";
import { useState, useEffect } from "react";

/**
 * Desktop sidebar collapse state, persisted in localStorage so the
 * user's preference survives navigation and reloads.
 * Returns [open, toggle] where `open === false` means collapsed.
 */
export default function useSidebarCollapse() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("sidebarCollapsed") === "1") {
      setOpen(false);
    }
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarCollapsed", next ? "0" : "1");
      return next;
    });
  };

  return [open, toggle];
}
