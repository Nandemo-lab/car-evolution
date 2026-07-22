# Art Direction

Status: **Approved**
Scope: what a Car Evolution illustration must reproduce, and what it may simplify, for any vehicle the project covers

## Purpose

This document sits beside [Production Pipeline](production-pipeline.md) and [Production Tooling](production-tooling.md), not above them. Production Pipeline defines how an asset moves through stages. Production Tooling defines what today's shared authoring environment is. Neither says what the finished image should actually look like, or which shape features matter more than others when full photoreal reproduction isn't the goal.

This is a Creative Direction document. It does not reopen [Definitive Master Policy](definitive-master-policy.md)'s vehicle identity or dimension lock, and it does not reopen Production Pipeline's stage sequence. It answers the question those documents deliberately leave open: given accurate geometry, what has to survive simplification, and what doesn't? It applies to every vehicle Car Evolution ever covers, not to one model.

The VOXY was the first vehicle run through the pipeline, and its first attempt is used throughout this document as evidence, not as its subject. A proportion-accurate parametric block-out got every locked dimension right and still failed the Quality Gate — it read as a generic boxy shape, not as a specific vehicle. That failure is what exposed the gap this document fills: correct proportions are necessary but not sufficient, for any vehicle, not only this one.

## Foundation

Car Evolution is not aiming for photorealism. [Laws of Experience](laws-of-experience.md) already establishes that the viewer discovers before being told — that only works if the *fewest* shape cues are the *right* shape cues. The goal of art direction is extraction, not reproduction: find the small set of features that let someone recognize a specific vehicle, and a specific era of it, and let everything else simplify freely.

## Identity Elements

An Identity Element is a shape feature that, if lost, doesn't just reduce quality — it makes the asset register as a *different vehicle*. These are not ranked by importance; each one is load-bearing on its own, and dropping any single one risks the same failure the VOXY block-out demonstrated.

- **Overall proportion and cabin-to-body ratio.** Numerically correct isn't the same as visually legible — the failed block-out had exactly the right numbers and still didn't read correctly. Proportion has to be *seen*, not just measured.
- **Roofline character.** Whether a roofline runs flat, tapers, slopes, or steps is, per Definitive Master Policy's own Quality Gate, one of the clearest cues that time has passed between generations of the same vehicle. It cannot be smoothed away or approximated toward a generic curve.
- **Front fascia signature shape** — headlight cluster shape and position, and the grille's outline and rough value pattern (light/dark), not its literal texture.
- **The primary character line(s)** that separate glass from body along the side of the vehicle. This is one of the strongest cues that tells the eye "this specific vehicle," not "a vehicle like this."
- **Wheel arch shape and stance** — their position and proportion relative to the body, not tire tread or brake detail.
- **Pillar rake and cabin taper direction.** This is frequently what separates two similar-looking vehicle types from each other (a minivan from a cargo van, a coupe from a sedan) — losing it collapses a specific vehicle into a generic category.

## Elements that may be simplified

- Badge and logo detail — a mark is enough; it doesn't need to be engraved or legible up close.
- Grille mesh or texture pattern — its individual cells don't need to be modeled, only its outline and value.
- Panel gaps, door handles, mirror housings — minor surface incidents, not identity carriers.
- Interior — not part of any Definitive Master asset if it is never visible in the product's fixed exterior camera.
- Tire tread pattern and brake caliper detail.
- Paint material accuracy — a flat, consistent material across every vehicle matters more than any one vehicle's paint looking physically precise. Material realism competes with the "one camera, one light, one space" consistency Production Tooling exists to protect, and loses.

## Silhouette priority

In order of what must read correctly first, since the silhouette is the first and sometimes only thing the viewer sees before the shape is explained:

1. Overall proportion (length / height / cabin ratio)
2. Roofline character — the primary generation-to-generation signal
3. Front fascia outline (headlight/grille boundary shape)
4. Primary character line path
5. Wheel and wheel-arch stance

## Detail priority

Once the silhouette above reads correctly, effort is spent in this order — and stops being spent once it stops changing recognizability:

1. Headlight cluster shape (not its internal lens/LED elements)
2. Grille outline and value (not modeled mesh geometry)
3. Character line depth and sharpness
4. Wheel design impression (spoke rhythm, not CAD-accurate spokes)
5. Everything else — mirrors, handles, badges — lowest priority, simplify freely

## Abstraction level

Car Evolution's illustrations sit between two failure modes, both already observed in practice:

- **Too abstract fails.** The parametric block-out proved this — correct dimensions, zero recognizability. A shape missing its Identity Elements reads as no vehicle in particular.
- **Too literal fails the product's own philosophy and [vehicle illustration policy](../policies/vehicle-illustration-policy.md).** Photoreal reproduction, or tracing a reference photo's exact lighting and shading, is out of scope for this project — that is a different product than the one being built.

The target sits between them: a shape built from accurate 3D surfacing, reduced until only its Identity Elements remain legible — closer to the abstraction of a well-drawn icon than to a product photograph, but never hand-drawn or freehand.

## Quality Gate

This extends Definitive Master Policy's existing gate; it does not replace it. That gate asks whether shape alone communicates the passage of time. Art Direction breaks that question into three escalating, testable stages. Each stage only matters once the one before it passes.

### 1. Silhouette Test

Does the overall shape read as a coherent, correctly proportioned vehicle at all — proportion, roofline character, and stance in agreement with the locked dimensions? This is the baseline geometric check, independent of which specific vehicle it's supposed to be.

### 2. Recognition Test

With color and material removed — a single flat silhouette, no shading, no paint — can someone who knows the vehicle identify it as *that specific vehicle*? This test lives or dies on the Identity Elements above: an asset that passes Silhouette but fails Recognition is missing one of them, not merely under-detailed.

### 3. Consistency Test

Placed alongside other generations or eras of the same vehicle, does the difference between them read naturally, without needing a label to explain it? This is Definitive Master Policy's original Quality Gate language, made explicit as a comparative test rather than a single-asset one — it is the actual payoff the product exists to deliver, and it cannot be evaluated until Silhouette and Recognition both already pass for every asset being compared.

An asset that passes all three, however simplified everything outside its Identity Elements is, succeeds. An asset that fails any one of them does not proceed, regardless of how much surface detail or realism it otherwise has.

## Negative Examples

Not additional rules — the boundary of the rules already stated above, made concrete:

- Do not chase photorealism at the cost of an Identity Element. Realism is not on this document's list of priorities anywhere; an Identity Element always is.
- Do not let detail work proceed before the silhouette is right. Detail priority only exists once Silhouette Test already passes — it is not a substitute for it.
- Do not change the camera or the lighting between vehicles or between generations. That variable belongs to Production Tooling's shared rig, not to this document, and drifting it breaks the Consistency Test before art direction is even the question.
- Do not correct or reinterpret shape during Rendering. Production Pipeline already settles this — Rendering reveals geometry, it does not add to it — and art direction does not create an exception for the sake of a better-looking render.
- Do not publish an asset that has not passed the Recognition Test. A simplified asset that is still recognizable succeeds by this document's own standard; a detailed asset that is not recognizable does not, no matter how much work went into it.
