# Instant Meeting Prep MVP

This is a demo project for a Growth Engineer interview at Fyxer AI.

The goal is to build a `/meeting-prep` route where users can view their upcoming meetings and generate pre-meeting context with one click.

## Stack (same as Fyxer)

- React + TypeScript + Vite
- TailwindCSS + shadcn/ui
- Firebase (Functions + Firestore + Auth) + Emulator
- React Query
- PostHog (feature flags + events)
- GitHub Actions CI
- Sentry (basic)

## Key Flow

1. On `/meeting-prep`, display meetings happening in the next 24h.
2. Each meeting shows:
   - ⏰ time
   - 📝 title
   - 👥 attendees
   - 📩 button: “Generate Prep”
3. Clicking “Generate Prep” calls a Firebase Function that:
   - Fetches previous **email threads** between user + attendees
   - Fetches previous **meeting notes** with the same attendees
   - Looks at meeting **description** (if available)
   - Generates a markdown brief using OpenAI:
     - Bullet summary of prior exchanges
     - Agenda guess (if missing)
     - Blurbs for attendees
     - Suggested questions
4. Shows result in a modal dialog (Markdown rendered nicely)
5. Fires PostHog event, gated behind PostHog flag

## Firestore Structure (emulated)

users/{uid}/meetings/{eventId}
users/{uid}/emails/{threadId}
users/{uid}/notes/{noteId}

## Firebase Functions

- `generatePrep`: callable.
  - Inputs: `uid`, `eventId`
  - Queries: meetings, emails, notes
  - Uses OpenAI to generate `prepMd`
  - Writes result back to Firestore
- `ingestMeetings`: scheduled. Mocks pulling from Google Calendar.

## React UI

- Route: `/meeting-prep`
- Component: `<MeetingCard>` + `<PrepDialog>`
- Tailwind + shadcn for layout
- React Query for fetch/mutate
- Markdown display with `react-markdown`

## Growth Framing

- Users feel more confident before calls
- Improves Day 2/Day 7 retention
- Unlocks Pro-tier upsells (external attendee blurbs, CRM enrichment)
