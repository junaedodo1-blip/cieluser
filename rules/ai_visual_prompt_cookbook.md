# HARD RULE: AI Visual Prompt Cookbook Round-Robin Rotation

## Mandatory Directive for Carousel Automation

1. **Daily Visual Style Source**: Every daily carousel run MUST use a visual style from the **AI Visual Prompt Cookbook** (data/ai_visual_prompt_cookbook/*.json).
2. **Round-Robin Selection**: Visual styles MUST be selected in round-robin sequence through all 126 JSON prompt specifications, tracking state in carousel_automation_state.json.
3. **No Duplicate Repeats**: A visual style cannot be repeated until all 126 styles in the cookbook catalog have completed one full cycle.
4. **Style Spec Injection**: The active style specification (
awJson, style_fidelity_anchors, composition, environment_variables) MUST be injected into all 8 slide generation prompts in 
ano_banana_generator.ts.
5. **Auteur Brand Narrative Integration**: Combine the active visual style with project\ciel high-status brand storytelling doctrines (Act I Truth, Act II Tension, Act III Resolve).
