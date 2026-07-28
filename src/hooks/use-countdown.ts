import { useState, useEffect } from "react";

export interface CountdownResult {
  formatted: string | null;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Calcule la différence entre la date cible et maintenant.
 */
export function calculateTimeLeft(targetDate: string | Date): CountdownResult {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      formatted: null,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;

  const weeks = Math.floor(diff / WEEK);
  const days = Math.floor((diff % WEEK) / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  const parts: string[] = [];
  if (weeks > 0) parts.push(`${weeks}sem`);
  if (days > 0) parts.push(`${days}j`);
  parts.push(`${hours}h`);
  parts.push(`${minutes}min`);
  parts.push(`${seconds}s`);

  return {
    formatted: parts.join(" "),
    weeks,
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

/**
 * Hook personnalisé pour suivre un compte à rebours en temps réel (mise à jour chaque seconde).
 */
export function useCountdown(targetDate: string | Date) {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    // Calcul immédiat lors du changement de targetDate
    setCountdown(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      const result = calculateTimeLeft(targetDate);
      setCountdown(result);

      if (result.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}