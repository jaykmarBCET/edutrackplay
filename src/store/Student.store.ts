import { StudentInfo, StudentAdmissionRequestInfo, CollegeClassPricingInfo } from '../../types/types'
import { create } from 'zustand'
import axios, { AxiosError } from 'axios';
import { AllRoot } from '@/constants/Routes';
import { toast } from 'react-hot-toast'


export interface StudentMakeRequestForCollegeInfo {
    collegeId?: number;
    field: string;
    title: string;
    stander: number;
    description: string;
}

export interface CollegeListInfo {
  id: number;
  email: string;
  title: string;
  field:string;
  description: string | null;
  logo: string;
  pricings: CollegeClassPricingInfo[] | [];
}

export interface StudentAdmissionInfo {
    allRequest: StudentAdmissionRequestInfo[] | [];
    studentAdmissionRequestForCollegeCreate: (StudentMakeRequestInfo: StudentMakeRequestForCollegeInfo) => Promise<void>;
    studentAdmissionRequestForCollegeGet: () => Promise<void>;
    studentAdmissionRequestForCollegeUpdate: (StudentMakeRequestUpdateInfo: StudentAdmissionRequestInfo) => Promise<void>;
    studentAdmissionRequestForCollegeDelete: (requestId: number) => Promise<void>;
}

export interface StudentStoreInfo {
    student: StudentInfo | null;
    isLoading: boolean | false
    createStudent: (student: StudentInfo) => Promise<void>;
    loginStudent: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logoutStudent: () => Promise<void>;
    updateStudent: (student: FormData) => Promise<void>;
    getStudent: () => Promise<void>;
    deleteStudent: () => Promise<void>;
}

export const useStudentStore = create<StudentStoreInfo>((set) => ({
    student: null,
    isLoading: false,
    loginStudent: async ({ email, password }) => {
        set({ isLoading: true })
        try {

            const response = await axios.post(AllRoot.StudentLogin, { email, password }, {
                withCredentials: true
            })
            if (response.status > 300) {
                toast.error(response.data.message)

            }

            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error?.response?.data?.message as string)
        } finally {
            set({ isLoading: false })
        }

    },
    createStudent: async (student) => {
        set({ isLoading: false })
        try {
            const response = await axios.post(AllRoot.StudentRegister, student, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error?.response?.data.message as string)

        } finally {
            set({ isLoading: false })
        }
    },
    logoutStudent: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get(AllRoot.StudentLogout, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: null })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data.message as string)
        } finally {
            set({ isLoading: false })
        }
    },
    updateStudent: async (student) => {
        set({ isLoading: true })
        try {
            const response = await axios.put(AllRoot.StudentUpdate, student, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error?.response?.data.message as string)
        } finally {
            set({ isLoading: false })
        }
    },
    getStudent: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get(AllRoot.StudentGet, { withCredentials: true })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data.message as string)
        } finally {
            set({ isLoading: false })
        }
    },
    deleteStudent: async () => {
        set({ isLoading: false })
        try {
            const response = await axios.delete(AllRoot.StudentDelete)
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }
            set({ student: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error?.response?.data.message as string)
        } finally {
            set({ isLoading: false })
        }
    }
}))


export const useStudentCollegeAdmissionStore = create<StudentAdmissionInfo>((set, get) => ({
    allRequest: [],
    studentAdmissionRequestForCollegeCreate: async (data) => {
        try {
            const response = await axios.post<StudentAdmissionRequestInfo>(AllRoot.StudentAdmissionRequestForCollegeCreate, data, { withCredentials: true })
            if (response.status >= 400) {

                throw Error("Error while creating Request")

            }
            const currData = response.data as StudentAdmissionRequestInfo;
            const previous = get().allRequest;
            set({ allRequest: [...previous, currData] })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error?.response?.data.message as string)
        }
    },
    studentAdmissionRequestForCollegeGet: async () => {
        try {
            const response = await axios.get<StudentAdmissionRequestInfo[]>(AllRoot.StudentAdmissionRequestForCollegeGet, { withCredentials: true })
            if (response.status >= 400) {
                return;
            }
            set({ allRequest: response.data })
        } catch (e) {
            const error = e as AxiosError<{ message: string }>
            toast.error(error.response?.data?.message as string)
        }
    },
    studentAdmissionRequestForCollegeUpdate: async (data) => {
        try {

            const response = await axios.put<StudentAdmissionRequestInfo>(AllRoot.StudentAdmissionRequestForCollegeUpdate, data, { withCredentials: true })
            if (response.status >= 400) {
                throw Error("Error while updating request")
            }
            let previous = get().allRequest;
            previous = previous.filter((item) => item.id !== data.id)
            set({ allRequest: [...previous, response.data] })

        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
        }
    },
    studentAdmissionRequestForCollegeDelete: async (requestId) => {
        try {
            const response = await axios.delete<StudentAdmissionRequestInfo>(AllRoot.StudentAdmissionRequestForCollegeDelete,{params:{requestId},withCredentials:true})
            if(response.status>=400){
                throw Error("Error while deleting request")
            }
            const previous = get().allRequest.filter((item)=>item.id!==requestId)
            set({allRequest:previous})
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
        }
    }
}))
