/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions';
import { onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

// Initialize admin if not already
if (!admin.apps.length) admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const generatePrep = onCall({ timeoutSeconds: 60 }, async request => {
  const { uid, eventId } = request.data;
  if (!uid || !eventId) throw new Error('Missing uid or eventId');

  // 1. Fetch meeting
  const meetingSnap = await admin
    .firestore()
    .doc(`users/${uid}/meetings/${eventId}`)
    .get();
  if (!meetingSnap.exists) throw new Error('Meeting not found');
  const meeting = meetingSnap.data();
  if (!meeting) throw new Error('Meeting data missing');

  // 2. Fetch emails (filter by attendees if possible)
  const emailsSnap = await admin
    .firestore()
    .collection(`users/${uid}/emails`)
    .get();
  const emails = emailsSnap.docs.map(doc => doc.data());

  // 3. Fetch notes (filter by attendees if possible)
  const notesSnap = await admin
    .firestore()
    .collection(`users/${uid}/notes`)
    .get();
  const notes = notesSnap.docs.map(doc => doc.data());

  // 4. Format prompt for OpenRouter
  const prompt = `Always return your response as valid markdown, wrapped in a code block like \`\`\`markdown ... \`\`\`. Do not include any text outside the code block.

You are an expert meeting assistant. Given the following meeting, emails, and notes, generate a markdown prep brief.

Meeting: ${meeting.title}
Description: ${meeting.description || '(none)'}
Attendees: ${(meeting.attendees || []).join(', ')}
Time: ${meeting.time || '(unknown)'}

Relevant Emails:
${emails.map(e => `- ${e.subject || '(no subject)'}: ${e.snippet || e.body || '(no content)'}`).join('\n')}

Relevant Notes:
${notes.map(n => `- ${n.content || n.text || '(no content)'}`).join('\n')}

Generate a markdown summary for this meeting prep, including:
- Bullet summary of prior exchanges
- Agenda guess (if missing)
- Blurbs for attendees
- Suggested questions
`;

  // 5. Call OpenRouter API
  const apiKey =
    process.env.OPENROUTER_KEY ||
    (process.env.FUNCTIONS_EMULATOR ? 'test-key' : undefined) ||
    (admin.instanceId().app.options as any)?.openrouter?.key ||
    undefined;
  // Prefer env var, fallback to functions config
  const configKey = (admin.instanceId().app.options as any)?.openrouter?.key;
  const finalKey =
    apiKey ||
    configKey ||
    (typeof request.rawRequest !== 'undefined' &&
      request.rawRequest.app?.get('openrouter.key'));
  if (!finalKey) throw new Error('OpenRouter API key not set');

  console.log(
    'OpenRouter request body:',
    JSON.stringify(
      {
        model: 'mistralai/mixtral-8x7b-instruct', // dev
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
      },
      null,
      2
    )
  );
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${finalKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5000', // Use your local or prod URL
      'X-Title': 'fyxer-demo',
    },
    body: JSON.stringify({
      //   model: 'openai/gpt-4o', // demo
      model: 'mistralai/mixtral-8x7b-instruct', // dev
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`);
  const data = (await res.json()) as any;
  console.log('OpenRouter full response:', JSON.stringify(data, null, 2));
  const prepMd =
    data.choices?.[0]?.message?.content || '(No summary generated)';

  // 6. Return markdown
  return { prepMd };
});
