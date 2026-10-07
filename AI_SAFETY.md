# AI Safety, Hallucination Prevention & Fact Validation

## Principles
1. **Deterministic Data Context:** The LLM receives structured, pre-calculated metric JSON payload containing verified values, source names, and confidence levels.
2. **Automated Post-Validation Layer (`src/lib/ai/validator.ts`):** Every AI-generated claim is parsed against the input JSON. Any sentence introducing ungrounded prices, unverified safety guarantees, or non-existent infrastructure is stripped prior to rendering.
3. **Mandatory Guardrails:** The system explicitly forbids statements claiming a property is "100% flood-proof", "legally clear title", or "guaranteed capital growth".

## Disclaimers & Legal Boundaries
All AI reports include a standardized footer:
> "PropertyLens provides informational decision support based on available spatial data. It does not constitute legal, structural, financial, or environmental advice."
