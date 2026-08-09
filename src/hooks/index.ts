import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown(initialSeconds: number, active = true) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => setSeconds(initialSeconds), [initialSeconds]);

  useEffect(() => {
    if (!active || seconds <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, seconds]);

  return { seconds, canResend: seconds === 0, reset };
}

export function useMockFetch<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const result = await loader();
      setData(result);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loader]);

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load();
  }, [load]);

  return { data, loading, refreshing, error, refresh, reload: load };
}
