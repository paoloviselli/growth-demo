import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import { getApp } from 'firebase/app';
import PrepDialog from './PrepDialog';

interface Meeting {
  id: string;
  title: string;
  time: number;
  attendees: string[];
  description?: string;
}

function getInitials(email: string) {
  const [name] = email.split('@');
  return name
    .split(/[._-]/)
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [prepMd, setPrepMd] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrep = async () => {
    setLoading(true);
    setError(null);
    try {
      const functions = getFunctions(getApp());
      const generatePrep = httpsCallable(functions, 'generatePrep');
      const res = await generatePrep({ uid: 'demo', eventId: meeting.id });
      const data = res.data as unknown;
      setPrepMd(
        typeof data === 'object' && data !== null && 'prepMd' in data
          ? (data as { prepMd: string }).prepMd
          : null
      );
      setOpen(true);
    } catch (err: unknown) {
      setError('Failed to generate prep.');
      setOpen(true);
      console.error('Error generating prep:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border mx-auto w-full max-w-md rounded-2xl border px-0 py-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-4 rounded-t-2xl border-b bg-white px-6 pt-5 pb-3">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <CardTitle className="mb-1 truncate text-lg leading-tight font-semibold">
            {meeting.title}
          </CardTitle>
          <CardDescription className="mt-0 flex items-center gap-2">
            <span className="bg-muted rounded px-2 py-0.5 font-mono text-xs">
              {new Date(meeting.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span className="text-muted-foreground text-xs">
              {new Date(meeting.time).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </CardDescription>
        </div>
        <div className="ml-2 flex items-center gap-1">
          {meeting.attendees.slice(0, 3).map(email => (
            <Avatar
              key={email}
              className="bg-muted size-8 border-2 border-white shadow-sm"
            >
              <AvatarFallback>{getInitials(email)}</AvatarFallback>
            </Avatar>
          ))}
          {meeting.attendees.length > 3 && (
            <div className="bg-muted flex size-8 items-center justify-center rounded-full border-2 border-white text-xs">
              +{meeting.attendees.length - 3}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[56px] items-start justify-start">
        {meeting.description && (
          <div className="text-muted-foreground line-clamp-3 w-full text-sm">
            {meeting.description}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-start rounded-b-2xl bg-white px-6 pt-0 pb-5">
        <Button
          size="sm"
          className="bg-primary text-primary-foreground min-w-[140px] rounded-md"
          variant="default"
          onClick={handleGeneratePrep}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Prep'}
        </Button>
      </CardFooter>
      <PrepDialog open={open} setOpen={setOpen} prepMd={prepMd} error={error} />
    </Card>
  );
}
