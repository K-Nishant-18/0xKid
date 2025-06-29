const parseCodeReviewResponse = (text, code = '') => {
  const sections = {
    strengths: '',
    issues: '',
    improvements: '',
    bestPractices: '',
    improvedCode: ''
  };

  const lines = text.split('\n');
  let current = '';
  let inCodeBlock = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('1.') || trimmed.startsWith('✅')) {
      current = 'strengths';
      return;
    } else if (trimmed.startsWith('2.') || trimmed.startsWith('❗')) {
      current = 'issues';
      return;
    } else if (trimmed.startsWith('3.') || trimmed.startsWith('💡')) {
      current = 'improvements';
      return;
    } else if (trimmed.startsWith('4.') || trimmed.startsWith('🛡️')) {
      current = 'bestPractices';
      return;
    }

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock && current === 'improvements') {
      sections.improvedCode += line + '\n';
    } else if (current) {
      sections[current] += line + ' ';
    }
  });

  return {
    code,
    strengths: sections.strengths.trim(),
    issues: sections.issues.trim(),
    improvements: sections.improvements.trim(),
    improvedCode: sections.improvedCode.trim(),
    bestPractices: sections.bestPractices.trim()
  };
};

export { parseCodeReviewResponse };
