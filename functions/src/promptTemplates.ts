export function getPrepPrompt(
  variant: string,
  meeting: any,
  emails: any[],
  notes: any[]
): string {
  switch (variant) {
    case 'brief':
      return `ALWAYS return your response as valid markdown, wrapped in a code block like \`\`\`markdown ... \`\`\`. Do not include any text outside the code block.

You are an expert meeting assistant. Given the following meeting, emails, and notes, generate a **very concise** markdown prep brief (max 5 bullet points, no extra commentary).

Meeting: ${meeting.title}
Description: ${meeting.description || '(none)'}
Attendees: ${(meeting.attendees || []).join(', ')}
Time: ${meeting.time || '(unknown)'}

Relevant Emails:
${emails.map(e => `- ${e.subject || '(no subject)'}: ${e.snippet || e.body || '(no content)'}`).join('\n')}

Relevant Notes:
${notes.map(n => `- ${n.content || n.text || '(no content)'}`).join('\n')}

Generate a **short** markdown summary for this meeting prep, focusing only on the most important points.`;
    case 'detailed':
      return `ALWAYS return your response as valid markdown, wrapped in a code block like \`\`\`markdown ... \`\`\`. Do not include any text outside the code block.

You are an expert meeting assistant. Given the following meeting, emails, and notes, generate a **detailed** markdown prep brief. Include:
- A thorough summary of prior exchanges
- A detailed agenda (guess if missing)
- In-depth blurbs for each attendee
- At least 3 suggested questions
- Any relevant context or background

Meeting: ${meeting.title}
Description: ${meeting.description || '(none)'}
Attendees: ${(meeting.attendees || []).join(', ')}
Time: ${meeting.time || '(unknown)'}

Relevant Emails:
${emails.map(e => `- ${e.subject || '(no subject)'}: ${e.snippet || e.body || '(no content)'}`).join('\n')}

Relevant Notes:
${notes.map(n => `- ${n.content || n.text || '(no content)'}`).join('\n')}
`;
    case 'bullets':
      return `ALWAYS return your response as valid markdown, wrapped in a code block like \`\`\`markdown ... \`\`\`. Do not include any text outside the code block.

You are an expert meeting assistant. Given the following meeting, emails, and notes, generate a markdown prep brief using **only bullet points** for every section (no paragraphs).

Meeting: ${meeting.title}
Description: ${meeting.description || '(none)'}
Attendees: ${(meeting.attendees || []).join(', ')}
Time: ${meeting.time || '(unknown)'}

Relevant Emails:
${emails.map(e => `- ${e.subject || '(no subject)'}: ${e.snippet || e.body || '(no content)'}`).join('\n')}

Relevant Notes:
${notes.map(n => `- ${n.content || n.text || '(no content)'}`).join('\n')}

Generate a markdown summary for this meeting prep, using bullet points for:
- Summary of prior exchanges
- Agenda guess (if missing)
- Blurbs for attendees
- Suggested questions
`;
    default:
      return `ALWAYS return your response as valid markdown, wrapped in a code block like \`\`\`markdown ... \`\`\`. Do not include any text outside the code block.

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
  }
}
