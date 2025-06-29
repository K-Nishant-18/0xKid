const parseGeminiExplanation = (text, concept = "Concept") => {
  const lines = text.split("\n");
  let inCodeBlock = false;
  let currentSection = "";
  let sectionMap = {
    definition: "",
    importance: "",
    codeExplanation: "",
    conclusion: "",
    code: ""
  };

  const headingMap = {
    "definition": "definition",
    "why it matters": "importance",
    "simple code example": "codeExplanation",
    "code example": "codeExplanation",
    "breakdown": "codeExplanation",
    "conclusion": "conclusion",
    "summary": "conclusion"
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Detect heading like "**Definition:**"
    if (trimmed.startsWith("**") && trimmed.endsWith(":**")) {
      const heading = trimmed.replace(/\*\*/g, "").replace(":", "").trim().toLowerCase();

      const key = headingMap[heading] || ""; // fallback to ignore unknown
      currentSection = key;
      return;
    }

    // Handle code blocks
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      sectionMap.code += line + "\n";
    } else if (currentSection) {
      sectionMap[currentSection] += line + " ";
    }
  });

  return {
    title: `Explanation of: ${concept}`,
    definition: sectionMap.definition.trim(),
    importance: sectionMap.importance.trim(),
    codeExplanation: sectionMap.codeExplanation.trim(),
    conclusion: sectionMap.conclusion.trim(),
    code: sectionMap.code.trim()
  };
};

export { parseGeminiExplanation };
