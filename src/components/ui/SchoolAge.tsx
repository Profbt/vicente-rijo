"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

let cachedAge: number | null = null;

function currentSchoolAge(): number {
  if (cachedAge === null) {
    const now = new Date();
    const hadAnniversary = now.getMonth() + 1 >= 4;

    cachedAge = now.getFullYear() - 1946 - (hadAnniversary ? 0 : 1);
  }

  return cachedAge;
}

export default function SchoolAge({ initial }: { initial: number }) {
  const age = useSyncExternalStore(subscribe, currentSchoolAge, () => initial);

  return <>{age}</>;
}
