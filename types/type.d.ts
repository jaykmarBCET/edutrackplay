
export interface user {
    id: number;
    email: string;
    phone: number
}

export interface Student {
    id: number;
    name: string;
    phone: number;
    cardId: number;
    score: number;
    parentId: number;
    gender: enum;
    address: string;
    email: string;
    password: string;
    isBLocked: boolean;
    avatar: string;
    coverImage: string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Parent {
    id: number;
    name: string;
    phone: number;
    gender: enum | "MALE";
    address: string;
    email: string;
    password: string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    isVerified:boolean;
    otp?:number;
}