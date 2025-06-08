import nodemailer from 'nodemailer'

interface sendEmailInfo{
    subject:string;
    html:string;
    email:string;
}

const transporter = nodemailer.createTransport({
   service:'gmail',
    secure:process.env.MODE==='production'?true:false,
    auth:{
        user:process.env.USER_EMAIL_SEND,
        pass:process.env.USER_EMAIL_PASSWORD
    }
})


export const sendEmail = async({subject,html,email}:sendEmailInfo)=>{

   await transporter.sendMail({
        to:process.env.USER_EMAIL_SEND,
        from:email,
        subject,
        html,
        
    })
}