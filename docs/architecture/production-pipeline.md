# Definitive Master Production Pipeline

Status: **Approved**
Scope: production process for the Definitive Master asset

## Purpose

This document defines the process by which the Definitive Master is produced.

It does not redefine what the Definitive Master is. That identity, its dimension lock, and its geometry policy are fixed in [Definitive Master Policy](definitive-master-policy.md) and are not restated here except by reference.

This is a process document, not a design document. It exists so that every future vehicle asset — not only the current VOXY — is produced through the same disciplined sequence, and so that no step can be skipped without visibly breaking the chain.

## Pipeline overview

```
Reference Collection
       ↓
Shape Analysis
       ↓
3D Modeling
       ↓
Rendering
       ↓
Quality Gate
       ↓
Publishing
```

Each stage consumes the output of the previous stage only. No stage may substitute a shortcut (concept art, AI-generated imagery, approximation from memory) for the defined input of the stage before it.

## 1. Reference Collection

**Input:** none (starting stage)
**Output:** an ordered, sourced reference set for one vehicle identity

Reference material is collected strictly in the priority order fixed by the Geometry policy in the Definitive Master Policy:

1. Official Toyota dimensions
2. Official Toyota press photography
3. Official Toyota catalogs
4. Verified real-vehicle inspection
5. Direct measurements, when available

Every reference item is logged with its source and priority tier. A reference set with gaps in the higher tiers must not proceed to Shape Analysis on the assumption that a lower tier will silently fill them — the gap is recorded and resolved before moving on.

AI-generated images may be collected only as mood or concept material, never filed as geometric reference, per the Definitive Master Policy.

## 2. Shape Analysis

**Input:** the sourced reference set
**Output:** a validated set of proportions, panel lines, and silhouette landmarks for the vehicle

The locked dimensions (length, width, height, wheelbase, front/rear track) are the fixed anchors against which every reference image is checked. Shape Analysis reconciles proportions across references and resolves discrepancies against these anchors — it does not average away disagreement or interpolate missing panels from unrelated vehicles.

Shape Analysis is the only stage where reference conflicts are resolved. If two references disagree — a press photo implying a different panel line than a catalog diagram — the disagreement is settled here, against the locked dimensions, and nowhere else. No later stage may reopen it. 3D Modeling does not adjudicate geometry; it builds what Shape Analysis has already decided. The geometric truth of the vehicle is fixed at this stage.

Output of this stage is a proportion map, not a model. It becomes the brief that 3D Modeling builds against.

## 3. 3D Modeling

**Input:** the proportion map from Shape Analysis
**Output:** a purpose-built, high-fidelity 3D surface model

The model is built directly against the locked dimensions and the Shape Analysis output. Retopologizing, refining, or extending the MVP's CSS prototype is not a valid path into this stage — the Definitive Master Policy prohibits treating the prototype as a modeling source, and this pipeline does not create an exception.

Surfacing accuracy takes precedence over render-readiness at this stage. A model that looks finished but deviates from the dimension lock fails here, regardless of visual quality.

## 4. Rendering

**Input:** the approved 3D surface model
**Output:** a controlled render set

Rendering follows the visual principles already set for the product: one camera, one light, one space. The environment must communicate nothing about time or generation — only the vehicle's form does. Renders are produced under consistent, repeatable camera and lighting setups so that different generations of the same vehicle can be compared without the render setup itself introducing a variable.

Rendering never adds information. It only reveals the geometry. The shape and proportions were already decided in Shape Analysis and built in 3D Modeling; Rendering does not correct, reinterpret, or enhance them — it makes the already-decided form visible.

## 5. Quality Gate

**Input:** the controlled render set
**Output:** a pass/fail decision per asset

The gate is the one already defined in the Definitive Master Policy, applied here as an enforced checkpoint rather than restated as new criteria:

- Hide year, generation, badges, specifications, labels, and explanatory text.
- If the vehicle's shape alone communicates the passage of time, the asset passes.
- If explanation is required, the asset fails.

A failed asset returns to the earliest stage where the failure originates — this may mean returning to 3D Modeling for a geometry issue, or only to Rendering for a lighting or framing issue. It does not proceed to Publishing under a caveat.

## 6. Publishing

**Input:** a render set that has passed the Quality Gate
**Output:** the asset made available to the product experience

Publishing is the only stage that exposes an asset to the live experience. Nothing bypasses the Quality Gate to reach this stage, including time-sensitive or provisional releases.

Publishing changes nothing. It exposes only what has already passed. No visual correction, touch-up, or adjustment happens at this stage — anything an asset still needs belongs to an earlier stage, not to Publishing.

## Relationship to the MVP

The current CSS vehicle remains an interaction prototype, as fixed in the Definitive Master Policy. This pipeline describes how its eventual replacement is produced — it does not describe a path for upgrading the prototype itself into a production asset. When a Definitive Master asset completes Publishing, it replaces the prototype in the experience; the prototype is not merged, blended, or referenced as a fallback.

## Scope beyond the current vehicle

This pipeline is written for the Definitive Master in general, not only the 90 Series VOXY. Any future vehicle added to Car Evolution follows the same six stages in the same order.
