# Design System Document: The Discovery Path

## 1. Overview & Creative North Star
**Creative North Star: "The Tactile Explorer"**

To design for a 10-year-old is to balance the bridge between "playful childhood" and "emerging autonomy." This design system moves away from the chaotic, "loud" aesthetics of early childhood apps toward a sophisticated, editorial experience that treats the user as an explorer. 

The system rejects the rigid, boxy constraints of traditional educational software. Instead, it utilizes **Organic Asymmetry** and **Tonal Depth**. Elements should feel like physical objects placed on a clean, infinite desk. We achieve a "premium" feel by prioritizing breathability (white space) over information density, ensuring that every interaction feels like a step in a curated journey rather than a task in a digital classroom.

---

## 2. Colors
Our palette is rooted in a "Modern Sachunterricht" aesthetic—nature-inspired but digitally vibrant. 

### Palette Strategy
*   **Primary (`#006668`):** Use this for core focus areas. It is the "Deep Sea" teal that grounds the experience.
*   **Secondary (`#705900`):** The "Sunshine" yellow. Reserved for moments of achievement, discovery, and active selection.
*   **Tertiary (`#006b1c`):** The "Forest" green. Used for biological or environmental topics within the curriculum.
*   **Surface & Background (`#e2fbff`):** An airy, "Soft Mint" that reduces eye strain and provides a cool, calm backdrop for learning.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To separate a sidebar from a main content area, do not draw a line. Instead, shift the background color. 
*   *Example:* Place a `surface-container-low` (`#cef8ff`) sidebar against a `surface` (`#e2fbff`) main canvas.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-transparent layers. 
1.  **Base Layer:** `surface`
2.  **Section Layer:** `surface-container`
3.  **Interactive Layer (Cards/Modals):** `surface-container-highest`

### The "Glass & Gradient" Rule
To add "soul," use subtle linear gradients for hero headers: `primary` transitioning into `primary-container`. For floating navigation elements, apply **Glassmorphism**: use `surface` at 80% opacity with a `20px` backdrop blur to allow the "journey" background to bleed through.

---

## 3. Typography
We utilize a dual-font system to balance character with extreme legibility.

*   **Display & Headlines (Plus Jakarta Sans):** A modern, geometric sans-serif with subtle rounded terminals. This font carries the "Playful Professional" tone. 
    *   *Usage:* Use `display-lg` for chapter titles to create a sense of awe.
*   **Body & Titles (Be Vietnam Pro):** A highly legible, clean typeface that stays out of the way of the learning content.
    *   *Usage:* Use `body-lg` for all educational text to ensure the reading level is accessible for 10-year-olds.

**Hierarchy Tip:** Always use high-contrast scales. A `display-lg` (3.5rem) title should sit proudly above `body-lg` (1rem) text to create an editorial, high-end magazine feel.

---

## 4. Elevation & Depth
In this system, depth is "felt," not "seen."

### The Layering Principle
Achieve hierarchy by stacking tonal tiers. A card using `surface-container-lowest` (`#ffffff`) placed on a `surface-container` (`#aef4fe`) background creates a natural lift that signals "interact with me" without a single drop shadow.

### Ambient Shadows
Where floating elements are necessary (e.g., a "Next Lesson" floating action button):
*   **Shadow Color:** Use a tinted version of the surface: `on-surface` (`#00343a`) at 6% opacity.
*   **Blur:** Use wide, soft blurs (e.g., `40px` spread) to mimic soft, overhead classroom lighting.

### The "Ghost Border" Fallback
If accessibility requires a container boundary (e.g., an input field), use the **Ghost Border**: `outline-variant` at 20% opacity. Never use a 100% opaque border.

---

## 5. Components

### Navigation: The Journey Map
Replace traditional top-bars with a bottom-anchored "Explorer Dock."
*   **Style:** `surface-container-highest` with a `40%` backdrop blur.
*   **Shape:** `xl` (3rem) roundedness.
*   **Interaction:** Active icons should glow with a `secondary-container` soft outer halo.

### Buttons (The "Soft-Touch" Component)
*   **Primary:** `primary` background with `on-primary` text. Shape: `full` (pill-shaped).
*   **Secondary:** `secondary-container` background. These should feel like "rewards" or "hints."
*   **Elevation:** On hover, do not use a shadow; instead, shift the color to `primary-fixed-dim`.

### Cards & Discovery Modules
*   **Rule:** No dividers.
*   **Structure:** Use `1.5rem` (`md`) padding and `2rem` (`lg`) rounded corners.
*   **Grouping:** Use vertical whitespace (from the 32px or 48px scale) to separate different topics.

### Input Fields
*   **Style:** `surface-container-lowest` background with a `sm` (0.5rem) rounded corner.
*   **Focus State:** A `2px` "Ghost Border" using `primary` at 40% opacity.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use intentional asymmetry. Offset an image slightly to the right while text stays left to create a "scrapbook" discovery feel.
*   **Do** use `xl` (3rem) corner radius for large containers to maintain the "friendly" aesthetic.
*   **Do** prioritize "Instructional Motion." Elements should slide in from the direction of the journey (e.g., right to left).

### Don't:
*   **Don't** use pure black (`#000000`). Always use `on-background` (`#00343a`) for text to keep the interface feeling soft.
*   **Don't** use standard "Material Design" shadows. They feel too "utility-focused" for a playful educational app.
*   **Don't** use more than two nested containers. If you need a third level of depth, use a subtle `secondary-container` color shift instead of another layer.

### Accessibility Note:
While we use soft mint and yellows, ensure all "Actionable" text on `secondary-container` (Yellow) is checked against `on-secondary-container` (`#5c4900`) to maintain a high contrast ratio for students with visual impairments.