# Shared 3D Master Pipeline

Status: **Approved**
Scope: the production requirement that 3D Modeling and Rendering must satisfy at 50–100 vehicle scale, and today's implementation of it

## Purpose

[Production Pipeline](production-pipeline.md) defines *what happens* at each stage (Reference Collection → Shape Analysis → 3D Modeling → Rendering → Quality Gate → Publishing). It does not say what the 3D Modeling and Rendering stages must be built *on* to survive fifty to a hundred vehicles, or a decade of continued operation.

This document defines that requirement first, independent of any tool. It then names the implementation that currently satisfies it. The requirement is the durable part of this document; the named tool is not — it is a current-state finding, and this document expects to be re-read and re-checked as tools change.

It does not reopen [Definitive Master Policy](definitive-master-policy.md). That the Definitive Master must be a purpose-built, high-fidelity 3D surface model, and that AI-generated images never define geometry, is treated here as fixed.

## The principle: Shared 3D Master Pipeline

Car Evolution's value is not the vehicle's specifications — it is seeing the same composition, the same viewpoint, and the same light reveal how a design changed over time. A tool serves this project only if it can guarantee, structurally, that:

- **The camera, the light, and the space are defined once and reused** — not re-approximated by eye, and not re-inferred by a model — across every vehicle the project ever adds. This is what "one camera, one light, one space" (Production Pipeline) requires the *tooling* to make true, not just the finished renders.
- **Every mesh is built directly against the locked dimensions**, never estimated or redrawn from memory per generation.
- **The rig is a single, versioned, shared asset.** A change to the camera or the light is felt by every vehicle at once; nothing about the shared environment is duplicated or re-created per vehicle.
- **The pipeline remains operable, inspectable, and re-editable for the life of the product** — realistically, past ten years — without depending on one vendor's pricing, continued existence, or goodwill.
- **Producing the next vehicle is a repeatable, scriptable operation**, not a manual re-setup of camera, light, or scene.

This is the actual requirement. Any tool that satisfies it is acceptable. Any tool that is otherwise capable but cannot satisfy it is not — no matter how good a single image it produces.

## Comparison

### Production fit — can it be the shared rig?

| | Blender | Spline | Three.js | Illustrator | Figma | AI image generation | AI + Blender |
|---|---|---|---|---|---|---|---|
| 量産性(50–100台への拡張) | High — one rig, scripted per-vehicle runs | Medium — real-time-oriented, not built for offline batch runs | N/A — a runtime, not an authoring tool | Low — each vehicle is manual redraw | Low — same | High in raw speed, fails elsewhere (see below) | High — same as Blender |
| 同一品質を維持できるか | High — camera/light/material are one shared asset | Medium — achievable, but not structurally enforced | N/A | Low — depends on the illustrator each time | Low — same | Low — no persistent scene state across generations | High — same as Blender |
| 車種追加コスト | Modeling + Shape Analysis time only | Similar modeling cost, less mature hard-surface tooling | N/A | Full redraw, every time | Full redraw, every time | Near-zero per image, but the image fails the principle | Modeling + Shape Analysis time only |
| 正確なシルエットを再現できるか | High — mesh built against locked dimensions | High modeling capability, less automotive-specialized | N/A | Low — silhouette redrawn by eye | Low — same | Disallowed by Definitive Master Policy | High — geometry still comes from Blender |
| 同じカメラ位置を固定できるか | High — camera is a reusable, linked scene object | Medium-High — possible, not templated as a shared library asset by default | N/A | No true camera concept | No true camera concept | No — framing is re-inferred every time | High — inherited from Blender |
| ライティング固定が容易か | High — lighting rig is a linked, versioned asset | Medium | N/A | No physical lighting model | No physical lighting model | No — lighting is regenerated | High — inherited from Blender |
| Web表示との相性 | High — exports standard static images | High for real-time embedding — a different product decision (see below) | High, only if Publishing became a real-time 3D scene | High — but the asset itself is the weak link | High — same | High as files, but fails upstream | High — same as Blender |

### Long-term sustainability — can it remain the shared rig for a decade?

| | Blender | Spline | Three.js | Illustrator | Figma | AI image generation | AI + Blender |
|---|---|---|---|---|---|---|---|
| Longevity(10年以上運用できるか) | High — 30+ year open-source project, no license expiry | Medium — younger commercial product, cloud-hosted, tied to company continuity | High as a library, but N/A to this decision (it's not an authoring tool) | Medium — long Adobe history, but access is rented (Creative Cloud), not owned | Medium — actively developed, but entirely cloud-dependent | Low — models and providers churn; the same prompt doesn't reproduce the same result over years | High — same as Blender |
| Open Format | High — .blend is open; glTF/FBX/OBJ export widely supported | Low — proprietary project format | N/A — a JS library, not an asset format | Low — proprietary .ai | Low — proprietary cloud format | No durable source asset exists behind an output image | High — same as Blender |
| Scriptability | High — full Python API, headless CLI rendering | Medium — geared to real-time interactivity, not headless batch production | High as code, but not applicable to the 3D Modeling stage itself | Medium — scripting API oriented to 2D documents | Medium — plugin API oriented to 2D UI design | High (API-driven), but automates the wrong thing — not dimension-lock compliance | High — same as Blender |
| Community | High — large, active, well-documented, strong in hard-surface/automotive modeling | Medium — growing, but smaller and web/design-tool oriented | High — large open-source web-3D community | High generally, but not specific to this problem | High generally, but not specific to this problem | High and fast-moving — but that churn is itself the risk | High — same as Blender |
| Vendor Lock-in | Low — free, open-source, no seat licensing | High — subscription cloud service | Low — open-source library | High — Creative Cloud subscription | High — fully cloud-hosted service | High — dependent on one provider's model staying available at all | Low — same as Blender |

## Current Implementation: Blender

The principle above is the requirement; it does not name a tool. Measured against it today, Blender is the implementation that satisfies every leg of it without compromise — production fit and long-term sustainability both. That is a present-tense finding, not a permanent commitment: if a future tool matches or exceeds Blender on Longevity, Open Format, and Vendor Lock-in in particular (the properties most likely to change over a tool's life), the pipeline changes its implementation. The principle does not move when the implementation does.

Concretely, under Blender: the camera, light, and environment are built once as a shared, linked scene, not rebuilt per vehicle. Each new vehicle adds only a mesh built against its own Shape Analysis output, dropped into the existing rig. Rendering is scripted (Blender's Python API / command-line rendering), so producing the next vehicle's render set is a repeatable operation.

### Where AI fits

"AI + Blender" is not a fourth implementation next to Blender — it is what disciplined use of Blender already looks like once AI is kept inside the role Definitive Master Policy already permits: gathering and organizing reference and moodboard material, and optionally assisting non-geometric render steps such as denoising. AI never defines the shared camera, light, or geometry the principle depends on being singular and reusable, and it never produces a published image on its own.

### Why the other candidates don't satisfy the principle

- **Spline** — capable at modeling and rendering, but fails the sustainability half of the principle: a proprietary cloud format, no offline operation, and continued existence tied to one vendor's pricing and roadmap. Its strength — real-time delivery to a browser — answers a different question (whether Car Evolution should eventually render vehicles live in-browser), which is a future product decision separate from choosing today's shared rig.
- **Three.js** — a rendering runtime, not an authoring tool. It has no answer to how the 3D Modeling stage is performed, so it isn't a candidate for this decision at all; it would only become relevant if Publishing moved from a controlled render set to a live 3D scene, which Production Pipeline does not currently call for.
- **Illustrator** and **Figma** — no persistent 3D camera or physical light exists in either tool, so "the same camera, the same light" across 50–100 vehicles would mean redrawing perspective and shading by eye every time — the opposite of a shared, versioned rig. Both are also cloud/subscription-dependent for continued access, failing Vendor Lock-in and Open Format as well.
- **Standalone AI image generation** — already excluded by Definitive Master Policy as a geometric source, and independently fails the principle on its own terms: no fixed camera or light persists between generations, no durable source asset exists to re-derive or audit a render from, and the underlying model or provider itself is not guaranteed to exist or behave the same way in ten years.

## Scope note

This document does not decide file formats, folder structure, or how render assets are versioned alongside the Git repository — those are implementation details for whoever sets up the first VOXY production run, not principle-level decisions.

This document selects a production pipeline, not a creative style. Creative direction is defined elsewhere. This document only defines how a consistent master asset is produced and maintained.
