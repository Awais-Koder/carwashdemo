"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

import { useIsClient } from "@/hooks/use-is-client";

/**
 * Single app-wide toaster. Mounted once in the root layout.
 * Theme-aware so toasts don't flash white in dark mode.
 */
export function Toaster() {
  const mounted = useIsClient();
  const { resolvedTheme } = useTheme();

  if (!mounted) return null;

  return (
    <SonnerToaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      closeButton
      richColors
      duration={4200}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-[var(--radius-md)] !border !border-[var(--border)] !font-[family-name:var(--font-body)]",
          description: "!text-[var(--ink-3)]",
          actionButton:
            "!rounded-[var(--radius-xs)] !bg-[var(--accent)] !text-[var(--accent-contrast)]",
        },
      }}
    />
  );
}
