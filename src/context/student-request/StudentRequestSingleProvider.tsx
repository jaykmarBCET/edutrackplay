// StudentRequestSingleProvider.tsx
'use client';

import React, { useState } from 'react';
import { RequestInfo, StudentSingleRequestContext } from './studentRequestContext';
import { StudentAdmissionRequestInfo } from '../student/student.context';
import axios from 'axios';
import { AllRoot } from '@/constants/Routes';

export const StudentRequestSingleProvider = ({ children }: React.PropsWithChildren) => {
  const [request, setRequest] = useState<StudentAdmissionRequestInfo | null>(null);

  const getRequestInfo = async (requestId: number) => {
    try {
      const response = await axios.get(AllRoot.StudentAdmissionRequestAndCollegeGet, {
        params: { requestId },
        withCredentials: true,
      });
      setRequest(response.data);
    } catch (error) {
      console.error('Failed to fetch request info', error);
    }
  };

  const accept = async (data: RequestInfo) => {
    try {
      const response = await axios.post(AllRoot.StudentAdmissionRequestAndCollegeGet, data, {
        withCredentials: true,
      });

      if (response.status < 350) {
        alert('Accepted successfully');
      }
    } catch (error) {
      console.error('Accept failed', error);
    }
  };

  return (
    <StudentSingleRequestContext.Provider value={{ request, getRequestInfo, accept }}>
      {children}
    </StudentSingleRequestContext.Provider>
  );
};
