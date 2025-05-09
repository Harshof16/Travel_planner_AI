export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const getRelativeTime = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
  const now = Date.now();
  const diff = timestamp - now;

  const times: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: "day", ms: 1000 * 60 * 60 * 24 },
    { unit: "hour", ms: 1000 * 60 * 60 },
    { unit: "minute", ms: 1000 * 60 },
    { unit: "second", ms: 1000 },
  ];

  for (const { unit, ms } of times) {
    const delta = diff / ms;
    if (Math.abs(delta) >= 1) {
      return rtf.format(Math.round(delta), unit); // → "a month ago"
    }
  }

  return "just now";
};
