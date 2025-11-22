-- Row Level Security (RLS) Policies
-- Run this after 001_initial_schema.sql

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_critiques ENABLE ROW LEVEL SECURITY;

-- Users: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Prompts and Challenges: Public read access (no RLS needed for read)
-- These tables don't need RLS as they're read-only for all users

-- User Saved Prompts: Users can only manage their own saved prompts
CREATE POLICY "Users can view own saved prompts"
  ON user_saved_prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved prompts"
  ON user_saved_prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved prompts"
  ON user_saved_prompts FOR DELETE
  USING (auth.uid() = user_id);

-- User Saved Challenges: Users can only manage their own saved challenges
CREATE POLICY "Users can view own saved challenges"
  ON user_saved_challenges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved challenges"
  ON user_saved_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved challenges"
  ON user_saved_challenges FOR DELETE
  USING (auth.uid() = user_id);

-- Challenge Completions: Users can only manage their own completions
CREATE POLICY "Users can view own completions"
  ON challenge_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON challenge_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Photo Critiques: Users can only view their own critiques
CREATE POLICY "Users can view own critiques"
  ON photo_critiques FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own critiques"
  ON photo_critiques FOR INSERT
  WITH CHECK (auth.uid() = user_id);
