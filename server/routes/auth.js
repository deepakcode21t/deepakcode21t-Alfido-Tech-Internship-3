import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {requireAuth} from "../middleware/auth.js";
const router=express.Router();
const secret=()=>process.env.JWT_SECRET||"development_secret_change_me";
function createToken(user){return jwt.sign({id:user._id.toString(),email:user.email},secret(),{expiresIn:"1h"})}
function setCookie(res,token){res.cookie("token",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",maxAge:3600000})}
router.post("/register",async(req,res)=>{try{const{name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({success:false,message:"Name, email and password are required"});if(password.length<6)return res.status(400).json({success:false,message:"Password must be at least 6 characters"});const normalized=email.toLowerCase().trim();if(await User.findOne({email:normalized}))return res.status(409).json({success:false,message:"Email is already registered"});const passwordHash=await bcrypt.hash(password,12);const user=await User.create({name:name.trim(),email:normalized,passwordHash});setCookie(res,createToken(user));res.status(201).json({success:true,message:"Registration successful",user:{id:user._id,name:user.name,email:user.email}})}catch(e){console.error(e.message);res.status(500).json({success:false,message:"Server error during registration"})}});
router.post("/login",async(req,res)=>{try{const{email,password}=req.body;if(!email||!password)return res.status(400).json({success:false,message:"Email and password are required"});const user=await User.findOne({email:email.toLowerCase().trim()});if(!user||!(await bcrypt.compare(password,user.passwordHash)))return res.status(401).json({success:false,message:"Invalid email or password"});setCookie(res,createToken(user));res.json({success:true,message:"Login successful",user:{id:user._id,name:user.name,email:user.email}})}catch(e){res.status(500).json({success:false,message:"Server error during login"})}});
router.get("/me",requireAuth,async(req,res)=>{try{const user=await User.findById(req.user.id).select("_id name email createdAt");if(!user)return res.status(404).json({success:false,message:"User not found"});res.json({success:true,user})}catch{res.status(500).json({success:false,message:"Failed to load user"})}});
router.post("/logout",(req,res)=>{res.clearCookie("token",{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production"});res.json({success:true,message:"Logged out successfully"})});
export default router;
