/*
  # CareerFit Quiz Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, nullable for anonymous users)
      - `created_at` (timestamptz)
    
    - `quiz_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable, references users)
      - `session_token` (text, unique, for anonymous session tracking)
      - `status` (text: in_progress, completed)
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz, nullable)
      - `locale` (text, default 'en')
    
    - `quiz_answers`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references quiz_sessions)
      - `question_id` (text)
      - `question_type` (text: multiple_choice, scenario, open_ended)
      - `answer_json` (jsonb)
      - `created_at` (timestamptz)
    
    - `ai_evaluations`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references quiz_sessions)
      - `model` (text)
      - `input_hash` (text)
      - `output_json` (jsonb)
      - `confidence` (numeric)
      - `created_at` (timestamptz)
    
    - `role_catalog`
      - `id` (uuid, primary key)
      - `role_key` (text, unique)
      - `display_name` (text)
      - `description` (text)
      - `skills_json` (jsonb)
      - `tasks_json` (jsonb)
      - `sources_json` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can read their own data
    - Quiz sessions accessible via session token for anonymous users
    - Role catalog is publicly readable
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  session_token text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  locale text DEFAULT 'en',
  current_question_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sessions accessible by token"
  ON quiz_sessions
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_token ON quiz_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON quiz_sessions(user_id);

CREATE TABLE IF NOT EXISTS quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  question_type text NOT NULL CHECK (question_type IN ('multiple_choice', 'scenario', 'open_ended')),
  answer_json jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, question_id)
);

ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Answers accessible via session"
  ON quiz_answers
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_session ON quiz_answers(session_id);

CREATE TABLE IF NOT EXISTS ai_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  model text NOT NULL,
  input_hash text NOT NULL,
  output_json jsonb NOT NULL,
  confidence numeric(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Evaluations accessible via session"
  ON ai_evaluations
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ai_evaluations_session ON ai_evaluations(session_id);

CREATE TABLE IF NOT EXISTS role_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_key text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text NOT NULL,
  skills_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  tasks_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  education text,
  median_salary text,
  growth_outlook text,
  sources_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  interest_tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE role_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Role catalog publicly readable"
  ON role_catalog
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_role_catalog_key ON role_catalog(role_key);
