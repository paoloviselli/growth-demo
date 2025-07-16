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
  const now = Date.now();
  const meetings = [
    {
      id: 'meeting1',
      title: 'Weekly Sync',
      time: now + 3600 * 1000, // 1h from now
      attendees: ['alice@fyxer.com', 'bob@fyxer.com', 'demo@fyxer.com'],
      description: `Discuss weekly progress, blockers, and next steps.\n\nAgenda:\n- Review action items from last week\n- Share updates from each team member\n- Identify and discuss blockers\n- Plan priorities for the coming week\n\nContext: This is a recurring meeting to ensure alignment across the team.\nExpected Outcomes: Clear understanding of current status, blockers resolved, and new action items assigned.`,
    },
    {
      id: 'meeting2',
      title: 'Client Kickoff',
      time: now + 5 * 3600 * 1000, // 5h from now
      attendees: ['carol@fyxer.com', 'demo@fyxer.com', 'alice@fyxer.com'],
      description: `Kickoff call with new client.\n\nAgenda:\n- Introductions\n- Project overview and objectives\n- Timeline and deliverables\n- Communication protocols\n- Q&A\n\nContext: First meeting with the client to set expectations and build rapport.\nExpected Outcomes: Shared understanding of project scope, roles, and next steps.`,
    },
    {
      id: 'meeting3',
      title: 'Product Review',
      time: now + 24 * 3600 * 1000, // 1 day from now
      attendees: ['bob@fyxer.com', 'dave@fyxer.com', 'demo@fyxer.com'],
      description: `Review new product features, gather feedback, and discuss release timeline.\n\nAgenda:\n- Demo of new features\n- Collect feedback from stakeholders\n- Discuss bugs and improvements\n- Plan for next release\n\nContext: Regular product review to ensure features meet requirements.\nExpected Outcomes: Actionable feedback, prioritized bug list, and updated release plan.`,
    },
    {
      id: 'meeting4',
      title: '1:1 Check-in',
      time: now + 2 * 24 * 3600 * 1000, // 2 days from now
      attendees: ['demo@fyxer.com', 'eve@fyxer.com'],
      description: `Personal development, goals, and feedback session.\n\nAgenda:\n- Review progress on personal goals\n- Discuss challenges and support needed\n- Share feedback (both ways)\n- Set new objectives\n\nContext: Regular 1:1 to support growth and address concerns.\nExpected Outcomes: Clear goals, actionable feedback, and improved morale.`,
    },
    {
      id: 'meeting5',
      title: 'Retrospective',
      time: now - 2 * 24 * 3600 * 1000, // 2 days ago
      attendees: [
        'alice@fyxer.com',
        'bob@fyxer.com',
        'carol@fyxer.com',
        'demo@fyxer.com',
      ],
      description: `Sprint retrospective.\n\nAgenda:\n- What went well\n- What could be improved\n- Action items for next sprint\n- Open discussion\n\nContext: End-of-sprint review to improve team processes.\nExpected Outcomes: List of improvements, assigned action items, and team alignment.`,
    },
    {
      id: 'meeting6',
      title: 'Sales Demo',
      time: now + 3 * 3600 * 1000, // 3h from now
      attendees: ['frank@fyxer.com', 'demo@fyxer.com', 'client@acme.com'],
      description: `Demo for prospective client.\n\nAgenda:\n- Introduction and client background\n- Live demo of analytics features\n- Address client questions\n- Discuss pricing and next steps\n\nContext: Opportunity to showcase product value and address client needs.\nExpected Outcomes: Client interest, feedback, and potential follow-up meeting.`,
    },
    {
      id: 'meeting7',
      title: 'Engineering Standup',
      time: now + 6 * 3600 * 1000, // 6h from now
      attendees: [
        'alice@fyxer.com',
        'bob@fyxer.com',
        'dave@fyxer.com',
        'demo@fyxer.com',
      ],
      description: `Daily standup.\n\nAgenda:\n- Each member shares progress\n- Discuss blockers\n- Coordinate on tasks\n\nContext: Quick daily sync to keep engineering team aligned.\nExpected Outcomes: Everyone knows what others are working on, blockers surfaced early.`,
    },
    {
      id: 'meeting8',
      title: 'Marketing Strategy',
      time: now + 48 * 3600 * 1000, // 2 days from now
      attendees: ['carol@fyxer.com', 'eve@fyxer.com', 'demo@fyxer.com'],
      description: `Plan Q3 marketing campaigns, discuss content calendar, assign owners.\n\nAgenda:\n- Review past campaign performance\n- Brainstorm new campaign ideas\n- Assign content creation tasks\n- Set deadlines and KPIs\n\nContext: Strategic planning for upcoming quarter.\nExpected Outcomes: Agreed campaign plan, clear task assignments, and deadlines.`,
    },
  ];

  // Emails
  const emails = [
    {
      id: 'thread1',
      subject: 'Re: Weekly Sync',
      participants: ['alice@fyxer.com', 'demo@fyxer.com'],
      snippet:
        'Looking forward to our sync tomorrow! Let me know if you have topics to add.',
    },
    {
      id: 'thread2',
      subject: 'Client Kickoff Details',
      participants: ['carol@fyxer.com', 'demo@fyxer.com'],
      snippet:
        'Here are the docs for the kickoff. Please review before the call.',
    },
    {
      id: 'thread3',
      subject: 'Product Review Agenda',
      participants: ['bob@fyxer.com', 'dave@fyxer.com', 'demo@fyxer.com'],
      snippet: 'Draft agenda attached. Add your topics by EOD.',
    },
    {
      id: 'thread4',
      subject: '1:1 Check-in Prep',
      participants: ['eve@fyxer.com', 'demo@fyxer.com'],
      snippet: 'Let me know if there’s anything specific you want to discuss.',
    },
    {
      id: 'thread5',
      subject: 'Retrospective Notes',
      participants: [
        'alice@fyxer.com',
        'bob@fyxer.com',
        'carol@fyxer.com',
        'demo@fyxer.com',
      ],
      snippet: 'Sharing the notes and action items from our retro.',
    },
    {
      id: 'thread6',
      subject: 'Sales Demo Follow-up',
      participants: ['frank@fyxer.com', 'demo@fyxer.com', 'client@acme.com'],
      snippet:
        'Thanks for attending the demo. Attached are the slides and next steps.',
    },
    {
      id: 'thread7',
      subject: 'Standup Reminder',
      participants: [
        'alice@fyxer.com',
        'bob@fyxer.com',
        'dave@fyxer.com',
        'demo@fyxer.com',
      ],
      snippet: 'Don’t forget to update your tickets before standup.',
    },
    {
      id: 'thread8',
      subject: 'Marketing Strategy Docs',
      participants: ['carol@fyxer.com', 'eve@fyxer.com', 'demo@fyxer.com'],
      snippet: 'Draft campaign plan attached. Feedback welcome!',
    },
  ];

  // Notes
  const notes = [
    {
      id: 'note1',
      meetingId: 'meeting1',
      content: `Summary: Team discussed Q2 roadmap, blockers, and assigned new action items.\n\nKey Points:\n- Alice updated on API integration progress.\n- Bob raised a blocker with deployment pipeline.\n- Demo suggested weekly check-ins for new hires.\n\nDecisions:\n- Prioritize API integration for next sprint.\n- Bob to pair with Alice on deployment issues.\n\nAction Items:\n- Alice: Follow up on API integration.\n- Bob: Schedule meeting with DevOps.\n- Demo: Draft onboarding checklist.`,
    },
    {
      id: 'note2',
      meetingId: 'meeting2',
      content: `Summary: Client is excited to start.\n\nKey Points:\n- Carol presented project overview.\n- Client asked about reporting features.\n- Alice shared timeline estimates.\n\nDecisions:\n- Use Slack for daily communication.\n- Weekly status updates on Fridays.\n\nAction Items:\n- Carol: Send onboarding docs.\n- Demo: Schedule next check-in.\n- Alice: Share project plan.`,
    },
    {
      id: 'note3',
      meetingId: 'meeting3',
      content: `Summary: Reviewed new features.\n\nKey Points:\n- Bob demoed dashboard redesign.\n- Dave suggested UX improvements.\n- Feedback: Add export to CSV.\n\nDecisions:\n- Move forward with new dashboard.\n- Prototype export feature.\n\nAction Items:\n- Dave: Prototype export.\n- Bob: Collect more feedback from users.`,
    },
    {
      id: 'note4',
      meetingId: 'meeting4',
      content: `Summary: Discussed personal goals and feedback.\n\nKey Points:\n- Eve wants to focus on leadership skills.\n- Demo provided feedback on recent project.\n- Discussed training opportunities.\n\nDecisions:\n- Eve to attend leadership workshop.\n\nAction Items:\n- Demo: Suggest resources.\n- Eve: Register for workshop.`,
    },
    {
      id: 'note5',
      meetingId: 'meeting5',
      content: `Summary: Sprint retrospective.\n\nKey Points:\n- Good collaboration overall.\n- Sprint scope was too large.\n- Missed deadline for feature X.\n\nDecisions:\n- Reduce scope for next sprint.\n- Add buffer for testing.\n\nAction Items:\n- Alice: Draft new sprint plan.\n- Bob: Review testing process.`,
    },
    {
      id: 'note6',
      meetingId: 'meeting6',
      content: `Summary: Sales demo went well.\n\nKey Points:\n- Client interested in analytics.\n- Frank answered technical questions.\n- Demo shared case studies.\n\nDecisions:\n- Send pricing info.\n- Offer follow-up Q&A.\n\nAction Items:\n- Frank: Send pricing.\n- Demo: Schedule follow-up.`,
    },
    {
      id: 'note7',
      meetingId: 'meeting7',
      content: `Summary: Standup.\n\nKey Points:\n- Bob blocked on bug #123.\n- Alice to help debug.\n- Dave working on infra migration.\n\nDecisions:\n- Prioritize bug #123.\n\nAction Items:\n- Alice: Pair with Bob.\n- Dave: Update infra docs.`,
    },
    {
      id: 'note8',
      meetingId: 'meeting8',
      content: `Summary: Marketing strategy session.\n\nKey Points:\n- Q3 campaign ideas brainstormed.\n- Eve to draft blog post.\n- Carol to design assets.\n\nDecisions:\n- Focus on content marketing.\n- Launch campaign in July.\n\nAction Items:\n- Eve: Draft blog post.\n- Carol: Prepare design assets.`,
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
