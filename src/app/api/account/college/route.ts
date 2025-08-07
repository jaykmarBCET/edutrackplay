import { NextRequest, NextResponse } from "next/server";
import { CollegeInfo } from "../../../../../types/types";
import { collegeValidate } from "@/validation/validate";
import bcrypt from "bcryptjs";
import { authCollege } from "@/services/auth";
import { PrismaClient } from "@/generated/prisma";
import { uploadImage } from "@/utility/uploadCloudinary";

const prisma = new PrismaClient()


export const POST = async (req: NextRequest) => {
    // create college account 
    const formData: FormData = await req.formData()
    
    const url = await uploadImage(formData.get("logo") as File)

    const body: CollegeInfo = {
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        password: formData.get("password") as string,
        field: formData.get("field") as string,
        description: formData.get("description") as string,
        logo: url,
        owner_email: formData.get("owner_email") as string,
        owner_name: formData.get("owner_name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        owner_phone: formData.get("owner_phone") as string,
        website: formData.get("website") as string
    }
    
    const response = collegeValidate.safeParse(body)
    
    if (response.error) {
        return NextResponse.json({ message: response.error.message as string }, { status: 400 })
    }
    if (!response.success) {
        return NextResponse.json({ message: "all field required" })
    }
    
    const alreadyHaveAnAccount = await prisma.college.findFirst(
        { where: { OR: [{ email: response.data.email }, { title: response.data.title }, { phone: response.data.phone }, { name: response.data.name }] } }
    )
    if (alreadyHaveAnAccount) {
        return NextResponse.json({ message: "already have an account" }, { status: 400 })
    }
    const hashPassword = await bcrypt.hash(response.data.password, 10) as string
    const newCollege = await prisma.college.create({
        data: {
            name: response.data.name,
            title: response.data.title,
            phone: response.data.phone,
            email: response.data.email,
            owner_email: response.data.owner_email,
            owner_name: response.data.owner_name,
            owner_phone: response.data.owner_phone as string,
            logo: response.data.logo,
            description: response.data.description,
            field: response.data.field,
            address: response.data.address,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    if (!newCollege) {
        return NextResponse.json({ message: "something went wrong while creating college" }, { status: 500 })
    }

    return NextResponse.json({ ok: "college account created successfully" }, { status: 200 })
}

export const GET = async (req: NextRequest) => {
    
    try {
        const response = await authCollege(req)
       
        if (response?.message) {
            return NextResponse.json({ message: response.message }, { status: response.status })
        }
        return NextResponse.json(response.college, { status: response.status })
    } catch (error) {
        const serverError = error as Error;
        return NextResponse.json({ message: "something went wrong", error: serverError.message }, { status: 500 })
    }
}


export const PUT = async (req: NextRequest) => {
    try {
        const response = await authCollege(req)
        
        if (response?.message) {
            return NextResponse.json({ message: response.message }, { status: response.status })
        }
        const college = await prisma.college.findFirst({ where: { email: response.college?.get().email, id: response.college?.get().id } })
        if (!college) {
            return NextResponse.json({ message: "college not found" }, { status: 404 })
        }
        const { logo, title, name, address, field, password, description, images, phone, website, owner_email, owner_name, owner_phone } = await req.json() as CollegeInfo
        await prisma.college.update({
            where: { id: college.id },
            data: {
                logo: logo.trim() !== '' ? logo : college.logo as string,
                title: title.trim() !== "" ? title : college.title,
                name: name.trim() !== "" ? name : college.name,
                address: address.trim() !== "" ? address : college.address,
                field: field.trim() !== "" ? field : college.field,
                password: password.trim() !== "" ? await bcrypt.hash(password, 10) : college.password,
                description: description?.trim() !== "" ? description : college.description,
                images: images!.length > 0 ? [...college.images!, ...images!] : [...college.images!] as string[],
                phone: phone,
                website: website?.trim() !== "" ? website : college.website,
                owner_email: owner_email.trim() !== "" ? owner_email : college.owner_email,
                owner_phone: owner_phone ? owner_phone : college.owner_phone,
                owner_name: owner_name.trim() !== "" ? owner_name : college.owner_name
            }
        })



        return NextResponse.json(college, { status: 200 })
    } catch (error) {
        const serverError = error as Error;
        return NextResponse.json({ message: "something went wrong", error: serverError.message }, { status: 500 })
    }
}
