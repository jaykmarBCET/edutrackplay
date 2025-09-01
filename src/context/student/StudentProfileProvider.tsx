import React, { useState } from "react"
import { StudentProfileContext, StudentProfileInfo } from "./student.context"
import axios from "axios"
import { AllRoot } from "@/constants/Routes"

export const StudentProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<StudentProfileInfo | null>(null)

    const getUserInfo = async (studentId: number) => {
        try {
            const response = await axios.get(AllRoot.StudentProfileByAuthorizedCollege, {
                params: { studentId }
            })

            if (response.status <= 350) {
                setProfile(response.data)
            }
        } catch (error) {
            console.error("Failed to fetch student profile", error)
        }
    }

    return (
        <StudentProfileContext.Provider value={{ studentProfile: profile, getStudent: getUserInfo }}>
            {children}
        </StudentProfileContext.Provider>
    )
}
