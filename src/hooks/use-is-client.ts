"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and the hydration pass, `true` afterwards.
 *
 * Uses `useSyncExternalStore` rather than `useEffect(() => setState(true))`
 * because it is the purpose-built API for reading a value that legitimately
 * differs between server and client — and it avoids both the cascading render
 * and the lint rule that pattern trips.
 */
export function useIsClient() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
