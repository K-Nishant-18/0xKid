import { CodeReview } from "../models/codeReview.model.js";
import { Concept } from "../models/concept.model.js";
import { ProjectIdeas } from "../models/projectIdea.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateGeminiResponse } from "../utils/gemini.js";
import { parseSingleProjectIdea } from "../utils/parseProject.js";
import { parseCodeReviewResponse } from "../utils/paseCodeReview.js";
import { parseGeminiExplanation } from "../utils/paseGeminiAiExplanation.js";



// Helper: Age group
const getAgeGroup = (age) => {
  if (age <= 12) return "child";
  if (age <= 17) return "teenager";
  return "adult";
};
// Prompt builders
const buildConceptPrompt = (concept) => `
You are a kind and patient programming teacher. Explain the topic: **"${concept}"** to a complete beginner who is just starting to learn programming.

Use the following simple and clear structure with markdown formatting:

**Definition:**  
What is "${concept}"? Explain it in very simple words so that a school student can understand.

**Why it matters:**  
Why is this concept useful or important in real life or in programming? Try to use a simple and relatable example or story.

**Simple Code Example:**  
Write a short and easy code example that shows how "${concept}" works.  
Use a popular language like JavaScript, Python, or Java.  
Wrap the code in triple backticks (\`\`\`) and write clear comments on what each line does.

**Breakdown:**  
Explain what each part of the code is doing and what the output will be. Break it into steps so it’s easy to follow.

**Conclusion:**  
Give a short summary to help them remember what "${concept}" means and when to use it.

Always keep your explanation short, clear, and friendly — like you're talking to a beginner who is excited but a little nervous. Avoid using hard words or advanced topics. Format everything neatly using markdown.
`;



const buildReviewPrompt = (code, language = "JavaScript") => {
  const formattedLanguage = language.trim();
  const codeBlockLang = formattedLanguage.toLowerCase();

  return `
You are a senior software engineer. Review the following **${formattedLanguage}** code and give clear, beginner-friendly feedback.

\`\`\`${codeBlockLang}
${code}
\`\`\`

Respond in this structure:

1. ✅ **Strengths**  
2. ❗ **Issues** (logic, readability, security, performance)  
3. 💡 **Suggested Improvements** (with improved code)  
4. 🛡️ **Best Practices** or tips  

Please explain using simple terms, like you're mentoring a junior developer.
  `;
};

export { buildReviewPrompt };

const buildProjectPrompt = (age, interests) => {
  const ageGroup = getAgeGroup(age);
  return `
You are an AI mentor. Suggest ONE project idea for a ${ageGroup} aged ${age} who is interested in ${interests || "technology"}.

Format your response EXACTLY like this:

📌 Title: <Title>
🎯 Purpose: <What the project does>
🛠️ Tools/Tech: <Beginner-friendly tools/technologies>
🚀 Learning Outcome: <What the learner will gain>

Use clear, simple language. Avoid long paragraphs. Do not include extra explanations.
`;
};





const explainConcept = asyncHandler(async (req, res) => {
  const { concept } = req.body;
  const userId =req.user._id;

  if (!concept) {
    throw new ApiError(400, "Concept are required");
  }

 const prompt = buildConceptPrompt(concept);
 const rawAnswer = await generateGeminiResponse(prompt);

 if(!rawAnswer){
  throw new ApiError(401, "some error while create the gemini response ")
 }
 const structured = parseGeminiExplanation(rawAnswer,concept);

 const savedConept = await Concept.create({
  user : userId,
  concept,

  explanation : structured
 });

 if(!savedConept){
  throw new ApiError(401, "error while save explanation concept in database")
 }

  return res.status(200).json(
    new ApiResponse(200, "explain the concept successfully",structured)
  )
});


const reviewCode = asyncHandler(async(req,res)=>{

  const { code, language, concept = "Code Review", tags = [] } = req.body;
  const userId =req.user._id;

  if (!code && !language) {
    throw new ApiError(400, "Code is required");
  }

  // Build prompt and get raw AI response
  const prompt = buildReviewPrompt(code, language);
  const rawAnswer = await generateGeminiResponse(prompt);

  if (!rawAnswer) {
    throw new ApiError(500, "Error generating AI response");
  }

  // Parse the response into structured review
  const review = parseCodeReviewResponse(rawAnswer, code);

  // Save to MongoDB
  const savedReview = await CodeReview.create({
    user : userId,
    concept,
    code,
    review,
    language,
    tags,
    reviewer: "AI-Gemini"
  });
console.log(savedReview)
  if (!savedReview) {
    throw new ApiError(500, "Failed to save review to database");
  }

  


  return res.status(200).json(
    new ApiResponse(200, "Review the code successfully",review)
  )
});



const suggestProjectIdeas = async (req, res) => {
  const { age, interests } = req.body;
  const userId = req.user?._id || req.user_id; // Support either source

  // Validate input
  if (!age || !interests) {
    throw new ApiError(400, "Age and interests are required");
  }

  // Generate AI project idea
  const prompt = buildProjectPrompt(age, interests);
  const rawAnswer = await generateGeminiResponse(prompt);

  // Parse single structured project idea
  const structure = parseSingleProjectIdea(rawAnswer);

  // Validate the parsed structure
  if (!structure.title || !structure.purpose || !structure.tools || !structure.outcome) {
    throw new ApiError(422, "Failed to extract a complete project idea from AI response");
  }

  // Save project idea in DB
  const savedProject = await ProjectIdeas.create({
    user: userId, // ✅ Correct user reference
    age,
    interests,
    ideas: [structure], // Save as array
  });

  // Optionally link it to the User document
  await User.findByIdAndUpdate(userId, {
    $push: { projectIdeas: savedProject._id },
  });

  // Return response
  return res.status(201).json(
    new ApiResponse(201, "Project idea generated and saved successfully", {
      ageGroup: getAgeGroup(age),
      project: savedProject,
    })
  );
};











export {
    explainConcept,
    reviewCode,
    suggestProjectIdeas,
    
}
