// studentRequestContext.ts
import { createContext, useContext } from 'react';
import { StudentAdmissionRequestInfo } from '../student/student.context';

export interface RequestInfo {
  requestId: number;
  isAccept: boolean;
  reason: string;
}

export interface StudentRequestSubmit {
  request: StudentAdmissionRequestInfo | null;
  getRequestInfo: (requestId: number) => Promise<void>;
  accept: (data: RequestInfo) => Promise<void>;
}

export const StudentSingleRequestContext = createContext<StudentRequestSubmit>({
  request: null,
  getRequestInfo: async (requestId) => {
    console.log("Default getRequestInfo", requestId);
  },
  accept: async (data) => {
    console.log("Default accept", data);
  },
});

export const useStudentSingleRequest = () => useContext(StudentSingleRequestContext);
