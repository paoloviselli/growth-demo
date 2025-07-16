import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
