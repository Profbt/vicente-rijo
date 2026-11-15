"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

let cachedYear: number | null = null;

function currentEnrollmentYear(): number {
  if (cachedYear === null) {
    const now = new Date();

    cachedYear = now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear();
  }

  return cachedYear;
}

export default function EnrollmentYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    subscribe,
    currentEnrollmentYear,
    () => initial,
  );

  return <>{year}</>;
}
