import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verfiyOtp = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (
        [email, otp, newPassword].some((filed) => filed?.trim() === "")
    ) {
        throw new ApiError(400, "email or otp or new password are required ")
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "user not found")
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        throw new ApiError(400, "invalid or expired otp")
    }


    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save()

    return res.status(200).json(
        new ApiResponse(200, "the password reset successfully")
    )

});

export { verfiyOtp }