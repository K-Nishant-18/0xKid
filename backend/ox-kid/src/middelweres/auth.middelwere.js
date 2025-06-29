import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);
        if(!token){
            throw new ApiError(401, "Unauthorized request")



        }


        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodeToken._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "invalid accessToken");
        }

        req.user=user;
        next();

    } catch (error) {
        throw new ApiError(401, "unauthorized request ")
    }
});