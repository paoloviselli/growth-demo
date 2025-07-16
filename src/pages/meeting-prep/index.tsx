import { Card } from '@/components/ui/card';
import { calendarEventsRaw } from '@/lib/utils';

export default function PrepPage() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Tomorrow’s Meetings</h1>

      {calendarEventsRaw.map(event => (
        <Card key={event.id} className="p-4">
          <div className="font-medium">{event.title}</div>
          <div className="text-muted-foreground text-sm">
            {new Date(event.startsAt).toLocaleTimeString()} –{' '}
            {new Date(event.endsAt).toLocaleTimeString()}
          </div>
        </Card>
      ))}
    </div>
  );
}
