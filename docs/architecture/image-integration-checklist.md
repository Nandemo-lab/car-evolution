# Image Integration Checklist

Status: **Approved**
Scope: what to check when real images replace placeholders on any CarVista vehicle page

## Purpose

Every vehicle page currently ships with correct paths, correct data, and no real images behind them (see each `src/cars/<slug>.js`'s own placeholder-coordinate warning). This document is the checklist to run through once real images actually land in `public/images/cars/<slug>/` — for any vehicle, not only the ones current at the time of writing (Alphard, NOAH, SERENA, STEPWGN).

This is not a production-method document. It doesn't decide how images are made (see project memory for that history) — only what to verify once a set of images exists and is about to go from placeholder to live.

## 1. File presence and naming

- [ ] One file per generation at `/images/cars/<slug>/gen{N}-{year}.png`, matching the exact filename each `generations[].image` field already expects — check the data file, don't guess the pattern from another vehicle.
- [ ] One hero shot at `/images/cars/<slug>/hero-gen{LATEST}-3q.png`, matching `heroImage`.
- [ ] Every generation has a file. A missing one silently renders a broken `<img>` for just that generation — it won't throw a console error, so check the network tab or view each generation manually, not just the page load.

## 2. Canvas and framing consistency

- [ ] Every generation's photo shares the same canvas ratio the rest of the site assumes: `car-page.css`'s `.detail-visual` is locked to `1408 / 903` and `.compare-image-wrap` to `1408 / 668` — a differently-cropped image will be forced into this box via `object-fit: cover`, which can crop content unpredictably rather than error.
- [ ] Same camera angle across every generation of one vehicle (front 3/4, matching side — left or right). VOXY hit this exact issue once already: gen4's photo was generated at the mirrored angle from gen1–3 and had to be flipped after the fact (`public/images/cars/voxy/gen4-2022.png`, `RotateFlipType.RotateNoneFlipX`). Check this before annotation coordinates are touched, not after — a mirrored image makes every coordinate wrong in a way that looks like a tuning problem but isn't.
- [ ] Same relative car scale and vertical position across generations — the Compare section lets a reader pick ANY two generations (see car-page.js's `initCompare`), not just adjacent ones, so this now matters across the whole set, not only a single default pair. A wheel-hub pixel check across two images is a reliable anchor if anything looks even slightly off — don't eyeball it.

## 3. Cross-generation scale consistency

AI-generated images are produced one at a time, with no shared 3D scene or camera rig behind them (see project memory for why — the earlier 3D pipeline was tried and rejected) — nothing structurally guarantees two generations agree on scale the way a real shared rig would. Check this explicitly rather than assuming it:

- [ ] Lay all of a vehicle's generation photos side by side (the Timeline strip already does this — use it) and check overall length and height *relative to each other* look plausible for the same nameplate across time, not just plausible individually.
- [ ] Wheel size and tire sidewall proportion aren't drifting generation to generation in a way the real vehicle's specs don't support — a generation whose wheels look disproportionately larger or smaller than its neighbors is a common AI-generation artifact, not a real design change, unless the sourced facelift/generation data actually says so.
- [ ] Wheelbase (the gap between front and rear wheel centers, relative to overall length) reads consistently — this is the same anchor VOXY's own gen3/gen4 alignment fix used (a wheel-hub pixel measurement, not eyeballing the frame) and is worth repeating here.
- [ ] If something looks off, measure a real anchor point (wheel hub center-to-center) before concluding it's wrong — a genuine cross-generation size change (a nameplate that actually grew) will show up as a real, sourced fact in the generation's own data, not just a visual impression.

## 3b. Cross-vehicle scale consistency

CarVista's premise is a shared world — same studio, same camera, same distance, same floor — across every vehicle on the site, not only within one vehicle's own generations. Checked directly (2026-07-26) across all 5 published vehicles: it currently does **not** hold. Alphard (a genuinely larger, full-size luxury minivan) reads at essentially the same in-frame size as VOXY/NOAH/SERENA/STEPWGN (the compact-class Mainstream cluster) — all four came out to roughly the same ~76-79% of frame width when compared visually, which reads as "every car is the same size," not as real cars sharing one photographic world. **This was left as-is by explicit user decision — existing images are not being resized to fix it** — but the rule below governs anything created or replaced from 2026-07-26 onward:

- [ ] Hold camera position, focal length, and floor position **identical across every vehicle**, not just within one vehicle's own generations — only the body's apparent scale should vary between vehicles.
- [ ] Body scale should track each vehicle's `referenceLengthMm` (see [Design Identity](../brand/design-identity.md)) relative to every other vehicle's — Alphard should read modestly (~5-10%) larger than the Mainstream cluster (VOXY/NOAH/SERENA/STEPWGN), which should read close to each other (their real lengths are within a few percent), and any future smaller-class vehicle (e.g. a Freed-class addition) should read smaller than that whole cluster.
- [ ] This is a **clear-but-not-extreme** difference to aim for, not a dramatic one — the goal is "you can tell Alphard is the bigger vehicle at a glance," not "Alphard dwarfs everything else."
- [ ] Prefer solving this at generation time (prompting each vehicle's photo at its correct relative scale from the start) over resizing an existing photo after the fact — see the "fixing an existing image vs. regenerating it" note below. A pixel-level resize is a legitimate stopgap only if a regenerated replacement genuinely isn't available yet.
- [ ] This check is independent of §3 (Cross-generation scale consistency) above — a vehicle's own generations legitimately differ in real size over time (sourced historical fact), while this section is about how different *vehicles* compare to each other at a given point in time (most visibly, each vehicle's current/latest generation, which is what Home and Hero both surface).

## 4. Hero / Compare identity consistency

The Hero shot and every Compare/Timeline photo of the same generation must depict *the same vehicle, the same grade* — not a different trim level or a different generation's parts grafted onto the wrong body. Since each image is generated independently, this doesn't come for free.

Every vehicle now fixes this in advance: `generations[].image` and `heroImage` prompts should all target that vehicle's own `representativeGrade` and `representativeColor` fields (see [Design Identity](../brand/design-identity.md)) — this section is the *audit* that the fixed answer was actually followed, not a search for what the right grade/color should have been. If a mismatch turns up here, the fix is regenerating the outlier image to match the vehicle's already-fixed grade/color, not picking a new one on the spot.

Check, generation by generation:

- [ ] Front grille — same pattern and shape between the Hero shot and that generation's own Compare/Timeline photo.
- [ ] Headlights — same cluster shape, not swapped with an adjacent generation's or a different grade's lighting signature.
- [ ] Wheels — same design language and size impression, not a sportier or plainer wheel than the rest of that generation's photos imply.
- [ ] Door mirrors — same shape/mounting style (body-mounted vs. door-mounted reads as a real generation difference to a viewer; don't let it be an accidental one).
- [ ] Aero/bumper treatment — base grade vs. an aero-package grade (e.g. VOXY/NOAH's own `S SPORTS`-style variants) not mixed within the same generation's image set.
- [ ] Overall body shape — silhouette and proportions match between the Hero crop and the Compare/Timeline photo; a hero shot is a tighter, more dramatic crop of the *same* vehicle, not creative license to show a different one.

## 5. Annotation coordinates (`generations[].annotations`)

Every current placeholder file says this outright in its header comment — treat that comment as the actual task list:

- [ ] Re-derive `x`/`y` (dot position, % of the photo) against the real photo, not the placeholder guess. The placeholder values assume a generic front-3/4 composition (grille lower-center, headlight/greenhouse upper area) — real photos will differ per vehicle and per generation.
- [ ] Re-check `labelX`/`dir` still land the caption in open sky (`top`) or floor (`dir: 'bottom'`) margin, not over the car body. `.detail-visual` is a taller virtual canvas (10%/80%/10% split) specifically so labels have real margin to sit in — confirm the dot's `y` still maps into the intended band via `toVisualY()` in `car-page.js`, not onto the photo edge.
- [ ] Check that multiple annotations on one generation don't collide (this happened on VOXY when several features clustered near the same fascia area) — space `y` values apart if needed rather than placing each at its literal exact feature center.
- [ ] Compare-mode dots (no labels there, by design) still land on a visible part of each photo once the divider clips the overlay.

## 6. Facelift content (`generations[].facelift`)

Text content doesn't change when images arrive, but two things should be re-checked once the photo is visible:

- [ ] If a generation's facelift `points` describe a visual change (grille shape, headlamp redesign, etc.), confirm the description still matches what the photo actually shows — this content was written from source research before the image existed, and its purpose is to complement what's on screen, not free-write around it.
- [ ] Generations with only equipment-led changes should keep their `note` field, not gain invented visual bullets just because a photo now exists to describe.

## 7. Hero framing & LCP

- [ ] `hero-image`'s `object-position` (`.hero-image { object-position: 52% 58% }` in `car-page.css`, shared across every vehicle) still frames the subject reasonably — this value was tuned generically; a hero shot with the vehicle positioned very differently in-frame may need a page-specific override, which would be a new, deliberate exception, not a silent one.
- [ ] Hero remains the LCP element or, if it becomes large enough to compete with it, re-run Lighthouse (see §9) — this exact failure mode already happened once this session on the Home page's hero-adjacent motif and is easy to reintroduce without noticing.

## 8. Responsive

- [ ] 375–390px width: hero crop, timeline horizontal-scroll strip, detail image + annotation margins, compare slider — nothing should require horizontal page scroll (the timeline strip itself scrolling horizontally is correct and expected; the page body should not).
- [ ] Desktop (`min-width: 700px` breakpoint in `car-page.css`): `.detail` switches to a two-column grid — confirm the image doesn't get cropped awkwardly at the wider aspect the grid column gives it.

## 9. Lighthouse

Real images are the single biggest lever on these pages' Performance score — this project's own VOXY page proved it: an unoptimized ~1.9MB hero PNG alone was enough to drop Performance from the high-90s to the high-60s/low-70s in past measurements on this exact codebase.

- [ ] Re-run Lighthouse (desktop preset) against the production build (`vite build && vite preview`, not the dev server) for every page whose images changed.
- [ ] Check `image-delivery-insight` / oversized-image findings specifically — a photo sized far above its rendered display size is the most common and most fixable cause of a regression here.
- [ ] Target: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ — the bar already held for Home and the Editorial Policy page; vehicle pages should clear it too once real (ideally compressed/right-sized, e.g. WebP) images are in place, not the current placeholder-driven scores.
- [ ] If Performance doesn't clear 90 after real images land, check format (PNG vs. WebP/AVIF) and display-vs-native size before concluding anything about the page's structure needs to change — this was already the resolution the one time this came up for real (VOXY), and is very likely to be again.

## Scope note

This document does not decide what images are generated, how, or when. It only defines what "done" means for taking a vehicle page from placeholder paths to a real, verified visual experience once someone else's images exist to check it against.

## On fixing an existing image vs. regenerating it

Two real defects were found and pixel-corrected this way in the 2026-07-26 pass: Alphard gen2's flat-gray background (replaced via color-distance masking against a procedural dark gradient) and NOAH gen2's underexposure (corrected via a measured multiplicative brighten). Both were accepted as good-enough interim fixes, not the target end state.

**Going forward, the preferred path for a defective image is full regeneration of that generation's photo, not further correction of the existing file.** Post-hoc pixel correction (brightness/levels, background replacement, targeted highlight compression) remains a legitimate *interim* tool when a defect is caught late and a regenerated replacement isn't available yet — it should not be reached for by default once regeneration is an option. This doesn't retroactively invalidate the two fixes above; it sets the standard for what replaces them, and for any future defect found before this document's checks are run for a new vehicle.
