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
    student?: {
        email: string,
        name: string
        score: number | null,
        address: string
    }
}
export interface StudentProfileInfo {
    name:string;
    score:number,
    phone?:string;
    email:string;
    dob:string;
    address:string;
    avatar:string;
}

export const StudentRequestContext = createContext<StudentAdmissionRequestInfo[]| []>([])

export const useStudentRequestForCollege = ()=>{
    return useContext(StudentRequestContext)
}


interface StudentProfileInfoInitialData{
    studentProfile:StudentProfileInfo | null;
    getStudent:(studentId:number)=>Promise<void>
}

export const StudentProfileContext = createContext<StudentProfileInfoInitialData >({
    studentProfile:null,
    getStudent:async(studentId)=>{
        console.log(studentId)
    }
})

export const useStudentProfile = ()=>{
    return useContext(StudentProfileContext)
}
