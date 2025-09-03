// app/request-submit/[requestId]/page.tsx
import { StudentRequestSingleProvider } from '@/context/student-request/StudentRequestSingleProvider';
import RequestCard from './RequestCard';

type RequestParam = {
  requestId: string;
};

export default function RequestSubmitPage({ params }: { params: RequestParam }) {
  const requestId = Number(params.requestId);

  return (
    <StudentRequestSingleProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <RequestCard requestId={requestId} />
      </div>
    </StudentRequestSingleProvider>
  );
}
