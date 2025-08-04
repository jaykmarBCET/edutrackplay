import JWT from 'jsonwebtoken'
export const generateToken = ({email,id}:{email:string,id:number})=>{
    console.log(process.env.SECRET_KEY)
    const token = JWT.sign({email,id}, process.env.SECRET_KEY!,{expiresIn:'7d'})
    return token;

}