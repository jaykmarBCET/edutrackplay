import { CollegeListInfo } from "@/store/Student.store"
import { createContext, useContext } from "react"
import { CollegeFeePaymentByStudentInfo } from "../../../types/types"

// CollegeList Context
export const CollegeListContext = createContext<CollegeListInfo[] | null>(null)
export const useCollegeList = () => {
    const collegeList = useContext(CollegeListContext)
    return collegeList
}

// CollegePricingContext

export interface CollegeClassPricingByCollegeIdInfo{
    collegeAndPriceInfo:CollegeListInfo| null;
    getCollegePriceInfo:(collegeId:string)=>Promise<void>;
} 

export const CollegeClassPricingContext = createContext<CollegeClassPricingByCollegeIdInfo>({
    collegeAndPriceInfo:{
        id:0,
        title:"",
        description:"",
        logo:"",
        field:"",
        email:"",
        pricings:[]
    },
    getCollegePriceInfo:async(collegeId)=>{
        console.log(collegeId)
    }
})

export const useCollegePriceById = ()=>{
    const all = useContext(CollegeClassPricingContext)
    return all
}


// College Payment due 
interface StudentBasicInfo {
    student:{
    name:string;
    avatar:string;
    email:string;
    phone:string;
    id:string;
    address:string
    }
}

export type CollegeStudentPaymentDueInfo = CollegeFeePaymentByStudentInfo & StudentBasicInfo

interface CollegePaymentDueListInfo{
    paymentByStudent:CollegeStudentPaymentDueInfo[]|[]
    getAllPaymentDue:()=>Promise<void>
    sendMail:(studentId:number)=>Promise<void>
}

export const CollegePaymentDueListContext = createContext<CollegePaymentDueListInfo>({
    paymentByStudent:[],
    getAllPaymentDue:async()=>{},
    sendMail:async(studentId:number)=>{
        console.log(studentId)
    }
})

export const useCollegePaymentDueList = ()=>{
    return useContext(CollegePaymentDueListContext)
}