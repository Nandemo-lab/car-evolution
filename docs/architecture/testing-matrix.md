# Testing Matrix

Status: **Approved**
Scope: which Quality Gate tests apply to which kind of comparison, and how to read their results

## Purpose

This document defines no new tests and no new principles. Silhouette Test, Recognition Test, and Consistency Test are already defined in [Art Direction](art-direction.md)'s Quality Gate. This document only specifies which of them apply to which comparison, and how a result should be read when the comparison itself changes what "recognition" or "consistency" is even asking.

It exists because building NOAH by reusing VOXY's rig and body-loft technique (a [Production Tooling](production-tooling.md) verification, not a new vehicle launch) surfaced something the Quality Gate hadn't been asked yet: NOAH and VOXY share a body-in-white, and once color and material are removed, their silhouettes are very close to each other. That is not a modeling defect — it reflects how the real vehicles actually relate to each other. Rather than adjust Art Direction's tests to force a different outcome, this document clarifies which test was ever meant to answer that question in the first place.

## The three comparison scenarios

### 1. Same vehicle, different generation

Multiple Definitive Master assets for one nameplate, built for different production eras (e.g., VOXY 2022 against an earlier VOXY generation). This is the scenario Definitive Master Policy's Quality Gate and Art Direction's Consistency Test were written for.

| Test | Applies? | Notes |
|---|---|---|
| Silhouette Test | Yes | Each generation's asset is checked individually against its own locked dimensions. |
| Recognition Test | Yes, but see below | Not "can the exact model be named." |
| Consistency Test | Yes — this is its intended use | Does the difference between generations read as time passing, without a label? |

**What Recognition Test means in this scenario.** In Car Evolution, Recognition Test is not asking whether a viewer can name the specific model or generation. It's asking whether the asset is recognized as belonging to the same evolutionary line. Two vehicles from opposite ends of a nameplate's history can look almost entirely different by design — a 2001 first-generation VOXY and a 2022 fourth-generation VOXY are a real example already built in this project. Naming either one correctly isn't the bar. The bar is: placed side by side, does a viewer sense "these belong to the same lineage, at different points in its evolution" without being told so? If that sense of continuity is there, Recognition Test is satisfied, even if nobody involved could name the model year.

### 2. OEM siblings / badge-engineered twins

Vehicles that share a body-in-white and platform but differ in fascia, trim, and badging — the NOAH/VOXY relationship this run verified.

| Test | Applies? | Notes |
|---|---|---|
| Silhouette Test | Yes | A near-identical result across siblings is expected and correct, not a failure — they share a body by design. |
| Recognition Test | Yes, with a caveat | Color and material removal may not reliably distinguish siblings from each other, since their difference often lives in fascia material and trim rather than geometry. An asset that fails to distinguish itself from its sibling under this test is not automatically wrong for that reason — check instead whether it's recognizable against an unrelated vehicle. |
| Consistency Test | **Does not apply** | Consistency Test evaluates time passing within one nameplate's own generations. Siblings are not different eras of the same vehicle; running this test between them is a category error, not a stricter check. |

### 3. Different category vehicles

Vehicles that share no platform, body, or generation lineage.

| Test | Applies? | Notes |
|---|---|---|
| Silhouette Test | Yes | Evaluated per vehicle, independently — there is no shared body to compare against. |
| Recognition Test | Yes, and at its clearest | With no shared platform creating overlap, this test is most meaningful here. |
| Consistency Test | **Does not apply between vehicles** | Consistency Test only ever compares a vehicle's own generations against each other. Once an unrelated vehicle has multiple generations of its own built, Consistency Test applies within that vehicle's lineup, never across different vehicles. |

## How to use this matrix

Before running Recognition Test or Consistency Test on a new asset, identify which of the three scenarios above the comparison actually is. A result that looks like a failure may instead be a mismatch between the test applied and what that comparison was ever able to answer — check this matrix before concluding the asset itself is wrong.

This document does not change what passing any individual test means, and it is not a substitute for Art Direction's Quality Gate. It only says, for a given comparison, which of the existing tests are the right ones to run at all.
