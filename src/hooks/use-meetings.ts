import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/utils';
import { collection, getDocs } from 'firebase/firestore';

// Meeting type
export interface Meeting {
  id: string;
  title: string;
  time: number;
  attendees: string[];
  description?: string;
}

export default function useMeetings() {
  return useQuery<Meeting[]>({
    queryKey: ['meetings'],
    queryFn: async () => {
      const now = Date.now();
      const meetingsRef = collection(db, 'users/demo/meetings');
      const snapshot = await getDocs(meetingsRef);
      const meetings = snapshot.docs
        .map(doc => ({ id: doc.id, ...(doc.data() as Partial<Meeting>) }))
        .filter(
          (m): m is Meeting => typeof m.time === 'number' && m.time >= now
        )
        .sort((a, b) => a.time - b.time);
      return meetings as Meeting[];
    },
    initialData: [],
  });
}
