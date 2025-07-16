import { Card } from '@/components/ui/card';
import { calendarEventsRaw } from '@/lib/utils';
import DashboardLayout from '@/components/DashboardLayout';

export default function MeetingPrepPage() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
