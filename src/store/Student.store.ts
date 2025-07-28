import { StudentInfo } from '../../types/types'
import { create } from 'zustand'
import axios from 'axios';
import { AllRoot } from '@/constants/Routes';

export interface StudentStoreInfo {
    student: StudentInfo | null;

    createStudent: (student: StudentInfo) => Promise<void>;
    loginStudent: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logoutStudent: () => Promise<void>;
    updateStudent: (student: StudentInfo) => Promise<void>;
    getStudent: () => Promise<void>;
    deleteStudent: () => Promise<void>;
}

export const useStudentStore = create<StudentStoreInfo>((set) => ({
    student: null,
    loginStudent: async ({ email, password }) => {
        try {

            const response = await axios.post(AllRoot.StudentLogin, { email, password }, {
                withCredentials: true
            })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }

            set({ student: response.data })
        } catch (error) {
            console.log(error)
        }

    },
    createStudent: async (student) => {
        try {
            const response = await axios.post(AllRoot.StudentRegister, student, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (error) {
            console.log(error)
        }
    },
    logoutStudent: async () => {
        try {
            const response = await axios.get(AllRoot.StudentLogout, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ student: null })
        } catch (error) {
            console.log(error)
        }
    },
    updateStudent: async (student) => {
        try {
            const response = await axios.put(AllRoot.StudentUpdate, student, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (error) {
            console.log(error)
        }
    },
    getStudent: async () => {
        try {
            const response = await axios.get(AllRoot.StudentGet, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (error) {
            console.log(error)
        }
    },
    deleteStudent: async () => {
        try {
            const response = await axios.delete(AllRoot.StudentDelete)
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}))
