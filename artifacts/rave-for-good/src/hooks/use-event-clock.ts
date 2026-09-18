import { useEffect, useState } from "react";

// Berlin midnight falls on a UTC hour boundary, including on DST change days.
// Refresh at every hour boundary and on resume; classification itself always
// uses Europe/Berlin, independently of the browser's timezone.
export function useEventClock(fixedNow?: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (fixedNow) return;
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const current = new Date();
      setNow(current);
      timer = setTimeout(refresh, 3_600_000 - (current.getTime() % 3_600_000));
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fixedNow]);

  return fixedNow ?? now;
}
