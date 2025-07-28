import {create} from 'zustand'
import axios,{AxiosError}  from 'axios'
import { ParentInfo,StudentInfo } from '../../types/types'
import {toast} from 'react-hot-toast'
import { AllRoot } from '@/constants/Routes'

export interface ParentStoreInfo{
    parent:ParentInfo | undefined;
    student:StudentInfo[] | []
    createParent:(parent: ParentInfo)=>Promise<void>;
    updateParent:(parent:ParentInfo)=>Promise<void>;
    getParent:()=>Promise<void>;
    addChildren:(student:StudentInfo)=>Promise<void>;
}


export const useParentStore = create<ParentStoreInfo>((set)=>({
    parent:undefined,
    student:[],
    createParent:async(parent)=>{
        try{
          const response = await axios.post(AllRoot.ParentRegister,parent)
          if(response.status<300){
            set({parent:response.data})
            toast.success("Created successfully")
          }
        }catch(e){
            const error = e as AxiosError<{message:string}>
            toast.error(error.message)
        }
    },
    updateParent: async(parent)=>{
        const response = await axios.put(AllRoot.ParentUpdate,parent,{withCredentials:true})
        if(response.status>350){
            toast.error(response.data.message)
            return;
        }
        set({parent:response.data})
    },
    getParent:async()=>{
        try {
            const response = await axios.get(AllRoot.ParentGet,{withCredentials:true})
            if(response.status<350){
                const data = response.data.data;
                set({parent:data})
            }
        } catch (error) {
            console.log(error)
        }
    },
    getChildren:async()=>{
        const response = await axios.get(AllRoot.ParentGetChildren,{withCredentials:true})
        if(response.status<350){
            set({student:response.data.data})
            return
        }
        toast.error(response.data.message)

    },
    addChildren:async(student)=>{
        const response = await axios.post(AllRoot.ParentAddChildren,student,{withCredentials:true})

        if(response.status<350){
            set({student:response.data.data})
            return
        }
        toast.error(response.data.message)
    }
}))