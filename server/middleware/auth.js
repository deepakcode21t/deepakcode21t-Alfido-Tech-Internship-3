import jwt from "jsonwebtoken";
export function requireAuth(req,res,next){const token=req.cookies?.token;if(!token)return res.status(401).json({success:false,message:"Authentication required"});try{req.user=jwt.verify(token,process.env.JWT_SECRET||"development_secret_change_me");next()}catch{return res.status(401).json({success:false,message:"Invalid or expired token"})}}
