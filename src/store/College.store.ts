import { CollegeInfo,CollegeClassPricingInfo } from '../../types/types'
import { create } from 'zustand'
import axios, { AxiosError } from 'axios';
import { AllRoot } from '@/constants/Routes';
import {toast} from 'react-hot-toast';




export interface CollegeClassPricingStoreInfo{
    allClassPricing:CollegeClassPricingInfo[] | [];
    createClassPrice:(ClassInfo:CollegeClassPricingInfo)=>Promise<void>;
    getClassPrice:()=>Promise<void>;
    updateClassPrice:(ClassInfo:CollegeClassPricingInfo)=>Promise<void>;
    deleteClassPrice:(classPriceId:number)=>Promise<void>
}
export interface CollegeStoreInfo {
    college: CollegeInfo | null;
    isLoading:boolean | false;
    createCollege: (College: FormData) => Promise<void>;
    loginCollege: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logoutCollege: () => Promise<void>;
    updateCollege: (College: FormData) => Promise<void>;
    getCollege: () => Promise<void>;
    deleteCollege: () => Promise<void>;
}

export const useCollegeStore = create<CollegeStoreInfo>((set) => ({
    college: null,
    isLoading:false,
    loginCollege: async ({ email, password }) => {
        set({isLoading:true})
        try {

            const response = await axios.post(AllRoot.CollegeLogin, { email, password }, {
                withCredentials: true
            })
            if (response.status > 300) {
                toast.error(response.data.message)
                return;
            }

            set({ college: response.data })
            toast.success("Login Successfully")
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
            
        }finally{
            set({isLoading:false})
        }

    },
    createCollege: async (College) => {
        set({isLoading:true})
        try {
            const response = await axios.post(AllRoot.CollegeRegister, College, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
        }finally{
            set({isLoading:false})
        }
    },
    logoutCollege: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get(AllRoot.CollegeLogout, { withCredentials: true })
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: null })
            toast.success("Logout successfully")
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
        }
    },
    updateCollege: async (College) => {
        set({isLoading:true})
        try {
            const response = await axios.put(AllRoot.CollegeUpdate, College, { withCredentials: true })
            
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error?.response?.data.message as string)
        }finally{
           set({isLoading:false})
        }
    },
    getCollege: async () => {
        try {
            console.log("Ok Server thik hai")
            const response = await axios.get(AllRoot.CollegeGet, { withCredentials: true })
            
            if (response.status > 300) {
                alert(response.data.message)
                return;
            }
            set({ college: response.data })
        } catch (e) {
            const error = e as AxiosError<{message:string}>
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

export const useCollegeClassPriceStore = create<CollegeClassPricingStoreInfo>((set,get)=>({
    allClassPricing:[],
    createClassPrice:async(classInfo:CollegeClassPricingInfo)=>{
        
        try {
            const response = await axios.post<CollegeClassPricingInfo>(AllRoot.CollegeClassPricingCreate,classInfo,{withCredentials:true})
            if(response.status>=400){
                throw Error("Error while create class Price")
            }
            const data = response.data;
            const previous = get().allClassPricing
            set({allClassPricing:[...previous,data]})

        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
            console.log(error)
        }
    },
    updateClassPrice:async(classInfo:CollegeClassPricingInfo)=>{
        try {
            const response = await axios.put<CollegeClassPricingInfo>(AllRoot.CollegeClassPricingUpdate,classInfo,{withCredentials:true})
            if(response.status>=400){
                throw Error("Error while update class Price")
            }
            const data = response.data;
            const previous = get().allClassPricing.filter((item)=>item.id===classInfo.id)
            set({allClassPricing:[...previous,data]})

        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
            console.log(error)
        }
    },
    deleteClassPrice:async(classPriceId:number)=>{
        try {
            const response = await axios.delete<CollegeClassPricingInfo>(AllRoot.CollegeClassPricingDelete,{params:{classPriceId},withCredentials:true})
            if(response.status>=400){
                throw Error("Error while create class Price")
            }
            const data = response.data;
            const previous = get().allClassPricing.filter((item)=>item.id!==data.id)
            set({allClassPricing:previous})
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
            console.log(error)
        }
    },
    getClassPrice:async()=>{
        console.log(import.meta.url)
        try {
            const response = await axios.get(AllRoot.CollegeClassPricingGet)
            if(response.status>=400){
                throw Error("Error while create class Price")
            }
            const data = response.data;
            set({allClassPricing:data})
        } catch (e) {
            const error = e as AxiosError<{message:string}>
            toast.error(error.response?.data.message as string)
            console.log(error)
        }
    }
}))


