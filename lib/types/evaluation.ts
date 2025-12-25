import { z } from 'zod';

export const TraitScoreSchema = z.object({
  score: z.number().min(0).max(5),
  evidence: z.array(z.string()),
});

export const RoleFitSchema = z.object({
  role: z.string(),
  roleKey: z.string(),
  score: z.number().min(0).max(100),
  why: z.array(z.string()),
});

export const LearningResourceSchema = z.object({
  title: z.string(),
  type: z.enum(['course', 'book', 'article', 'video', 'project', 'community']),
  url: z.string().optional(),
  description: z.string(),
  timeEstimate: z.string().optional(),
  isFree: z.boolean(),
});

export const WeeklyPlanSchema = z.object({
  week: z.number(),
  focus: z.string(),
  goals: z.array(z.string()),
  resources: z.array(LearningResourceSchema),
});

export const EvaluationResultSchema = z.object({
  perRoleFit: z.array(RoleFitSchema),
  traitSignals: z.object({
    problemSolving: TraitScoreSchema,
    creativity: TraitScoreSchema,
    communication: TraitScoreSchema,
    attentionToDetail: TraitScoreSchema,
    curiosity: TraitScoreSchema,
    persistence: TraitScoreSchema,
  }),
  strengths: z.array(z.string()),
  growthAreas: z.array(z.string()),
  recommendedRoles: z.array(
    z.object({
      roleKey: z.string(),
      role: z.string(),
      rationale: z.string(),
    })
  ),
  suggestedLearningPlan: z.object({
    targetRole: z.string(),
    duration: z.string(),
    weeks: z.array(WeeklyPlanSchema),
  }),
  responseQuality: z.object({
    hasSubstantiveResponses: z.boolean(),
    lowConfidenceFlags: z.array(z.string()),
    overallConfidence: z.number().min(0).max(1),
  }),
  safetyDisclaimer: z.string(),
});

export type TraitScore = z.infer<typeof TraitScoreSchema>;
export type RoleFit = z.infer<typeof RoleFitSchema>;
export type LearningResource = z.infer<typeof LearningResourceSchema>;
export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>;
export type EvaluationResult = z.infer<typeof EvaluationResultSchema>;
