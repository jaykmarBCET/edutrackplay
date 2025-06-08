import JWT from 'jsonwebtoken'
export const generateToken = async({email,id}:{email:string,id:number})=>{

    const token = JWT.sign({email,id}, process.env.SECRET_KEY!,{expiresIn:'7d'})
    return token;

}