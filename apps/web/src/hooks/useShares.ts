import { useCallback, useEffect, useState } from "react";
import type { Share } from "@binks/types";
import { ApiError } from "../lib/api";
import { getShares } from "../lib/shares";

export function useShares() {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (!cancelled) {
        setLoading(true);
        setError(null);
      }

      try {
        const data = await getShares();
        if (!cancelled) setShares(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Could not load market data.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return { shares, loading, error, refetch };
}
