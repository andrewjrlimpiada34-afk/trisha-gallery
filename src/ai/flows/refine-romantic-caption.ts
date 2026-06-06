'use server';
/**
 * @fileOverview A Genkit flow that refines a simple photo caption into a poetic and emotionally resonant diary entry.
 *
 * - refineRomanticCaption - A function that refines a simple caption into a romantic diary entry.
 * - RefineRomanticCaptionInput - The input type for the refineRomanticCaption function.
 * - RefineRomanticCaptionOutput - The return type for the refineRomanticCaption function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RefineRomanticCaptionInputSchema = z.object({
  caption: z.string().describe('A simple photo caption to be refined.'),
  context: z.string().optional().describe('Optional context or memories related to the photo to help guide the refinement.'),
});
export type RefineRomanticCaptionInput = z.infer<typeof RefineRomanticCaptionInputSchema>;

const RefineRomanticCaptionOutputSchema = z.object({
  refinedCaption: z.string().describe('A poetic, emotional, and romantic diary entry refined from the original caption.'),
});
export type RefineRomanticCaptionOutput = z.infer<typeof RefineRomanticCaptionOutputSchema>;

const refineCaptionPrompt = ai.definePrompt({
  name: 'refineRomanticCaptionPrompt',
  input: { schema: RefineRomanticCaptionInputSchema },
  output: { schema: RefineRomanticCaptionOutputSchema },
  prompt: `You are an incredibly romantic and poetic wordsmith, specializing in crafting nostalgic and deeply emotional diary entries.
Your task is to take a simple caption and transform it into a beautiful, heartfelt, and memorable diary entry for a loved one.
The tone should be soft, dreamy, and overflowing with affection and cherished memories.

Original Caption: "{{{caption}}}"

{{#if context}}
Additional Context: "{{{context}}}"
{{/if}}

Please refine the original caption into a poetic diary entry, ensuring it captures deep emotions, love, and a sense of cherished memory.
The output MUST be a JSON object with a single field named "refinedCaption".`
});

const refineRomanticCaptionFlow = ai.defineFlow(
  {
    name: 'refineRomanticCaptionFlow',
    inputSchema: RefineRomanticCaptionInputSchema,
    outputSchema: RefineRomanticCaptionOutputSchema,
  },
  async (input) => {
    const { output } = await refineCaptionPrompt(input);
    if (!output) {
      throw new Error('Failed to refine caption.');
    }
    return output;
  }
);

export async function refineRomanticCaption(input: RefineRomanticCaptionInput): Promise<RefineRomanticCaptionOutput> {
  return refineRomanticCaptionFlow(input);
}
