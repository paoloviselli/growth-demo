import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Connect to emulator if running locally
process.env.GCLOUD_PROJECT = 'fyxer-demo';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8081';
process.env.FIREBASE_EMULATOR_HOST = '127.0.0.1:8081';

initializeApp();

const db = getFirestore();

async function seed() {
  const userId = 'demo';

  // Meetings
  const meetings = [
    {
      id: 'meeting1',
      title: 'Weekly Sync',
      time: Date.now() + 3600 * 1000, // 1h from now
      attendees: ['alice@fyxer.com', 'bob@fyxer.com'],
      description: 'Discuss weekly progress and blockers.',
    },
    {
      id: 'meeting2',
      title: 'Client Kickoff',
      time: Date.now() + 5 * 3600 * 1000, // 5h from now
      attendees: ['carol@fyxer.com', 'demo@fyxer.com'],
      description: 'Kickoff call with new client.',
    },
  ];

  // Emails
  const emails = [
    {
      id: 'thread1',
      subject: 'Re: Weekly Sync',
      participants: ['alice@fyxer.com', 'demo@fyxer.com'],
      snippet: 'Looking forward to our sync tomorrow!',
    },
    {
      id: 'thread2',
      subject: 'Client Kickoff Details',
      participants: ['carol@fyxer.com', 'demo@fyxer.com'],
      snippet: 'Here are the docs for the kickoff.',
    },
  ];

  // Notes
  const notes = [
    {
      id: 'note1',
      meetingId: 'meeting1',
      content: 'Discussed Q2 roadmap and blockers.',
    },
    {
      id: 'note2',
      meetingId: 'meeting2',
      content: 'Client is excited to start. Action items assigned.',
    },
  ];

  // Write meetings
  for (const m of meetings) {
    await db.doc(`users/${userId}/meetings/${m.id}`).set(m);
  }
  // Write emails
  for (const e of emails) {
    await db.doc(`users/${userId}/emails/${e.id}`).set(e);
  }
  // Write notes
  for (const n of notes) {
    await db.doc(`users/${userId}/notes/${n.id}`).set(n);
  }

  console.log('Seeded Firestore with mock data.');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
