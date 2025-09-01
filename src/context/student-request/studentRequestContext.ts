import {createContext} from 'react'
import { StudentAdmissionRequestInfo } from '../student/student.context'


export interface RequestInfo{
    requestId:number;
    isAccept:boolean;
    reason:string;
}

export interface StudentRequestSubmit {
    request:StudentAdmissionRequestInfo|null
    getRequestInfo:(requestId:number)=>Promise<void>
    accept:(data:RequestInfo)=>Promise<void>
}



