import useMeetings from '@/hooks/use-meetings';
import DashboardLayout from '@/components/DashboardLayout';
import MeetingCard from '@/components/meeting-card';

export default function MeetingPrepPage() {
  const { data: meetings = [], isLoading, error } = useMeetings();

  console.log(meetings);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Upcoming Meetings</h1>
        {isLoading && <div>Loading…</div>}
        {error && <div className="text-red-500">Error loading meetings</div>}
        {meetings.length === 0 && !isLoading && (
          <div>No meetings in the next 24h.</div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map(event => (
            <MeetingCard key={event.id} meeting={event} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
