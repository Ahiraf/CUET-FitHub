import { useCallback, useEffect, useState } from 'react';

// Loads async data with loading/error state and a reload(). Re-runs when deps change.
export function useApi(loader, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = useCallback(() => {
    let alive = true;
    setLoading(true);
    Promise.resolve()
      .then(loader)
      .then(
        (d) => { if (alive) { setData(d); setError(null); } },
        (e) => { if (alive) setError(e?.message || 'Something went wrong.'); },
      )
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, deps);

  useEffect(reload, [reload]);

  return { data, loading, error, setData, reload };
}
