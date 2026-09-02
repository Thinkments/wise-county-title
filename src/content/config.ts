import { defineCollection, z } from 'astro:content';

const knowledgeHubCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.enum([
      'homeowner',
      'realtor',
      'ag-ranch',
      'commercial',
      'title-clearance',
      'county-guides',
    ]),
    pillarName: z.string(),
    pillarSlug: z.string(),
    subCluster: z.string(),
    persona: z.enum(['homeowner', 'realtor', 'ag-ranch', 'commercial', 'legal']),
    assetClass: z.enum(['residential', 'rural-land', 'commercial', 'multi-family', 'all']),
    county: z.string().optional(),
    readingTimeMinutes: z.number().default(6),
    datePublished: z.string().default('2026-08-15'),
    dateModified: z.string().default('2026-08-20'),
    authorName: z.string().default('Ken R. Dodson'),
    reviewedByName: z.string().default('Berry White, J.D.'),
    directAnswerSummary: z.string(),
    directAnswerBullets: z.array(z.string()).default([]),
    keyTakeaways: z.array(z.string()).default([]),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string().default('Christopher Cooperrider'),
    reviewedBy: z.string().default('Berry White, J.D.'),
    parentPillarSlug: z.string().default('homeowner'),
    parentPillarName: z.string().default('Homeowner & Consumer Hub'),
    tags: z.array(z.string()).default([]),
  }),
});

const countiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    countyName: z.string(),
    countySeat: z.string(),
    cadName: z.string(),
    cadUrl: z.string(),
    cadAddress: z.string(),
    cadPhone: z.string(),
    clerkRecordingFees: z.string(),
    eRecordingTurnaround: z.string(),
    typicalTaxRate: z.string(),
    overview: z.string(),
  }),
});

export const collections = {
  'knowledge-hub': knowledgeHubCollection,
  'blog': blogCollection,
  'counties': countiesCollection,
};
