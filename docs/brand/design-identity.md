# CarVista Design Identity System

Status: **Approved**
Scope: how every vehicle's brand character is defined, kept distinct from its siblings, kept from drifting, and enforced before publishing

## Purpose

CarVista now covers five vehicles across three makers, with more to come. Nothing structurally stopped two vehicles from drifting toward the same generic "large minivan, big grille, LED headlights" description — the only thing that had kept them apart so far was whoever was writing copy that day remembering, by feel, that VOXY should sound sharper than NOAH. That doesn't scale past a handful of vehicles and doesn't survive a different person (or a different session) writing the next one.

This document is the fix: a **Role** — one sentence naming what the vehicle *is* within CarVista's roster — followed by a **Design Identity** (three to five English keywords a vehicle's copy should reach for) and **Avoid Keywords** (words it should never reach for), defined once per vehicle, governing Hero copy, annotation vocabulary, SEO description tone, and how a vehicle is kept distinct from every other vehicle on the site, not only vehicles from the same maker. It is a brand-guideline document, not a developer note, and it is meant to be read before writing a single line of copy for a vehicle, not after.

## What a Role is

One sentence, always in the form "The [adjective] [noun].", naming what a vehicle *is* before anything else is written about it — VOXY's is "The expressive choice," NOAH's is "The composed standard," Alphard's is "The flagship luxury." Design Identity and Avoid Keywords describe *how* a vehicle should be written about; Role answers the question that has to be settled before either of those is useful: *what is this vehicle, in CarVista's own lineup?* Read the Role first — it's the one-line orientation a session needs before it needs the keyword lists at all.

## What a Design Identity is

Three to five short English words (adjectives or single nouns) that describe how a specific vehicle's design should *feel* — not what it has, what it's shaped like, or its spec sheet. They are not marketing slogans and never appear on the live page verbatim; they are a **judgment tool**, checked against before writing:

- Annotation labels (`generations[].annotations[].label`)
- Facelift copy (`generations[].facelift.points` / `.note`)
- SEO description tone (`seo.description`)
- Any future Hero-adjacent copy specific to that vehicle

A word only belongs on this list if it changes what you'd actually write. "Reliable" or "Well-made" describe every car on the site and belong on none of them — they don't discriminate between vehicles, so they can't do this document's job.

## What Avoid Keywords are

Every vehicle also carries a short list of words its copy must never reach for, even where they'd be individually plausible or even flattering. Design Identity says what to write toward; Avoid Keywords say what to write away from — a positive list alone leaves the actual failure mode (a word that *sounds* fine in isolation but blurs a vehicle into its sibling) uncaught. Three sources produce a vehicle's Avoid list, in order of priority:

1. **The direct opposite of its own Design Identity register.** A Sharp/Dynamic/Aggressive vehicle avoids Elegant/Luxury/Formal, not because those words are bad, but because they contradict the register already chosen.
2. **Any Design Identity keyword already claimed by a vehicle in the same market segment cluster** (see below) — same-maker sibling or not.
3. **Any word an official source uses to describe a segment-mate *in direct contrast* to this vehicle.** NOAH's Avoid list includes "Aggressive" specifically because official comparison copy uses that exact word for VOXY, in a sentence directly contrasting the two — the strongest possible evidence a word belongs to a segment-mate, not to this vehicle.

## What Representative Grade and Color are

Every vehicle in its real-world lineup ships in multiple grades that look meaningfully different — Alphard alone spans Z through Executive Lounge; NOAH's aero package changes its face entirely; SERENA's Highway STAR trim and STEPWGN's SPADA trim are visually distinct from their own base models. Each generation's image set is produced independently (see project memory on the AI-generation pivot), which means nothing stops one generation's photo from accidentally depicting a different grade — or a different color — than its neighbor. That mismatch is exactly what [Image Integration Checklist §4](../architecture/image-integration-checklist.md) exists to *catch*; **Representative Grade and Representative Color exist to prevent it from happening in the first place**, by fixing the answer before any image is made rather than auditing for drift after.

- **`representativeGrade`** — the one grade shown across every generation's Hero, Compare, and Timeline image for this vehicle. Chosen the same way the shared policy footer already describes choosing a generation's spec: the most *representative* trim, not necessarily the top grade or the best-seller.
- **`representativeColor`** — the one color shown across every generation's image for this vehicle. Chosen where possible to reinforce the vehicle's own Design Identity (VOXY's "Attitude Black Mica" literally carries the word "Attitude" in Toyota's own naming), not chosen for popularity alone.

Both are fixed per vehicle, not per generation — the point is that a viewer comparing NOAH's 2001 generation against its 2022 generation is seeing the same grade and color both times, so the only thing that reads as different is the vehicle's actual design.

## What Reference Length is

The same "fix the answer before generating" logic applies to one more thing that's easy to get wrong across independently-generated photos: **relative vehicle size.** CarVista's premise is a shared world — same studio, same camera, same distance, same floor — and in that world, a genuinely bigger vehicle (Alphard, a full-size luxury minivan) should read as visibly, if modestly, bigger in frame than a compact-class one (VOXY/NOAH/SERENA/STEPWGN), which in turn should read bigger than a smaller-class one (a future Freed-class vehicle). Checked directly (2026-07-26): the current photo set does **not** show this — all measurable vehicles occupy roughly the same ~76-79% of frame width regardless of real class, which reads as "every car is actually the same size," not as a shared-world photo series with real cars in it.

- **`referenceLengthMm`** — the real-world approximate overall length (mm) of the vehicle's current/most recent generation, sourced the same way every other spec on this site is (official catalog figures, not invented). This is the anchor a future image-generation prompt should calibrate body scale against, relative to every other vehicle's own `referenceLengthMm` — **while holding camera position, focal length, and floor position identical across every vehicle and every generation.** Only the body's apparent scale should vary, and only by roughly the real proportional difference (CarVista's own target: a clear-but-not-extreme 5-10% step between size classes, not an exaggerated one).
- This does **not** replace the existing per-vehicle "Cross-generation scale consistency" check ([Image Integration Checklist §3](../architecture/image-integration-checklist.md)) — a vehicle's own older generations legitimately being smaller than its current one is a real, sourced historical fact (e.g. NOAH's 60系 vs. 90系), not something this field overrides. `referenceLengthMm` is the anchor for *cross-vehicle* scale at a given point in time (most visibly, the current/latest generation each vehicle shows on Home and in Hero); within-vehicle generational growth is its own, separately-sourced fact per generation.
- **Existing images are grandfathered — this is a forward-looking rule for regeneration, not a retroactive resize.** The 2026-07-26 finding above was left as-is by explicit user decision; this field governs vehicles and generations created or replaced from this point on.
- **`referenceLengthMm` is internal production metadata, not display data.** It exists only to calibrate body scale at image-generation time — it is not, and should never become, a spec displayed anywhere in the UI (no "全長 4945mm" label, no spec sheet, nothing rendered from this field). If a future request wants a vehicle's dimensions actually shown on the page, that's a new, separate, deliberately-scoped decision — not something this field already quietly does.

## Where it lives

Each vehicle's Role, Design Identity, Avoid Keywords, Representative Grade, and Representative Color are real fields in its data file, not only lines in this document:

```js
// src/cars/<slug>.js
designRole: 'The expressive choice.',
designIdentity: ['Sharp', 'Dynamic', 'Aggressive'],
designAvoid: ['Elegant', 'Luxury', 'Formal'],
representativeGrade: 'Standard model',
representativeColor: 'Attitude Black Mica',
referenceLengthMm: 4695, // current generation's approx. overall length -- see "What Reference Length is"
```

The data file is what a future session actually opens when adding or editing a vehicle — fields that only exist in a separate markdown file are easy to forget to check. This document is the *reasoning* behind them (why these, why not others, how they were sourced); the data fields are the *enforced* record a session works against day to day. Keep all in sync — if a value changes here, update the data file, and vice versa.

## Market segment clusters

Same-maker is not the only place two vehicles compete for the same identity. CarVista's own roster already spans two makers with genuinely overlapping vehicles — a future addition (an Estima, an Elgrand, a Serena rival) is far more likely to collide with an *existing vehicle in its real-world market segment* than with a same-maker sibling in a completely different class. Check the new vehicle's keywords against its entire cluster, not just its maker:

| Cluster | Members | Notes |
|---|---|---|
| Mainstream family minivan | VOXY, NOAH, SERENA, STEPWGN, ESQUIRE | The real-world competitive set these nameplates are actually cross-shopped within, spanning all three of CarVista's current makers. ESQUIRE (added 2026-07) is a third sibling on VOXY/NOAH's own platform, not a new competitor -- same reasoning as Vellfire/Alphard below, one cluster below it. A future addition in this class (e.g. a Toyota Estima) checks against all five. |
| Luxury minivan | Alphard, Vellfire | Vellfire (added 2026-07) is Alphard's own platform-sharing sibling -- the real-world case this row was written for. A future addition here (e.g. an Elgrand) checks against both. |
| Compact minivan | FREED | FREED (added 2026-07) is genuinely smaller-class, not a Mainstream-cluster member despite also being a Honda alongside STEPWGN -- see "What Reference Length is" below, which predicted almost exactly this addition ("a future smaller-class... around 4250-4300mm") before FREED existed. Sole member so far; a future addition here (e.g. a Sienta) checks against it. |

A vehicle belongs to a cluster by what it actually competes against in the real market, not by category label alone — add a new cluster row when a genuinely different segment is added, rather than forcing every future vehicle into one of these two.

## How to choose keywords for a new vehicle

1. **Write the Role first.** One sentence, "The [adjective] [noun]." form — settle what the vehicle *is* before deciding how to write about it.
2. **Source Design Identity and Avoid, don't invent them.** Ground each vehicle's keywords in how it's actually positioned — official manufacturer language, how the nameplate is marketed, how it's described relative to its own segment-mates (a WebSearch pass is normally enough; this project already has a discipline of sourcing generation/model-code facts the same way — extend that discipline to tone, not just data). The strongest possible source is an official comparison that names two segment-mates in the same sentence — see NOAH/VOXY below.
3. **Check against every vehicle in the same market segment cluster, not just the same maker.** This is the step most likely to be skipped and most likely to matter: a keyword set that could describe two segment-mates interchangeably has failed, no matter how accurate either set is in isolation, and no matter whether they share a maker.
4. **Pick a genuinely different vocabulary family, not just different words.** "Large" and "Big" are the same word; "Sharp" and "Aggressive" are the same family. NOAH and VOXY are real badge-engineered twins — same platform, same model codes, same silhouette — which makes this the hardest case on the site and the clearest test of the rule: their keyword families (VOXY: sharp/geometric — mesh, V-shape, diamond pattern; NOAH: composed/substantial — solid chrome slabs, roundness, gravitas) have to differ even though the underlying vehicle barely does.
5. **Write the Avoid list at the same time as the Design Identity, not later.** See the three sources above — the Avoid list isn't an afterthought pass, it's the other half of the same sourcing work.
6. **Three to five keywords per list, no more.** More than five stops being a judgment tool and starts being a mood board — it stops being checkable against a specific line of copy.

## Current roster

| Vehicle | Maker | Role | Design Identity | Avoid | Why |
|---|---|---|---|---|---|
| VOXY | Toyota | The expressive choice. | Sharp, Dynamic, Aggressive | Elegant, Luxury, Formal | Official comparison copy frames VOXY's theme as "先鋭・独創" (cutting-edge/original) directly against NOAH's "王道・落ち着いた" (mainstream/composed) — the clearest possible sourcing for both vehicles at once. |
| Alphard | Toyota | The flagship luxury. | Presence, Luxury, Dignified | Sporty, Playful, Casual | Toyota's flagship luxury minivan (Executive Lounge-grade positioning) — the formal, high-end register within the maker, and CarVista's only Luxury minivan cluster member so far. |
| NOAH | Toyota | The composed standard. | Composed, Horizontal, Substantial | Aggressive, Sporty, Edgy | Twin of VOXY by platform and silhouette; the fascia is the one real difference, and official comparison copy names it directly (see below). |
| SERENA | Nissan | The open family choice. | Family, Friendly, Open | Aggressive, Luxury, Intimidating | Nissan's own long-running family-minivan positioning; first non-Toyota vehicle on the site, and a same-cluster (not same-maker) check against VOXY/NOAH/STEPWGN. |
| STEPWGN | Honda | The functional essential. | Simple, Clean, Functional | Flashy, Aggressive, Luxury | Sourced directly from Honda's own stated concept for the nameplate — "家族みんなの使い勝手 = ユーティリティをデザインするクルマ造り" (designing a car around everyday family usability). |
| Vellfire | Toyota | The bold alternative. | Bold, Aggressive, Individual | Elegant, Dignified, Formal | Toyota's own official contrast against its platform-sharing sibling: "ヴェルファイアが掲げるコンセプトは、上質さとアグレッシブさの追求...アルファードは、真のラグジュアリー追求をコンセプト" — the same strength of sourcing as the NOAH/VOXY pair, this time for the Luxury minivan cluster. |
| ESQUIRE | Toyota | The refined compact. | Refined, Elegant, Polished | Aggressive, Sporty, Utilitarian | Third sibling on VOXY/NOAH's own platform. Official concept copy: "新上級コンパクトキャブワゴン" (a new upscale compact cab-wagon) pursuing 高級感/上質感, explicitly contrasted against VOXY's own "スポーティ・先進的" register — the same strength of sourcing as the NOAH/VOXY pair, this time for a three-way sibling set within the Mainstream cluster. Discontinued 2021 without a full model change; CarVista's first single-generation vehicle (see "Single-generation vehicles" below). |
| FREED | Honda | The just-right compact. | Approachable, Compact, Cheerful | Luxurious, Aggressive, Formal | Sole member of the new Compact minivan cluster (genuinely smaller-class than STEPWGN despite sharing a maker — see the cluster table above). Honda's own development concept for the current generation: "'Smile' Just Right Mover," building on the previous generation's "ちょうどいい" (just right) positioning toward "こころの余裕" (peace of mind). |

No two vehicles share a Design Identity keyword within the same cluster — checked across the whole Mainstream family minivan cluster (VOXY/NOAH/SERENA/STEPWGN/ESQUIRE), the Luxury minivan cluster (Alphard/Vellfire), and the Compact minivan cluster (FREED, sole member so far) separately, not only within one maker — and every Avoid list either mirrors a cluster-mate's own keywords (catching collisions structurally, not just at review time) or is sourced from an official contrast. (Vellfire's "Aggressive" is not a collision with VOXY's own "Aggressive" — they sit in different clusters, per the cluster-scoped check this document itself defines.)

| Vehicle | Representative Grade | Representative Color | Why |
|---|---|---|---|
| VOXY | Standard model | Attitude Black Mica | Color name itself reinforces Sharp/Aggressive; standard grade is available across every grade line for this nameplate (unlike NOAH, where some colors are grade-restricted). |
| Alphard | Z | Black (202) | Black is Alphard's single most popular color (~half of buyers); sourced coverage explicitly ties it to this vehicle's Presence/Dignified register. Z carries Alphard's signature face without the Executive Lounge halo trim's cabin-specific luxury framing. |
| NOAH | Standard model | White Pearl Crystal Shine | The standard grade is the one this vehicle's whole Design Identity revision is grounded in (see above). White is sourced as softening/calming a body's read — the color equivalent of "Composed." |
| SERENA | Standard model | White Pearl | Base "X" grade, not the sportier Highway STAR trim, matching the Family/Friendly register; white avoids the heavier, more formal impression black carries on this vehicle. |
| STEPWGN | AIR | Platinum White Pearl | "AIR" is this generation's own standard nameplate, distinct from the sportier SPADA trim already ruled out by this vehicle's Avoid list. Platinum White Pearl is sourced as this nameplate's most popular color, described in terms of reassuring, standard-choice confidence — matching Simple/Clean directly. |
| Vellfire | Z Premier | Black | The current (40系) generation ships in only two colors, Black (standard/no-cost) and Platinum White Pearl Mica (paid) — Black is sourced as conveying "力強さと高級感" (boldness), matching Bold/Aggressive better than the white option. Z Premier is the mainstream signature-face grade, distinct from the cabin-focused Executive Lounge halo trim — same reasoning as Alphard's own Z choice. |
| ESQUIRE | Gi | Black | "Gi" is the premium-tier grade (vs. base "Xi") -- a documented special package on it is literally named "Gi プレミアムパッケージ ブラックテーラード" (Gi Premium Package Black Tailored), which sources both the grade and the color at once and reinforces Refined/Elegant/Polished directly ("Tailored"). |
| FREED | AIR | Fjord Mist Pearl | "AIR" is the current generation's standard-trim lineup (vs. the SUV-styled CROSSTAR) -- coincidentally the same "AIR" name Honda also uses for STEPWGN's standard trim, unrelated nameplates. "フィヨルドミスト・パール" (name verified 2026-07-31, no "II" suffix) is a real Honda color available on FREED -- also used on STEPWGN, not AIR-exclusive as an earlier version of this row claimed. Sourced as evoking cool Nordic air, matching Approachable/Cheerful's light, airy register, and matches the supplied reference photos. |

| Vehicle | Reference Length (current gen, approx.) | Cluster position |
|---|---|---|
| Vellfire | ~4995mm | Luxury minivan — Toyota's own current-gen spec figure; slightly longer than Alphard due to a deeper front bumper/grille, otherwise shares Alphard's platform. |
| Alphard | ~4945mm | Luxury minivan — should read ~5-10% bigger in frame than the Mainstream cluster below, camera/floor held identical. |
| VOXY | ~4695mm | Mainstream family minivan — same platform/length as NOAH. |
| NOAH | ~4695mm | Mainstream family minivan — same platform/length as VOXY. |
| ESQUIRE | ~4695mm | Mainstream family minivan — same platform/length as VOXY/NOAH (third sibling on the same body-in-white). |
| SERENA | ~4765mm | Mainstream family minivan — Nissan's own nameplate, close to but not identical to the Toyota pair; the small real difference is fine to show, not something to force to exact parity. |
| STEPWGN | ~4800mm | Mainstream family minivan — largest within the mainstream cluster, still meaningfully smaller than Alphard. |
| FREED | ~4310mm | Compact minivan — genuinely smaller class, should read visibly smaller in frame than the entire Mainstream cluster above it, camera/floor held identical; this is the "future smaller-class addition" this section already anticipated. |

## Single-generation vehicles

ESQUIRE (added 2026-07) is CarVista's first vehicle that never received a full model change before being discontinued (2014–2021, folded back into the NOAH/VOXY lineup at end of life) -- its `generations` array has exactly one entry. This affects more than the data file:

- **`era` is `'初代'` (first generation), never `'現行モデル'`** — the latter means "current/ongoing," which is false for a discontinued vehicle. Don't relabel it "current" just because it's also the last (and only) entry.
- **The vehicle-page HTML omits `.heritage` and `.compare` entirely** (not just hides them with CSS) — both are inherently multi-generation components (a start-year *strip*, a generation-*comparison* slider) that don't have a sensible single-generation rendering, and `.heritage`'s "現在" label for the last point would be factually wrong for a discontinued vehicle regardless. `car-page.js`'s `initCarPage()` guards both calls with an element-existence check, so no per-vehicle JS is needed — see `cars/esquire.html`'s own comment for the full reasoning. Copy `esquire.html`, not `voxy.html`, as the template for any *future* single-generation vehicle; copy `voxy.html` for anything with 2+.
- **The per-vehicle JSON-LD's `productionDate`** (see `vite.config.js`'s `buildJsonLd`) is derived from whether a generation's own `yearRange` ends in `'現在'`, not from array position — this is what correctly leaves ESQUIRE's single generation with a real end date instead of reading as still in production.

These figures are approximate (current-generation catalog specs, not verified to the millimeter) and exist to calibrate *relative* scale between vehicles, not to be published anywhere on the live site — re-check against current official specs before relying on one precisely. A future smaller-class addition (e.g. a Freed-class vehicle, not yet on the roster) would sit below this whole table, around 4250-4300mm.

### NOAH — reviewed and revised

NOAH previously carried `['Warm', 'Horizontal', 'Substantial']`. Asked to review it against official Toyota positioning specifically, a more precise source turned up: Toyota dealer comparison copy states the current-generation NOAH's theme as **"王道・アグレッシブ"** (mainstream, with an aero-grade-specific aggressive option) for the lineup overall, but is explicit that the **standard grade** — which is what CarVista depicts, per its own representative-spec policy in the shared footer — reads as **"落ち着いた"** (composed, settled), while the aero grade is what earns "アグレッシブ." The same source states VOXY's theme as "先鋭・独創" in direct contrast.

This sharpens two things at once:
- **"Warm" → "Composed."** Both are real, sourced facts about NOAH (親しみやすさ / 落ち着いた), but "Composed" is the more precisely sourced term for the specific grade CarVista actually shows, and pairs more exactly against VOXY's own official contrast term.
- **NOAH's Avoid list gets stronger evidence.** "Aggressive" isn't just an inference from NOAH being the calmer twin — it's the literal word official copy uses for VOXY in the same sentence that describes NOAH's standard grade as composed.

"Horizontal" and "Substantial" were already well-founded (grille proportion and visual weight, respectively) and are unchanged. This is the kind of revision this document expects over time — keywords aren't locked once sourced the first time; a better source found later should update them, same as any other researched fact on this site.

## Quality Gate — run before publishing any new vehicle

- [ ] Role, Design Identity, and Avoid keywords are all defined and sourced (not invented), and recorded in both this document's roster table and the vehicle's `designRole` / `designIdentity` / `designAvoid` fields.
- [ ] `representativeGrade` and `representativeColor` are defined and sourced, and recorded in both this document and the vehicle's data file.
- [ ] Hero-adjacent copy for this vehicle actually expresses its Design Identity keywords — if a keyword doesn't show up anywhere in what was written, either the copy or the keyword is wrong.
- [ ] No annotation label contains, or reads as a synonym of, any of this vehicle's Avoid keywords.
- [ ] SEO `description` doesn't contradict the Design Identity — a Simple/Clean/Functional vehicle's description shouldn't lead with language that reads Luxury or Aggressive.
- [ ] Every generation's Hero/Compare/Timeline image depicts the fixed `representativeGrade` and `representativeColor` — not a different grade or color per generation (see [Image Integration Checklist §4](../architecture/image-integration-checklist.md)).
- [ ] The vehicle reads as distinct from every other vehicle already on the site, not only from the ones made by the same manufacturer.
- [ ] No Design Identity keyword collision with any vehicle in the same market segment cluster (see the cluster table above) — checked against the whole cluster, not only same-maker siblings.
- [ ] `referenceLengthMm` is defined and sourced, and the vehicle's apparent body scale in its own generated images reads consistent with it relative to every other vehicle already on the site — same camera position/focal length/floor across vehicles, only body scale varying (see [Image Integration Checklist](../architecture/image-integration-checklist.md)'s cross-vehicle scale section).

An asset that fails any one of these should not publish with a note explaining the exception — fix the copy or the keyword, the same standard this project already holds images to (see [Image Integration Checklist](../architecture/image-integration-checklist.md)).

## Relationship to other documents

- [Image Integration Checklist](../architecture/image-integration-checklist.md) governs photo-level quality once real images exist; this document governs *copy* tone and cross-vehicle distinction and applies regardless of whether a vehicle's images are placeholders or final.
- [Vehicle Illustration Policy](../policies/vehicle-illustration-policy.md) and `editorial-policy.html` govern what CarVista discloses publicly about how images are made; this document is internal working guidance, never published verbatim.
- Older `docs/architecture/` documents (Production Pipeline, Art Direction, Production Tooling, Testing Matrix) describe a 3D-modeling pipeline that was tried and set aside in practice (see project memory) — this document does not depend on them and applies regardless of which image-production method is current.
