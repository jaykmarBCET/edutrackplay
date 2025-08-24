import { createContext, useContext } from "react";


export interface StudentAdmissionRequestInfo{
     id: number;
    createdAt: Date;
    updatedAt: Date;
    field: string;
    title: string;
    stander: string;
    description: string;
    isAccept: boolean;
    reason: string | null;
    studentId: number;
    collegeId: number | null;
    coachingId: number | null;
}

export const StudentRequestContext = createContext<StudentAdmissionRequestInfo[]| []>([])

export const useStudentRequestForCollege = ()=>{
    return useContext(StudentRequestContext)
}