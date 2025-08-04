import { StudentInfo } from '../../types/types'
import { create } from 'zustand'
import axios, { AxiosError } from 'axios';
import { AllRoot } from '@/constants/Routes';
import {toast} from 'react-hot-toast'

export interface StudentStoreInfo {
    student: StudentInfo | null;
    isLoading:boolean | false
    createStudent: (student: StudentInfo) => Promise<void>;
    loginStudent: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logoutStudent: () => Promise<void>;
    updateStudent: (student: StudentInfo) => Promise<void>;
    getStudent: () => Promise<void>;
    deleteStudent: () => Promise<void>;
}

export const useStudentStore = create<StudentStoreInfo>((set) => ({
    student: null,
    isLoading:false,
    loginStudent: async ({ email, password }) => {
        set({isLoading:true})
        try {

            const response = await axios.post(AllRoot.StudentLogin, { email, password }, {
                withCredentials: true
            })
            if (response.status > 300) {
               toast.error(response.data.message)
                
            }

            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data?.message as string)
        }finally{
            set({isLoading:false})
        }

    },
    createStudent: async (student) => {
        set({isLoading:false})
        try {
            const response = await axios.post(AllRoot.StudentRegister, student, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)

        }finally{
            set({isLoading:false})
        }
    },
    logoutStudent: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get(AllRoot.StudentLogout, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: null })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
        }finally{
            set({isLoading:false})
        }
    },
    updateStudent: async (student) => {
        set({isLoading:true})
        try {
            const response = await axios.put(AllRoot.StudentUpdate, student, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
        }finally{
            set({isLoading:false})
        }
    },
    getStudent: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get(AllRoot.StudentGet, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
        }finally{
            set({isLoading:false})
        }
    },
    deleteStudent: async () => {
        set({isLoading:false})
        try {
            const response = await axios.delete(AllRoot.StudentDelete)
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
        }finally{
            set({isLoading:false})
        }
    }
}))
