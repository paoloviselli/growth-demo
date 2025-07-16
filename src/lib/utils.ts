import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'localhost',
  projectId: 'fyxer-demo',
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

if (import.meta.env.MODE === 'development') {
  connectFirestoreEmulator(db, '127.0.0.1', 8081);
}

export { db };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CalendarEvent = {
  id: string;
  title: string;
  startsAt: string; // ISO
  endsAt: string;
  attendees: string[];
};

export const calendarEventsRaw: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client sync with Orbit Partners',
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // tomorrow
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(),
    attendees: ['jack@orbit.com', 'amy@fyxer.ai'],
  },
  {
    id: '2',
    title: 'Intro call: BrightHire',
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 27).toISOString(),
    attendees: ['ceo@brighthire.com'],
  },
];
