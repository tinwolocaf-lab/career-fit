export type QuestionType = 'multiple_choice' | 'scenario' | 'open_ended';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  category: 'skills' | 'interests' | 'workstyle' | 'scenario' | 'reflection';
  text: string;
  description?: string;
  options?: QuizOption[];
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  traits?: TraitSignal[];
}

export interface TraitSignal {
  trait: TraitKey;
  weight: number;
}

export type TraitKey =
  | 'problemSolving'
  | 'creativity'
  | 'communication'
  | 'attentionToDetail'
  | 'curiosity'
  | 'persistence'
  | 'technicalAptitude'
  | 'analyticalThinking'
  | 'empathy'
  | 'leadership';

export interface QuizAnswer {
  questionId: string;
  questionType: QuestionType;
  value: string | string[];
  timestamp: string;
}

export interface QuizState {
  sessionId: string | null;
  sessionToken: string | null;
  currentIndex: number;
  answers: Record<string, QuizAnswer>;
  status: 'not_started' | 'in_progress' | 'completed';
}
