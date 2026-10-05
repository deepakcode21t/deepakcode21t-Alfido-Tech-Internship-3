import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { requireAuth } from "./middleware/auth.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.get("/api/health",(req,res)=>res.json({success:true,message:"Task 3 API is running"}));
app.use("/api/auth",authRoutes);
app.get("/api/protected",requireAuth,(req,res)=>res.json({success:true,message:"You reached a protected route.",user:{id:req.user.id,email:req.user.email}}));
app.use((req,res)=>res.status(404).json({success:false,message:"Route not found"}));
async function start(){try{await mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/alfido_task3");console.log("MongoDB connected");app.listen(PORT,()=>console.log(`Server running at http://localhost:${PORT}`));}catch(e){console.error("MongoDB connection failed:",e.message);process.exit(1)}}
start();
