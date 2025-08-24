import React, { useCallback, useState } from "react"
import { CollegeClassPricingContext } from "./college.context"
import { CollegeListInfo } from "@/store/Student.store"
import axios from "axios"
import { AllRoot } from "@/constants/Routes"

interface CollegeClassPricingProviderProps{
    children:React.JSX.Element
}

export const CollegeClassPricingProvider = ({children}:CollegeClassPricingProviderProps) =>{
    const [collegeClassPricingInfo,setCollegeClassPricingInfo] = useState<CollegeListInfo>({
        id:0,
        title:"",
        description:"",
        field:"",
        logo:"",
        email:"",
        pricings:[]
    })

    const handelCollegeClassPricing = useCallback(async(collegeId:string)=>{
        const response = await axios.get<CollegeListInfo>(AllRoot.CollegeClassPricingByCollegeId,{
            withCredentials:true,
            params:{
                id:collegeId
            }
        })
        setCollegeClassPricingInfo(response.data)
    },[])
    return (
        <CollegeClassPricingContext.Provider value={{collegeAndPriceInfo:collegeClassPricingInfo,getCollegePriceInfo:handelCollegeClassPricing}}>
        {children}
        </CollegeClassPricingContext.Provider>
    )
}