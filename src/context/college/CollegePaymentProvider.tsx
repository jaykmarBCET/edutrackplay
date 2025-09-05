import React, { useEffect, useState } from "react";
import { CollegePaymentDueListContext, CollegeStudentPaymentDueInfo } from "./college.context";
import axios from "axios";
import { AllRoot } from "@/constants/Routes";






export const CollegePaymentProvider = ({ children }: React.PropsWithChildren) => {

    const [allPaymentDue, setPaymentDue] = useState<CollegeStudentPaymentDueInfo[] | []>([])

    const getPaymentDue = async () => {
        const response = await axios.get(AllRoot.StudentAdmissionRequestCollegePaymentDueGet, { withCredentials: true })

        setPaymentDue(response.data)
    }

    const sendMail = async (studentId: number) => {
        const response = await axios.get(AllRoot.StudentAdmissionRequestCollegeSendMailToStudent, {
            withCredentials: true,
            params: {
                studentId
            }
        })

        console.log(response.data)
    }

    useEffect(()=>{
        getPaymentDue()
    },[])

    return (
        <CollegePaymentDueListContext value={{ sendMail, getAllPaymentDue: getPaymentDue, paymentByStudent: allPaymentDue }}>
            {children}
        </CollegePaymentDueListContext>
    )
}