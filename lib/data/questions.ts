import type { QuizQuestion } from '@/lib/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'mc_problem_approach',
    type: 'multiple_choice',
    category: 'workstyle',
    text: 'When faced with a complex problem, what is your typical first approach?',
    description: 'Think about how you naturally tackle challenges at work or in personal projects.',
    options: [
      {
        id: 'break_down',
        text: 'Break it down into smaller, manageable parts and tackle them systematically',
        traits: [
          { trait: 'problemSolving', weight: 2 },
          { trait: 'analyticalThinking', weight: 2 },
        ],
      },
      {
        id: 'research_first',
        text: 'Research how others have solved similar problems before starting',
        traits: [
          { trait: 'curiosity', weight: 2 },
          { trait: 'analyticalThinking', weight: 1 },
        ],
      },
      {
        id: 'brainstorm',
        text: 'Brainstorm multiple creative solutions, then evaluate which feels right',
        traits: [
          { trait: 'creativity', weight: 2 },
          { trait: 'problemSolving', weight: 1 },
        ],
      },
      {
        id: 'discuss',
        text: 'Discuss the problem with others to get different perspectives',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'empathy', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'mc_detail_big_picture',
    type: 'multiple_choice',
    category: 'workstyle',
    text: 'Which best describes your working style?',
    options: [
      {
        id: 'detail_focused',
        text: 'I thrive on details and precision - accuracy matters most to me',
        traits: [
          { trait: 'attentionToDetail', weight: 3 },
          { trait: 'persistence', weight: 1 },
        ],
      },
      {
        id: 'big_picture',
        text: 'I prefer seeing the big picture and connecting ideas across domains',
        traits: [
          { trait: 'creativity', weight: 2 },
          { trait: 'leadership', weight: 1 },
        ],
      },
      {
        id: 'balance',
        text: 'I balance between details and strategy depending on the situation',
        traits: [
          { trait: 'problemSolving', weight: 1 },
          { trait: 'analyticalThinking', weight: 1 },
        ],
      },
      {
        id: 'process_driven',
        text: 'I focus on building reliable processes and systems',
        traits: [
          { trait: 'attentionToDetail', weight: 2 },
          { trait: 'analyticalThinking', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'mc_learning_preference',
    type: 'multiple_choice',
    category: 'interests',
    text: 'How do you prefer to learn new skills?',
    options: [
      {
        id: 'hands_on',
        text: 'Hands-on practice and building projects',
        traits: [
          { trait: 'technicalAptitude', weight: 2 },
          { trait: 'persistence', weight: 1 },
        ],
      },
      {
        id: 'structured',
        text: 'Structured courses with clear progression',
        traits: [
          { trait: 'attentionToDetail', weight: 1 },
          { trait: 'persistence', weight: 2 },
        ],
      },
      {
        id: 'social',
        text: 'Discussion groups and learning with others',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'empathy', weight: 1 },
        ],
      },
      {
        id: 'exploration',
        text: 'Self-directed exploration and experimentation',
        traits: [
          { trait: 'curiosity', weight: 3 },
          { trait: 'creativity', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'mc_communication_style',
    type: 'multiple_choice',
    category: 'skills',
    text: 'In group settings, which role do you naturally gravitate toward?',
    options: [
      {
        id: 'leader',
        text: 'Taking charge and organizing the team toward a goal',
        traits: [
          { trait: 'leadership', weight: 3 },
          { trait: 'communication', weight: 1 },
        ],
      },
      {
        id: 'expert',
        text: 'Being the technical expert that others consult',
        traits: [
          { trait: 'technicalAptitude', weight: 2 },
          { trait: 'problemSolving', weight: 2 },
        ],
      },
      {
        id: 'facilitator',
        text: 'Facilitating discussion and ensuring everyone is heard',
        traits: [
          { trait: 'empathy', weight: 2 },
          { trait: 'communication', weight: 2 },
        ],
      },
      {
        id: 'contributor',
        text: 'Contributing focused work and ideas when needed',
        traits: [
          { trait: 'attentionToDetail', weight: 1 },
          { trait: 'persistence', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'mc_satisfaction',
    type: 'multiple_choice',
    category: 'interests',
    text: 'What gives you the most satisfaction in your work?',
    options: [
      {
        id: 'solve_puzzles',
        text: 'Solving complex puzzles and logical challenges',
        traits: [
          { trait: 'problemSolving', weight: 3 },
          { trait: 'analyticalThinking', weight: 2 },
        ],
      },
      {
        id: 'create',
        text: 'Creating something new and visually appealing',
        traits: [
          { trait: 'creativity', weight: 3 },
          { trait: 'attentionToDetail', weight: 1 },
        ],
      },
      {
        id: 'help_others',
        text: 'Helping others learn and grow',
        traits: [
          { trait: 'empathy', weight: 3 },
          { trait: 'communication', weight: 2 },
        ],
      },
      {
        id: 'analyze',
        text: 'Finding insights and patterns in data',
        traits: [
          { trait: 'analyticalThinking', weight: 3 },
          { trait: 'curiosity', weight: 2 },
        ],
      },
      {
        id: 'persuade',
        text: 'Persuading others and driving results',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'leadership', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'mc_frustration',
    type: 'multiple_choice',
    category: 'workstyle',
    text: 'What frustrates you most in a work environment?',
    options: [
      {
        id: 'ambiguity',
        text: 'Unclear requirements or constantly changing direction',
        traits: [
          { trait: 'attentionToDetail', weight: 2 },
          { trait: 'persistence', weight: 1 },
        ],
      },
      {
        id: 'no_creativity',
        text: 'Lack of creative freedom or rigid constraints',
        traits: [
          { trait: 'creativity', weight: 3 },
        ],
      },
      {
        id: 'poor_communication',
        text: 'Poor communication or being left out of discussions',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'empathy', weight: 1 },
        ],
      },
      {
        id: 'no_depth',
        text: 'Surface-level work without intellectual depth',
        traits: [
          { trait: 'curiosity', weight: 2 },
          { trait: 'analyticalThinking', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'mc_tech_comfort',
    type: 'multiple_choice',
    category: 'skills',
    text: 'How comfortable are you with technology and technical concepts?',
    options: [
      {
        id: 'very_comfortable',
        text: 'Very comfortable - I enjoy diving deep into technical topics',
        traits: [
          { trait: 'technicalAptitude', weight: 3 },
          { trait: 'curiosity', weight: 1 },
        ],
      },
      {
        id: 'comfortable',
        text: 'Comfortable - I can learn technical things when needed',
        traits: [
          { trait: 'technicalAptitude', weight: 2 },
          { trait: 'persistence', weight: 1 },
        ],
      },
      {
        id: 'selective',
        text: 'Selectively comfortable - certain tech areas interest me more',
        traits: [
          { trait: 'technicalAptitude', weight: 1 },
          { trait: 'creativity', weight: 1 },
        ],
      },
      {
        id: 'prefer_people',
        text: 'I prefer working with people over technology',
        traits: [
          { trait: 'empathy', weight: 2 },
          { trait: 'communication', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'mc_data_interest',
    type: 'multiple_choice',
    category: 'interests',
    text: 'How do you feel about working with numbers and data?',
    options: [
      {
        id: 'love_data',
        text: 'I love it - finding patterns in data is exciting',
        traits: [
          { trait: 'analyticalThinking', weight: 3 },
          { trait: 'attentionToDetail', weight: 2 },
        ],
      },
      {
        id: 'comfortable_data',
        text: 'Comfortable when it serves a clear purpose',
        traits: [
          { trait: 'analyticalThinking', weight: 2 },
          { trait: 'problemSolving', weight: 1 },
        ],
      },
      {
        id: 'prefer_qualitative',
        text: 'I prefer qualitative information and stories',
        traits: [
          { trait: 'creativity', weight: 2 },
          { trait: 'empathy', weight: 1 },
        ],
      },
      {
        id: 'avoid_data',
        text: 'I try to avoid heavy data work when possible',
        traits: [
          { trait: 'communication', weight: 1 },
          { trait: 'creativity', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'scenario_deadline',
    type: 'scenario',
    category: 'scenario',
    text: 'A major deadline is approaching, but you discover a significant issue with the project. What do you do?',
    description: 'Choose the response that best reflects how you would actually handle this situation.',
    options: [
      {
        id: 'fix_immediately',
        text: 'Drop everything and work to fix the issue, even if it means working extra hours',
        traits: [
          { trait: 'persistence', weight: 3 },
          { trait: 'problemSolving', weight: 2 },
        ],
      },
      {
        id: 'communicate_first',
        text: 'Immediately communicate the issue to stakeholders and propose options',
        traits: [
          { trait: 'communication', weight: 3 },
          { trait: 'leadership', weight: 1 },
        ],
      },
      {
        id: 'analyze_impact',
        text: 'Analyze the issue thoroughly to understand its full impact before acting',
        traits: [
          { trait: 'analyticalThinking', weight: 3 },
          { trait: 'attentionToDetail', weight: 2 },
        ],
      },
      {
        id: 'find_workaround',
        text: 'Look for creative workarounds that address the core need',
        traits: [
          { trait: 'creativity', weight: 3 },
          { trait: 'problemSolving', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'scenario_team_conflict',
    type: 'scenario',
    category: 'scenario',
    text: 'Two team members have different opinions on how to proceed with a project. How do you help resolve this?',
    options: [
      {
        id: 'data_driven',
        text: 'Suggest testing both approaches with data to see which performs better',
        traits: [
          { trait: 'analyticalThinking', weight: 3 },
          { trait: 'problemSolving', weight: 1 },
        ],
      },
      {
        id: 'mediate',
        text: 'Help each person articulate their perspective and find common ground',
        traits: [
          { trait: 'empathy', weight: 3 },
          { trait: 'communication', weight: 2 },
        ],
      },
      {
        id: 'take_charge',
        text: 'Make a decision based on your assessment and help the team move forward',
        traits: [
          { trait: 'leadership', weight: 3 },
          { trait: 'problemSolving', weight: 1 },
        ],
      },
      {
        id: 'hybrid_solution',
        text: 'Propose a hybrid solution that incorporates the best of both ideas',
        traits: [
          { trait: 'creativity', weight: 2 },
          { trait: 'empathy', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'scenario_new_skill',
    type: 'scenario',
    category: 'scenario',
    text: 'Your role requires you to quickly learn a new tool or technology you have never used. What is your approach?',
    options: [
      {
        id: 'documentation',
        text: 'Start with official documentation and work through tutorials systematically',
        traits: [
          { trait: 'persistence', weight: 2 },
          { trait: 'attentionToDetail', weight: 2 },
        ],
      },
      {
        id: 'experiment',
        text: 'Jump in and experiment, learning through trial and error',
        traits: [
          { trait: 'curiosity', weight: 3 },
          { trait: 'technicalAptitude', weight: 1 },
        ],
      },
      {
        id: 'ask_expert',
        text: 'Find someone who knows it well and ask for guidance',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'empathy', weight: 1 },
        ],
      },
      {
        id: 'build_project',
        text: 'Start a small project to learn by building something real',
        traits: [
          { trait: 'technicalAptitude', weight: 2 },
          { trait: 'creativity', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'scenario_user_feedback',
    type: 'scenario',
    category: 'scenario',
    text: 'Users report they are confused by a feature you worked on. How do you respond?',
    options: [
      {
        id: 'user_research',
        text: 'Talk directly to users to understand exactly where confusion arises',
        traits: [
          { trait: 'empathy', weight: 3 },
          { trait: 'curiosity', weight: 2 },
        ],
      },
      {
        id: 'analyze_data',
        text: 'Look at usage data to identify where users are dropping off',
        traits: [
          { trait: 'analyticalThinking', weight: 3 },
          { trait: 'attentionToDetail', weight: 1 },
        ],
      },
      {
        id: 'redesign',
        text: 'Propose a redesigned solution based on usability principles',
        traits: [
          { trait: 'creativity', weight: 3 },
          { trait: 'problemSolving', weight: 1 },
        ],
      },
      {
        id: 'documentation',
        text: 'Create clear documentation or a walkthrough to help users',
        traits: [
          { trait: 'communication', weight: 2 },
          { trait: 'attentionToDetail', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'open_achievement',
    type: 'open_ended',
    category: 'reflection',
    text: 'Describe a project or accomplishment you are particularly proud of. What made it meaningful to you?',
    description: 'This can be from work, school, or personal life. Focus on what you contributed and why it mattered.',
    placeholder: 'Tell us about something you accomplished that you are proud of...',
    minLength: 50,
    maxLength: 1000,
  },
  {
    id: 'open_challenge',
    type: 'open_ended',
    category: 'reflection',
    text: 'Describe a challenging problem you solved. How did you approach it?',
    description: 'Walk us through your thinking process and the steps you took.',
    placeholder: 'Describe the challenge and how you worked through it...',
    minLength: 50,
    maxLength: 1000,
  },
  {
    id: 'open_ideal_day',
    type: 'open_ended',
    category: 'reflection',
    text: 'Describe your ideal work day. What kinds of tasks and interactions energize you?',
    description: 'Be specific about the types of activities that make you feel engaged and fulfilled.',
    placeholder: 'My ideal work day would include...',
    minLength: 50,
    maxLength: 1000,
  },
  {
    id: 'open_learning_goal',
    type: 'open_ended',
    category: 'reflection',
    text: 'What skills or knowledge areas do you most want to develop? Why?',
    description: 'Think about what would help you grow professionally or personally.',
    placeholder: 'The skills I want to develop are...',
    minLength: 50,
    maxLength: 1000,
  },
];

export const TOTAL_QUESTIONS = quizQuestions.length;
export const ESTIMATED_TIME_MINUTES = Math.ceil(TOTAL_QUESTIONS * 0.6);
