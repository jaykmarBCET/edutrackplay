import { StudentInfo } from "../../types/types";


const studentKeys : (keyof StudentInfo)[] = ['address','avatar','cardId','coverImage','createdAt','dob','email','gender','id','isBlocked','name','parentId','password','phone','score','updatedAt']

function isStudentKey(key:string): key is keyof StudentInfo{
    return studentKeys.includes(key as keyof StudentInfo)
}

export {
    isStudentKey
}