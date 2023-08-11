import PostModel from "../Models/PostModel.js";
// import mongoose from "mongoose";

// Create new comment
export const createComment= async(req,res)=>{
    const newComment= new PostModel(req.body)

    try {
        await newComment.save()
        res.status(200).json(newComment);

    } catch (error) {
        res.status(500).json(error)
    }
};   