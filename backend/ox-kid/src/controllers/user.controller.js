import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessAndRefreshToken = async (uId) => {
  try {
    const user = await User.findById(uId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    (user.refreshToken = refreshToken),
      await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      message.error || "some error while generate accessToken and refreshToken "
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email, age, confirmPassword } = req.body;

  if (
    [name, age, email, password, confirmPassword].some(
      (field) => !field || field.toString().trim() === ""
    )
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(403, "user all ready register");
  }

  if (password !== confirmPassword) {
    throw new ApiError(401, "Confirm password does not match");
  }

  const user = await User.create({
    name,
    password,
    age,
    email,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "some internal error while register user ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "user register successfully ", createdUser));
});




const UserLogIn = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new ApiError(402, "password or email are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(402, "user is not register ");
  }

  const validPassword = await user.isPassWordCorrect(password);

  if (!validPassword) {
    throw new ApiError(403, "give valid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200,"user loggedIn successfully" ,{
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});


const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

const options = {
  httpOnly : true,
  secure :true
}

return res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
  new ApiResponse(
    200, "user logout successfully", {}
  )
)

});



const getCurrentUser = asyncHandler(async (req,res)=>{
   const userID = req.user._id;

   const user = await User.findById(userID).select("-password -refreshToken");

   if(!user){
    throw new ApiError(404, "user not found ");
   }

   return res.status(200).json(
    new ApiResponse(200, "user fetch successfully",user)
   );




});


const updatePreferences = asyncHandler(async (req,res)=>{
  const userId = req.user._id;
  const {theme,fontSize,notifications} =req.body;

  const user = await User.findById(userId);
  if(!user){
    throw new ApiError(404, "user not found ");


  }
user.preferences.theme=theme,
user.preferences.fontSize=fontSize,
user.preferences.notifications=notifications;

await user.save({validateBeforeSave : false});

return res.status(200).json(
  new ApiResponse(
    200, "preferences update successfully",user.preferences 
  )
)


});


const getUser= asyncHandler(async (req,res)=>{
  const {id} =req.params;

  const user = await User.findById(id).select("-password -refreshToken");

  if(!user){
    throw new ApiError(404, "user not found ")
  }

  return res.status(200).json(
    new ApiResponse(
      200, "user fetched successfully", user
    )
  );


});


const getUserConcepts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId)

  const user = await User.findById(userId)
    .populate("conceptExplanations");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Fetched concept explanations", user.conceptExplanations)
  );
});




export {
    registerUser,
    UserLogIn,
    logOutUser,
    getCurrentUser,
    updatePreferences,
    getUser,
    getUserConcepts
    
}