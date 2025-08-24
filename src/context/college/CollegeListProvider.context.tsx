import React, { useCallback, useEffect, useState } from "react"
import { CollegeListContext } from "./college.context"
import { CollegeListInfo } from "@/store/Student.store"
import axios from "axios"
import { AllRoot } from "@/constants/Routes"

export const CollegeListProvider = ({ children }: {children:React.JSX.Element}) => {
    const [collegeList, setCollegeList] = useState<CollegeListInfo[] | null>(null)
    const handelCollegeList = useCallback(async () => {
        const response = await axios.get<{colleges:CollegeListInfo[]}>(AllRoot.CollegeListGet, { withCredentials: true })
        setCollegeList(response.data.colleges)
    }, [])

    useEffect(() => {
        handelCollegeList()
    }, [handelCollegeList])
    return (
        <CollegeListContext.Provider  value={collegeList}>
            {children}
        </CollegeListContext.Provider>
    )
}