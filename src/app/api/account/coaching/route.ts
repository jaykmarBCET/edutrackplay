import { Coaching } from "@/models/coaching.model";
import { College } from "@/models/college.model";
import { StudentAdmissionRequest } from "@/models/student_admmission.model";
import { authStudent } from "@/services/auth";
import { sendEmail } from "@/services/email";
import { ValidateData } from "@/validation/validate";
import { NextRequest, NextResponse } from "next/server";

interface bodyInfo{
    collegeId?:number;
    coachingId?:number;
    field:string;
    title:string;
    stander:string;
    description:string;
}


export const POST = async(req:NextRequest)=>{
    const {collegeId,coachingId,field, title,stander, description}:bodyInfo =  await req.json()
    if(!(collegeId || coachingId )|| !field || !title || !stander || !description){
        return NextResponse.json({message:"all field required"}, { status:400})
    }
    const student = await authStudent(req);
    if(student.message){
        return NextResponse.json({message:student.message}, { status:student.status})
    }

    if(ValidateData.setData(collegeId).isNumber().isValid()){
        // TODO: college admission
        if(!ValidateData.setData(title).isString().minLength(10).maxLength(30).isValid()){
            return NextResponse.json({message:"title at least 10 character and max 30 character"},{status:400})
        }
        if(!ValidateData.setData(field).isString().minLength(3).maxLength(30).isValid()){
            return NextResponse.json({message:"field at least 3 character and max 30 character"},{status:400})
        }
        if(!ValidateData.setData(stander).isNumber().minDigit(1).maxDigit(2).minValue(5).maxValue(13).isValid()){
            return NextResponse.json({message:"stander at  5 class and max 13 class"},{status:400})
        }
        if(!ValidateData.setData(description).isString().minLength(20).maxLength(100).isValid()){
            return NextResponse.json({message:"description at least 20 and max 100 character"}, {status:400})
        }
        const college =  await College.findOne({where:{id:collegeId}, attributes:{include:['email']}})
        if(!college){
            return NextResponse.json({message:"college not found"}, {status:404})
        }

        const html = `
              <h3>  Requesting for student admission </h3>
              <p> Description: ${description}</p>
              <p> Stander: ${stander}</p>
              <p> Field: ${field}</p>
              

        `
        await sendEmail({subject:title, html:html,email:college.get().email})
        const newStudentCollegeAdmission  = await StudentAdmissionRequest.create({studentId:student.student?.id as number,description,collegeId:collegeId!,title, field,stander,isAccept:false,reason:"",createdAt:new Date(),updatedAt:new Date()})
        
        if(!newStudentCollegeAdmission){
            return NextResponse.json({message:"something went wrong while creating request"}, { status:500})
        }

    }else{
        // TODO: coaching admission
        if(!ValidateData.setData(title).isString().minLength(10).maxLength(30).isValid()){
            return NextResponse.json({message:"title at least 10 character and max 30 character"},{status:400})
        }
        if(!ValidateData.setData(field).isString().minLength(3).maxLength(30).isValid()){
            return NextResponse.json({message:"field at least 3 character and max 30 character"},{status:400})
        }
        if(!ValidateData.setData(stander).isNumber().minDigit(1).maxDigit(2).minValue(5).maxValue(13).isValid()){
            return NextResponse.json({message:"stander at  5 class and max 13 class"},{status:400})
        }
        if(!ValidateData.setData(description).isString().minLength(20).maxLength(100).isValid()){
            return NextResponse.json({message:"description at least 20 and max 100 character"}, {status:400})
        }
        
         const html = `
              <h3>  Requesting for student admission </h3>
              <p> Description: ${description}</p>
              <p> Stander: ${stander}</p>
              <p> Field: ${field}</p>
              

        `
        const coaching = await Coaching.findOne({where:{id:coachingId}, attributes:{include:['email']}})
        if(!coaching){
            return NextResponse.json({message:"coaching not found"}, {status:404})
        }
        const newStudentCollegeAdmission  = await StudentAdmissionRequest.create({studentId:student.student?.id as number,description,title, field,stander,isAccept:false,reason:"",createdAt:new Date(),updatedAt:new Date(),coachingId})
        await sendEmail({subject:title, html:html,email:coaching?.get().email})
        
        if(!newStudentCollegeAdmission){
            return NextResponse.json({message:"something went wrong while creating request"}, { status:500})
        }
    }
}

export const GET = async(req:NextRequest)=>{
    const student = await authStudent(req);
    if(student.message){
        return NextResponse.json({message:student.message}, { status:student.status})
    }
    const allRequest = StudentAdmissionRequest.findAll({where:{studentId:student.student?.id}})
    return NextResponse.json(allRequest, { status:200})
}

export const DELETE = async(req:NextRequest, {params}:{params:{requestId:number}})=>{
    const student = await authStudent(req);
    if(student.message){
        return NextResponse.json({message:student.message}, {status:student.status})
    }
    const requestId = params.requestId;
    if(!requestId && requestId<=0){
        return NextResponse.json({message:"invalid requestId"})
    }
    const deleteRequest = await StudentAdmissionRequest.destroy({where:{studentId:student.student?.id, id:requestId}})

    if(!deleteRequest){
        return NextResponse.json({message:"Invalid requestId"})
    }
    return NextResponse.json({message:"deleted successfully"}, {status:200})    
}