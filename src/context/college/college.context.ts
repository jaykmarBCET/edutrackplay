import { CollegeListInfo } from "@/store/Student.store"
import { createContext, useContext } from "react"

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

