# Comparable Visual Framework

Status: **Draft — pending review, not adopted**
Scope: a production-method-agnostic pipeline structure for producing comparable visual assets — not tied to any one production method, not named after one either

Naming note: this document was first drafted as "Asset Production Framework," then renamed. What Car Evolution needs from this pipeline is not "an asset" — it's a set of vehicles that can be looked at *side by side* and read as the same experiment run under the same conditions. The name should say that, not describe the mechanics of making one image. "Asset Production" survives only as the name of stage 3 below, where it accurately describes a single pluggable step, not the framework's own purpose.

## Purpose and what this document does not do

This document does not revise [Definitive Master Policy](definitive-master-policy.md), [Vehicle Illustration Policy](../policies/vehicle-illustration-policy.md), [Art Direction](art-direction.md), or the existing (Approved) [Production Pipeline](production-pipeline.md), which fully specifies the 3D method. All four remain unchanged. This is not a v2 or successor to Production Pipeline — it is a more general structure, one level up, that Production Pipeline's 3D method already happens to satisfy without needing to be rewritten.

It exists because Car Evolution no longer requires 3D as the only production method. A benchmark run (VOXY 90系, VOXY 80系, NOAH 90系 — see [ai-benchmark-comparison-01.md](../../production/ai-benchmark-comparison-01.md)) showed AI image generation can satisfy this project's actual requirement — high-quality, comparable-under-identical-conditions images — at least as well as the 3D attempts this project also tried and documented. Once the production method is no longer fixed, the parts of the existing pipeline that were written *assuming* 3D need to be told apart from the parts that never depended on it.

**Shape Analysis is the clearest example of the second kind, and an earlier draft of this document got it wrong.** That draft folded Shape Analysis into an "AI Generation" stage, treating it as prompt-construction input. Shape Analysis was never about 3D coordinates or AI prompts — it's the design asset that organizes what makes a specific vehicle recognizable (per Art Direction's Identity Elements), and every Shape Analysis document already produced in this project (see e.g. each vehicle's `02-shape-analysis.md`) reads that way already: proportions, fascia signature, roofline character, none of it tied to how the asset gets built. It stays its own stage here, independent of what production method follows it.

## The stage sequence

```
Reference Collection
       ↓
Shape Analysis
       ↓
Asset Production
       ↓
Normalization
       ↓
Quality Gate
       ↓
Publishing
```

Compared with the existing (3D-specific) Production Pipeline:

| Production Pipeline (3D, Approved) | This framework | Changed? |
|---|---|---|
| Reference Collection | Reference Collection | No |
| Shape Analysis | Shape Analysis | No |
| 3D Modeling | Asset Production | Generalized — see below |
| Rendering | Asset Production | Generalized — see below |
| *(none)* | Normalization | New |
| Quality Gate | Quality Gate | No |
| Publishing | Publishing | No |

## 1. Reference Collection — unchanged

Official Toyota dimensions, press photography, and catalog sources, tiered and logged per vehicle, exactly as already practiced.

## 2. Shape Analysis — unchanged, and explicitly method-independent

**Input:** the sourced reference set
**Output:** Identity Elements, proportions, and fascia/silhouette description for the vehicle

This stage does not change regardless of what comes after it. Whether the next stage is a person sculpting a 3D surface, an AI generation prompt, or something not yet tried, it consumes the same brief: what has to survive (Art Direction's Identity Elements) and what the reference material actually shows. Shape Analysis is not owned by Asset Production and is not rewritten per method.

## 3. Asset Production — the abstract, pluggable stage

**Input:** Shape Analysis's output
**Output:** a candidate visual asset

This stage is deliberately not specified to one method. Two concrete realizations exist so far:

- **3D Modeling + Rendering** — fully specified already, in full detail, by the existing Production Pipeline. That document remains the authoritative definition of this realization; nothing here reopens it.
- **AI Generation** — benchmarked this session. A prompt built from two parts: a fixed composition block (camera angle, lens, lighting, background) held identical across every vehicle, and a vehicle-identity block drawn directly from that vehicle's own Shape Analysis. Each vehicle generated independently (a fresh session per vehicle, not chained in one conversation) to avoid one generation biasing the next.

Other methods are not excluded by this structure. Whatever the method, Asset Production must take Shape Analysis's Identity Elements as its brief and respect Art Direction's abstraction-level guidance — Quality Gate downstream evaluates against those regardless of how the candidate was made.

## 4. Normalization — new stage

**Input:** a candidate visual asset, from whatever Asset Production method made it
**Output:** a candidate asset cropped, scaled, and aligned to a fixed frame

Normalization's purpose is broader than scale correction. **Its job is to absorb the differences between production methods** — AI, 3D, or anything tried later — so that nothing about *how* an asset was made is still visible by the time it reaches Quality Gate. Quality Gate evaluates whether a vehicle is recognizable and whether generations compare correctly; it was never meant to also compensate for one method's camera being a real object and another method's camera being a sentence. Normalization is where that compensation happens, once, in one place, instead of being Quality Gate's problem or every Asset Production method's separate problem.

Scale is the gap this document currently has evidence for: in the three-image AI benchmark, background, lighting, composition angle, vehicle recognition, and generation difference all held consistent from Shape Analysis discipline and prompt-template reuse alone — but scale did not. One vehicle rendered noticeably more tightly framed than the other two despite identical camera language in the prompt, because AI generation has no literal camera object the way a 3D rig's shared code does. Scale is the first documented case of what this stage is for, not the only thing it's for — a future production method might drift on some other axis (color grading, horizon line, floor reflection intensity) that Normalization would need to catch the same way.

Normalization is where that guarantee gets rebuilt deterministically, in code, regardless of which Asset Production method was used:

- Detect the vehicle's bounding box or a stable reference point (e.g., wheel contact points with the ground plane)
- Crop and scale so that reference point lands at the same frame position and the vehicle occupies the same proportion of frame width, for every vehicle
- Output at a fixed canvas size

**The specific algorithm is not designed yet.** This document proposes that the stage must exist and what it must guarantee, not its implementation. Note that 3D-produced assets may not need this stage in practice (the shared rig already guarantees the same thing at the source) — Normalization matters most for methods, like AI generation, that don't have that guarantee built in.

## 5. Quality Gate — unchanged, reused as-is

Silhouette Test, Recognition Test, Consistency Test, exactly as Art Direction defines them, evaluated against the finished asset regardless of which method produced it. Per the standing rule in this project, none of these are self-certified by whoever produced the asset.

## 6. Publishing — unchanged

The only stage that exposes an asset to the live experience, and only for assets that already passed the Quality Gate.

## Evidence this draft rests on, and what's still open

**Backed by the actual benchmark run:** vehicle recognition, generation difference, background, and lighting consistency across three independently-generated vehicles, from Shape Analysis discipline plus a shared prompt template — no per-vehicle re-invention needed beyond what Shape Analysis already produced.

**Not yet backed by evidence:**
- Normalization's actual algorithm.
- Whether the same vehicle regenerated twice produces the same framing (only different vehicles were compared against each other so far).
- Recognition Test and Consistency Test results — submitted for judgment, not yet returned.
- How Asset Production's AI realization scales past three vehicles, or holds up across vehicle categories this project hasn't tried yet.

## Status of the documents this touches

Definitive Master Policy, Vehicle Illustration Policy, Art Direction, and the existing 3D-specific Production Pipeline remain unchanged. This document is a candidate structure one level more general than Production Pipeline, not a replacement for it, pending review of the benchmark evidence and a decision on adoption.
