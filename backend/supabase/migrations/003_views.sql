-- Database Views for simplified queries
-- Run this after 002_rls_policies.sql

-- Daily Prompt View: Get today's active prompt
CREATE OR REPLACE VIEW daily_prompt_view AS
SELECT *
FROM prompts
WHERE available_from = CURRENT_DATE
  AND is_active = true
  AND (available_to IS NULL OR available_to >= CURRENT_DATE)
ORDER BY created_at DESC
LIMIT 1;

-- Daily Challenge View: Get today's active challenge
CREATE OR REPLACE VIEW daily_challenge_view AS
SELECT *
FROM challenges
WHERE available_from = CURRENT_DATE
  AND is_active = true
ORDER BY created_at DESC
LIMIT 1;

-- Streak View: Calculate user streaks based on challenge completions
CREATE OR REPLACE VIEW streak_view AS
SELECT 
  user_id,
  COUNT(DISTINCT DATE(completed_at)) as total_days,
  MAX(DATE(completed_at)) as last_completion_date
FROM challenge_completions
GROUP BY user_id;
