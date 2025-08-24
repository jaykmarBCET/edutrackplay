import { useCallback, useEffect, useState } from "react"
import { StudentAdmissionRequestInfo, StudentRequestContext } from "./student.context"
import axios from "axios"
import { AllRoot } from "@/constants/Routes"






export const StudentRequestProvider = ({children}:{children:React.JSX.Element})=>{
    const [request, setRequest] = useState<StudentAdmissionRequestInfo[] | []>([])

    const handelRequest = useCallback(async()=>{
        try {
            const response = await axios.get<StudentAdmissionRequestInfo[]>(AllRoot.StudentAdmissionRequestAndCollegeGet,{withCredentials:true})
    
            setRequest(response.data)
        } catch (error) {
        
            console.log(error)
        }
    },[])
    useEffect(()=>{
      handelRequest()
    },[handelRequest])
    return (
        <StudentRequestContext.Provider value={request}>
            {children}
        </StudentRequestContext.Provider>
    )
}