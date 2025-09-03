import { CollegeFeePaymentByStudent } from "@/generated/prisma";
import React, { useState } from "react";
import { CollegePaymentDueListContext } from "./college.context";
import axios from "axios";
import { AllRoot } from "@/constants/Routes";





export const CollegePaymentProvider = ({children}:React.PropsWithChildren)=>{

    const [allPaymentDue, setPaymentDue] = useState<CollegeFeePaymentByStudent|null>(null)

    const getPaymentDue = async()=>{
        const response = await axios.get(AllRoot.Coll)
    }

    return (
        <CollegePaymentDueListContext>
        {children}
        </CollegePaymentDueListContext>
    )
}