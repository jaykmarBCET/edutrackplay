

export interface ClassInfo{
    id?:number;
    name:string;
    stander:string;
    field:string;
    studentId:number;
    collegeId:number;
    coachingId:number;
    session?:Date
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CoachingClassPricingInfo{
    id?:number;
    price:number;
    coachingId:number;
    stander:number;
    duration:Date;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CoachingFeePaymentByStudentInfo{
    id?:number;
    transactionId:string;
    studentId:number;
    coachingId:number;
    classId:number;
    price:number;
    expireDuration:number;
    status:string;
    coachingClassPricingId:number;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CoachingStudentInfo{
    id?:number;
    rollNumber:number;
    collegeId:number;
    studentId:number;
    classId:number;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CoachingInfo {
  id?: number;
  address: string;
  field: string;
  title: string;
  name: string;
  owner_name: string;
  owner_email: string;
  owner_phone?: number;
  password: string;
  description?: string;
  images?: string[];
  logo: string;
  phone: number;
  email: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CollegeClassPricingInfo {
  id?: number;
  price: number;
  collegeId: number;
  stander: number;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CollegeFeePaymentByStudentInfo {
  id?: number;
  transactionId: string;
  studentId: number;
  collegeId: string;
  classId: number;
  price: number;
  collegeClassPricingId: number;
  expireDuration: number;
  status?: "Payment failed" | "Payment Pending" | "Payment Successfully";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CollegeStudentInfo {
  id?: string;
  rollNumber: number;
  collegeId: number;
  studentId: number;
  classId: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface CollegeInfo {
  id?: number;
  title: string;
  name: string;
  address: string;
  field: string;
  owner_name: string;
  owner_email: string;
  owner_phone?: number;
  password: string;
  description?: string;
  images?: string[];
  logo: string;
  phone: number;
  email: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ParentInfo {
  id?: number;
  name: string;
  gender?: "Female" | "Male"; 
  address: string;
  email: string;
  phone: number;
  age: number;
  password: string;
  isVerified?: boolean;
  otp?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface StudentInfo {
  id?: number;
  name: string;
  gender?: "Female" | "Male";
  address: string;
  email: string;
  phone?: number;
  password: string;
  score?: number;
  isBlocked?: boolean;
  parentId?: number;
  avatar: string;
  coverImage?: string;
  cardId?: string;
  dob: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthParentInfo{
  id:number;
  email:string;
}

export interface StudentAdmissionRequestInfo{
  id?:number;
  studentId:number;
  collegeId?:number;
  coachingId?:number;
  field:string;
  title:string;
  stander:string;
  description:string;
  isAccept?:boolean;
  reason?:string;
  createdAt?:Date;
  updatedAt?:Date;
}