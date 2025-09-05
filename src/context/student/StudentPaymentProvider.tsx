import React, { useEffect, useState } from "react";
import { StudentPaymentDueContext, StudentPaymentDueInfo } from "./student.context";
import axios from "axios";
import { AllRoot } from "@/constants/Routes";


export const StudentPaymentProvider = ({ children }: React.PropsWithChildren) => {
    const [totalStudentPaymentDue, setTotalStudentPaymentDue] = useState<StudentPaymentDueInfo[] | []>([])

    const getAllPaymentDue = async () => {
        const response = await axios.get(AllRoot.StudentFeePaymentOfClassGet)
        setTotalStudentPaymentDue(response.data)
    }

    const classPaymentHandel = async (classPricingId: number) => {
        const response = await axios.post(AllRoot.StudentFeePaymentOfClassPrePay,{
            collegeFeePaymentByStudentId:classPricingId
        })

        console.log(response)
    }

    useEffect(()=>{
        getAllPaymentDue()
    },[])

    return (
        <StudentPaymentDueContext value={{ classPaymentHandel, getAllStudentPaymentDue: getAllPaymentDue, studentPaymentDue: totalStudentPaymentDue }}>
            {children}
        </StudentPaymentDueContext>
    )
}