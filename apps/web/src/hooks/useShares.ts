import { useEffect, useState } from "react";
import type { Share } from "@binks/types";
import { ApiError } from "../lib/api";
import { getShares } from "../lib/shares";

export function useShares() {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
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
  }, []);

  return { shares, loading, error };
}
