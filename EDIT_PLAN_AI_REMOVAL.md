# Plan: Remove Genkit/AI components

## Information Gathered
- `src/components/MemorySlideshow.tsx` imports and calls `refineRomanticCaption` (Genkit) for caption refinement.
- `src/ai/genkit.ts` sets up Genkit + Google GenAI plugin.
- `src/ai/flows/refine-romantic-caption.ts` defines the Genkit prompt/flow.
- `src/ai/dev.ts` imports the flow for Genkit dev.
- `package.json` includes Genkit + genkit-cli + @genkit-ai/google-genai.

## Plan
1. Remove Genkit-related runtime code:
   - Delete `src/ai/genkit.ts`.
   - Delete `src/ai/flows/refine-romantic-caption.ts`.
   - Delete `src/ai/dev.ts`.
2. Update UI to eliminate AI dependencies:
   - Remove the `refineRomanticCaption` import from `MemorySlideshow.tsx`.
   - Replace `handleRefine` to no longer call AI (keep a local no-op / small local animation).
3. Update dependencies:
   - Remove `genkit`, `genkit-cli`, `@genkit-ai/google-genai` from `package.json`.
   - Remove `genkit:dev` and `genkit:watch` scripts.
4. Cleanup any remaining references to removed modules.
5. Run `npm run typecheck` and `npm run build` (or at least `npm run lint`) to ensure no compile errors.

## Dependent Files to be edited
- `src/components/MemorySlideshow.tsx`
- `package.json`

## Followup steps
- Install deps (if needed) and run:
  - `npm run typecheck`
  - `npm run build`

<ask_followup_question>
Confirm I should proceed with deleting `src/ai/*` and updating `package.json` accordingly (removing Genkit packages + scripts), while keeping the refine button as a local non-AI interaction.
</ask_followup_question>

