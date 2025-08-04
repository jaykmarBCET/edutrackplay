import { CollegeInfo } from '../../types/types'
import { create } from 'zustand'
import axios, { AxiosError } from 'axios';
import { AllRoot } from '@/constants/Routes';

export interface CollegeStoreInfo {
    college: CollegeInfo | null;

    createCollege: (College: FormData) => Promise<void>;
    loginCollege: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logoutCollege: () => Promise<void>;
    updateCollege: (College: CollegeInfo) => Promise<void>;
    getCollege: () => Promise<void>;
    deleteCollege: () => Promise<void>;
}

export const useCollegeStore = create<CollegeStoreInfo>((set) => ({
    college: null,
    loginCollege: async ({ email, password }) => {
        try {

            const response = await axios.post(AllRoot.CollegeLogin, { email, password }, {
                withCredentials: true
            })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }

            set({ college: response.data })
        } catch (error) {
            console.log(error)
        }

    },
    createCollege: async (College) => {
        try {
            const response = await axios.post(AllRoot.CollegeRegister, College, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (error) {
            console.log(error)
        }
    },
    logoutCollege: async () => {
        try {
            const response = await axios.get(AllRoot.CollegeLogout, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: null })
        } catch (error) {
            console.log(error)
        }
    },
    updateCollege: async (College) => {
        try {
            const response = await axios.put(AllRoot.CollegeUpdate, College, { withCredentials: true })
            
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            console.log(error.message)
        }
    },
    getCollege: async () => {
        try {
            const response = await axios.get(AllRoot.CollegeGet, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (error) {
            console.log(error)
        }
    },
    deleteCollege: async () => {
        try {
            const response = await axios.delete(AllRoot.CollegeDelete)
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (error) {
            console.log(error)
        }
    }
}))
