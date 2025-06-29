import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";

import { sendEmail } from "../utils/sendMail.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString() //generate 6 digit otp 
}
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        throw new ApiError(404, "user are not found")
    }


    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save({ validateBeforeSave: false });
    const subject = 'Ox-Kid: Your Password Reset OTP';

const text = `
Hello,

You requested to reset your password for your Ox-Kid account. Use the OTP below to proceed:

Your OTP: ${otp}

This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.

If you did not request a password reset, please ignore this email or contact our support team immediately.

Thank you,  
The Ox-Kid Team
`;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px;">
    <h1 style="color: #2196F3; text-align: center;">Password Reset Request</h1>
    <p>Hello,</p>
    <p>You requested to reset your password for your <strong>Ox-Kid</strong> account. Use the OTP below to proceed:</p>
    <h2 style="text-align: center; color: #2196F3;">${otp}</h2>
    <p>This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.</p>
    <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
    <p style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
      Thank you,<br>
      The Ox-Kid Team
    </p>
  </div>
</body>
</html>
`;


    await sendEmail(email, subject, text, html);
    return res.status(200).json(
        new ApiResponse(200, "otp send on your email")
    )



});

export { forgetPassword }