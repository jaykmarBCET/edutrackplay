import { createContext, useContext } from "react";


export interface StudentAdmissionRequestInfo {
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
    name: string;
    score: number,
    phone?: string;
    email: string;
    dob: string;
    address: string;
    avatar: string;
}

export interface StudentPaymentDueInfo {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: string | "Pending" | "Failed" | "Successfully";
    transactionId: string;
    studentId: string;
    collegeId: string;
    price: number;
    collegeClassPricingId: string;
    expireDuration: number;
    college: {
        name: string;
        address: string;
        title: string;
        logo?: string;
    };
    class: {
        stander: string;
        field: string
    }
}

export interface StudentPaymentDueContextInfo {
    studentPaymentDue: StudentPaymentDueInfo[] | [];
    getAllStudentPaymentDue: () => Promise<void>
    classPaymentHandel:(classPricingId:number)=>Promise<void>
}

export const StudentRequestContext = createContext<StudentAdmissionRequestInfo[] | []>([])

export const useStudentRequestForCollege = () => {
    return useContext(StudentRequestContext)
}


interface StudentProfileInfoInitialData {
    studentProfile: StudentProfileInfo | null;
    getStudent: (studentId: number) => Promise<void>
}

export const StudentProfileContext = createContext<StudentProfileInfoInitialData>({
    studentProfile: null,
    getStudent: async (studentId) => {
        console.log(studentId)
    }
})

export const StudentPaymentDueContext = createContext<StudentPaymentDueContextInfo>({
    studentPaymentDue:[],
    getAllStudentPaymentDue:async()=>{},
    classPaymentHandel:async(classPricingId)=>{
        console.log(classPricingId)
    }
})

export const useStudentProfile = () => {
    return useContext(StudentProfileContext)
}

export const  useStudentPaymentDue = ()=>{
    return useContext(StudentPaymentDueContext)
}


