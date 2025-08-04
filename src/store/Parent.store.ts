import { create } from 'zustand'
import axios, { AxiosError } from 'axios'
import { ParentInfo, StudentInfo } from '../../types/types'
import { toast } from 'react-hot-toast'
import { AllRoot } from '@/constants/Routes'

export interface ParentStoreInfo {
    parent: ParentInfo | null;
    student: StudentInfo[] | [];
    isLoading: boolean;
    createParent: (parent: ParentInfo) => Promise<void>;
    updateParent: (parent: ParentInfo) => Promise<void>;
    getParent: () => Promise<void>;
    addChildren: (student: FormData) => Promise<void>;
    getChildren: () => Promise<void>;
    logoutParent: () => Promise<void>;
    loginParent: ({ email, password }: { email: string, password: string }) => Promise<void>
}


export const useParentStore = create<ParentStoreInfo>((set, get) => ({
    parent: null,
    student: [],
    isLoading: false,
    createParent: async (parent) => {
        try {
            set({ isLoading: true })
            const response = await axios.post(AllRoot.ParentRegister, parent)
            if (response.status < 300) {
                set({ parent: response.data })
                toast.success("Created successfully")
            }
        } catch (e) {
            console.log(e)
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data.message as string)
        }
        set({ isLoading: false })
    },
    loginParent: async ({ email, password }) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(AllRoot.ParentLogin, { email, password }, { withCredentials: true })
            if (response.status < 350) {
                set({ parent: response.data })
                toast.success("Login successfully")
            }
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data.message as string)
        } finally {
            set({ isLoading: false })
        }
    },
    updateParent: async (parent) => {
        set({ isLoading: true })
        try {
            const response = await axios.put(AllRoot.ParentUpdate, parent, { withCredentials: true })
            if (response.status > 350) {
                toast.error(response.data.message)
                return;
            }
            set({ parent: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data.message as string)
        }
        set({ isLoading: false })
    },
    getParent: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get(AllRoot.ParentGet, { withCredentials: true })
            if (response.status < 350) {
                const data = response.data

                set({ parent: data })
            }
        } catch (error) {
            console.log(error)
        }
        set({ isLoading: false })
    },
    getChildren: async () => {
        set({ isLoading: true })
        const response = await axios.get(AllRoot.ParentGetChildren, { withCredentials: true })
        if (response.status < 350) {

            set({ student: response.data })
            return
        }
        toast.error(response.data.message)
        set({ isLoading: false })

    },
    addChildren: async (student) => {
        set({ isLoading: true })
        try {

            const response = await axios.post(AllRoot.ParentAddChildren, student, {
                withCredentials: true,
            })

            if (response.status < 350) {
                get().getChildren()
                toast.success("Student Added Successfully")
                return
            }
        } catch (error) {
            const response = error as AxiosError<{ message: string }>
            toast.error(response?.response?.data?.message as string)

        }finally{
            set({isLoading:false})
        }
    },
    logoutParent: async () => {
        set({ isLoading: true })
        const response = await axios.get(AllRoot
            .ParentLogout
        )
        if (response.status < 300) {
            set({ parent: null })
            toast.success("logout successfully")

        }
        set({ isLoading: false })
    },
}))