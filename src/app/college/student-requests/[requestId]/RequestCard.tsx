'use client';

import { useStudentSingleRequest } from '@/context/student-request/studentRequestContext';
import { useEffect, useState } from 'react';

export default function RequestCard({ requestId }: { requestId: number }) {
    const { request, getRequestInfo, accept } = useStudentSingleRequest();
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getRequestInfo(requestId);
            setLoading(false);
        };
        fetchData();
    }, [requestId]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading request...</p>;
    }

    if (!request) {
        return <p className="text-center text-red-500">No request found.</p>;
    }

    const handleAccept = () => {
        accept({ requestId, isAccept: true, reason: '' });
    };

    const handleReject = () => {
        if (!reason.trim()) {
            alert('Please provide a reason for rejection.');
            return;
        }
        accept({ requestId, isAccept: false, reason });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full mx-auto">
            {/* Header */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{request.title}</h2>

            {/* Request Info */}
            <div className="space-y-2 text-sm sm:text-base">
                <p><span className="font-semibold text-gray-700">Field:</span> {request.field}</p>
                <p><span className="font-semibold text-gray-700">Standard:</span> {request.stander}</p>
                <p><span className="font-semibold text-gray-700">Description:</span> {request.description}</p>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Student Details */}
            <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Student Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <p><span className="font-medium text-gray-700">Name:</span> {request.student?.name}</p>
                    <p><span className="font-medium text-gray-700">Email:</span> {request.student?.email}</p>
                    <p><span className="font-medium text-gray-700">Address:</span> {request.student?.address}</p>
                    <p><span className="font-medium text-gray-700">Current Class:</span> {request.student?.score}</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Action Buttons or Status */}
            {request.isAccept ? (
                <p className="text-green-600 font-semibold text-center">This request has already been accepted.</p>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700">
                            Reason for Rejection (optional):
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full resize-none"
                            rows={3}
                            placeholder="Only required if rejecting"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                        <button
                            onClick={handleAccept}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleReject}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
