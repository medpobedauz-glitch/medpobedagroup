"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseDraftPersistenceOptions<T> = {
  storageKey: string;
  value: T;
  onRestore: (value: T) => void;
  enabled?: boolean;
};

type DraftStatus = "idle" | "restored" | "saved";

export function useDraftPersistence<T>({
  storageKey,
  value,
  onRestore,
  enabled = true,
}: UseDraftPersistenceOptions<T>) {
  const hydratedRef = useRef(false);
  const [status, setStatus] = useState<DraftStatus>("idle");

  useEffect(() => {
    if (!enabled || hydratedRef.current) {
      return;
    }

    hydratedRef.current = true;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return;
      }

      onRestore(JSON.parse(raw) as T);
      setStatus("restored");
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [enabled, onRestore, storageKey]);

  useEffect(() => {
    if (!enabled || !hydratedRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
      setStatus("saved");
    }, 260);

    return () => window.clearTimeout(timer);
  }, [enabled, storageKey, value]);

  const clearDraft = useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setStatus("idle");
  }, [storageKey]);

  return {
    status,
    clearDraft,
  };
}
