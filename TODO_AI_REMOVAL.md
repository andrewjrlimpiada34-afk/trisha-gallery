- [x] Remove Genkit runtime code: delete `src/ai/genkit.ts`, `src/ai/flows/refine-romantic-caption.ts`, and `src/ai/dev.ts`.
- [x] Ensure `MemorySlideshow.tsx` no longer imports/calls Genkit (local refine-only behavior).
- [x] Update `package.json`: remove `genkit`, `genkit-cli`, `@genkit-ai/google-genai` and Genkit scripts.
- [x] Verify there are no remaining references to Genkit modules.
- [ ] Run `npm run typecheck` and `npm run build` (or at least `npm run lint`).

