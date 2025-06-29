const parseSingleProjectIdea = (text) => {
  const lines = text.split("\n");
  const idea = {};

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.includes("📌")) {
      idea.title = trimmed.split(/title[:]*\*\*/i).pop().replace(/^[:\-–\s]*/, "").trim();
    } else if (trimmed.includes("🎯")) {
      idea.purpose = trimmed.split(/purpose[:]*\*\*/i).pop().replace(/^[:\-–\s]*/, "").trim();
    } else if (trimmed.includes("🛠️")) {
      idea.tools = trimmed.split(/tools\/tech[:]*\*\*/i).pop().replace(/^[:\-–\s]*/, "").trim();
    } else if (trimmed.includes("🚀")) {
      idea.outcome = trimmed.split(/learning outcome[:]*\*\*/i).pop().replace(/^[:\-–\s]*/, "").trim();
    }
  });

  return idea;
};

export {parseSingleProjectIdea}