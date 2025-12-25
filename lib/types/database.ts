export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          created_at?: string;
        };
      };
      quiz_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          session_token: string;
          status: 'in_progress' | 'completed';
          started_at: string;
          completed_at: string | null;
          locale: string;
          current_question_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_token: string;
          status?: 'in_progress' | 'completed';
          started_at?: string;
          completed_at?: string | null;
          locale?: string;
          current_question_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_token?: string;
          status?: 'in_progress' | 'completed';
          started_at?: string;
          completed_at?: string | null;
          locale?: string;
          current_question_index?: number;
          created_at?: string;
        };
      };
      quiz_answers: {
        Row: {
          id: string;
          session_id: string;
          question_id: string;
          question_type: 'multiple_choice' | 'scenario' | 'open_ended';
          answer_json: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          question_id: string;
          question_type: 'multiple_choice' | 'scenario' | 'open_ended';
          answer_json: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          question_id?: string;
          question_type?: 'multiple_choice' | 'scenario' | 'open_ended';
          answer_json?: Record<string, unknown>;
          created_at?: string;
        };
      };
      ai_evaluations: {
        Row: {
          id: string;
          session_id: string;
          model: string;
          input_hash: string;
          output_json: Record<string, unknown>;
          confidence: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          model: string;
          input_hash: string;
          output_json: Record<string, unknown>;
          confidence?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          model?: string;
          input_hash?: string;
          output_json?: Record<string, unknown>;
          confidence?: number | null;
          created_at?: string;
        };
      };
      role_catalog: {
        Row: {
          id: string;
          role_key: string;
          display_name: string;
          description: string;
          skills_json: string[];
          tasks_json: string[];
          education: string | null;
          median_salary: string | null;
          growth_outlook: string | null;
          sources_json: RoleSource[];
          interest_tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role_key: string;
          display_name: string;
          description: string;
          skills_json?: string[];
          tasks_json?: string[];
          education?: string | null;
          median_salary?: string | null;
          growth_outlook?: string | null;
          sources_json?: RoleSource[];
          interest_tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role_key?: string;
          display_name?: string;
          description?: string;
          skills_json?: string[];
          tasks_json?: string[];
          education?: string | null;
          median_salary?: string | null;
          growth_outlook?: string | null;
          sources_json?: RoleSource[];
          interest_tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface RoleSource {
  source: string;
  code?: string;
  url?: string;
  attribution?: string;
}

export type QuizSession = Database['public']['Tables']['quiz_sessions']['Row'];
export type QuizAnswer = Database['public']['Tables']['quiz_answers']['Row'];
export type RoleCatalog = Database['public']['Tables']['role_catalog']['Row'];
export type AIEvaluation = Database['public']['Tables']['ai_evaluations']['Row'];
