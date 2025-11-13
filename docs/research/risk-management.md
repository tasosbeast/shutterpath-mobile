# Risk Management (MVP)

| Risk | Impact | Likelihood | Mitigation |
| --- | --- | --- | --- |
| AI critique cost spikes | Medium | Medium | Cap critiques at 1/day, cache prompt engineering, monitor OpenAI spend weekly. |
| Rate limit false positives | Medium | Low | Store last critique timestamp per user, write integration tests covering timezone edge cases. |
| Content backlog slips | High | Medium | Maintain 30-day prompt/challenge buffer; assign owner for weekly review. |
| Mobile performance issues on older devices | Medium | Medium | Use lightweight components, lazy-load images, profile lists before release. |
| Supabase outage | High | Low | Cache latest prompt/challenge locally, show “offline mode” message, retry background sync. |
| Data privacy/compliance | High | Low | Store only needed metadata, encrypt env keys, communicate AI usage clearly, allow critique deletion. |
| Scope creep beyond MVP | High | Medium | Align every ticket with scope.md; use AGENTS workflow to gate new feature requests. |
| Single-point knowledge | Medium | Medium | Document setup/runbooks, automate seed scripts, share architecture.md with team. |

Review risks at the end of each milestone and adjust mitigations before starting the next sprint.
