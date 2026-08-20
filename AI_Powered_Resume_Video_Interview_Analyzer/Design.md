# Design — AI-Powered Resume Video Interview Analyzer

## 1. Design Direction

The UI follows **Claymorphism**.

Visual characteristics:
- Soft 3D clay-like cards.
- Large rounded corners.
- Gentle shadows.
- Puffy buttons.
- Subtle depth.
- Friendly but professional appearance.
- Minimal visual noise.
- Clear hierarchy for analytical information.

The interface must not become childish; typography and data visualization remain professional.

## 2. Design Tokens

### Colors
Suggested palette:

```text
Background: #F6F3FF
Surface: #FFFFFF
Primary: #7C5CFC
Secondary: #9EE6CF
Accent: #FFB86B
Text: #252238
Muted: #77728B
Success: #55B88A
Warning: #F2A65A
Danger: #E86A92
```

### Radius
```text
Card: 28px
Button: 18px
Input: 16px
Badge: 999px
```

### Shadows
Use layered soft shadows:

```text
0 14px 35px rgba(...)
0 4px 10px rgba(...)
```

Do not overuse shadows on every tiny element.

## 3. Typography

Recommended:
- Inter
- Manrope
- Plus Jakarta Sans

Use:
- Large bold headings.
- Medium-weight section headings.
- Highly readable body text.
- Monospace only for technical metadata.

## 4. Main Screens

### Landing
Hero:
"Turn your resume + interview into AI-powered evidence."

CTA:
"Analyze Interview"

Supporting cards:
- Resume Intelligence
- Video Intelligence
- Multimodal AI
- Explainable Evidence

### Upload Workspace
Three large clay cards:
1. Resume
2. Job Description
3. Interview Video

Use drag-and-drop.

### Processing Screen
Animated AI pipeline:

```text
Resume ✓
Transcript ✓
Vision ●
Alignment ○
Report ○
```

### Report Dashboard
Use clay cards but keep score visualizations flat enough to remain readable.

Components:
- Score ring.
- Radar chart for skill evidence.
- Timeline.
- Question cards.
- Evidence chips.
- Confidence labels.

## 5. Important UX Rule

Do not display a single giant "Hire / Reject" button or verdict.

Prefer:

"Interview Evidence Score: 82/100"

Then explain the score.

## 6. Accessibility

- WCAG-aware contrast.
- Keyboard navigation.
- Visible focus states.
- Captions/transcript.
- Screen-reader labels.
- Do not communicate meaning through color alone.
- Reduced-motion mode.

## 7. Responsive Layout

Desktop:
```text
Sidebar | Main report | Evidence panel
```

Tablet:
```text
Sidebar collapsed
Main content
```

Mobile:
```text
Top navigation
Stacked cards
Bottom action bar
```

## 8. Motion

Use subtle spring animations:
- Card entrance.
- Button press.
- Processing progress.
- Expand/collapse evidence.

Never use motion as the only way to communicate status.
