interface Question {
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'rating';
}

const questionBank: Record<string, Record<string, Question[]>> = {
  technology: {
    executive: [
      {
        question: 'What is your biggest challenge in digital transformation?',
        options: [
          'Legacy systems integration',
          'Team adoption',
          'Budget constraints',
          'Security concerns',
        ],
        type: 'multiple-choice',
      },
      {
        question: 'How do you measure success in tech initiatives?',
        options: [
          'ROI metrics',
          'User adoption',
          'Performance improvements',
          'Innovation outcomes',
        ],
        type: 'multiple-choice',
      },
    ],
    developer: [
      {
        question: 'What development practices do you value most?',
        options: [
          'Clean code principles',
          'Agile methodologies',
          'Code reviews',
          'Automated testing',
        ],
        type: 'multiple-choice',
      },
      {
        question: 'Describe your approach to problem-solving.',
        type: 'text',
      },
    ],
    manager: [
      {
        question: 'How do you prioritize technical debt vs new features?',
        options: [
          '80% features, 20% debt',
          '50/50 split',
          '70% debt, 30% features',
          'Depends on sprint goals',
        ],
        type: 'multiple-choice',
      },
    ],
  },
  healthcare: {
    executive: [
      {
        question: 'What is your top priority in patient care innovation?',
        options: [
          'Telemedicine',
          'Data analytics',
          'Patient experience',
          'Cost reduction',
        ],
        type: 'multiple-choice',
      },
    ],
    doctor: [
      {
        question: 'How has technology improved your practice?',
        type: 'text',
      },
    ],
  },
  finance: {
    executive: [
      {
        question: 'What financial metrics drive your decisions?',
        options: [
          'Revenue growth',
          'Cost optimization',
          'Risk management',
          'Shareholder value',
          'Blockchain',
          'AI in trading',
          'Mobile banking',
          'RegTech',
        ],
        type: 'multiple-choice',
      },
    ],
  },
  default: {
    general: [
      {
        question: 'What inspires you most about building things?',
        options: [
          'Creative expression',
          'Problem solving',
          'Collaboration',
          'End results',
        ],
        type: 'multiple-choice',
      },
      {
        question: 'Share a moment when teamwork made a difference.',
        type: 'text',
      },
    ],
  },
};

export function getQuestionForUser(
  industry: string,
  position: string,
  stepNumber: number
): Question {
  // Try to get industry-specific, position-specific question
  const industryQuestions = questionBank[industry];
  if (industryQuestions) {
    const positionQuestions = industryQuestions[position];
    if (positionQuestions && positionQuestions[stepNumber]) {
      return positionQuestions[stepNumber];
    }
    // Fallback to any position in that industry
    const anyPositionQuestions = Object.values(industryQuestions).flat();
    if (anyPositionQuestions[stepNumber]) {
      return anyPositionQuestions[stepNumber];
    }
  }

  // Fallback to default questions
  const defaultQuestions = questionBank.default.general;
  return defaultQuestions[stepNumber % defaultQuestions.length] || defaultQuestions[0];
}
