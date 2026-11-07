# New vehicle quality gate — 2026-11-07

## Scope

- Mitsubishi Pajero (1982–2026 revival)
- Subaru Forester
- Subaru Crosstrek / former Japanese-market SUBARU XV lineage
- Subaru Levorg

## Decision

All four vehicles remain **HOLD**. No public route, sitemap entry, TOP card, search entry, YEAR FINDER entry, or production asset was added.

The blocking condition is the same for every vehicle: CarVista requires every generation image plus the TOP image to have a manufacturer-primary exterior reference and an independently checked year/grade/drive/powertrain scope. Current research established the generation boundaries and current-model primary sources, but did not establish a commercially usable, same-condition image set for every historical generation. A visually plausible AI image is not evidence of factory exterior accuracy.

## Confirmed primary-source facts

### Pajero

- Mitsubishi announced the new Japanese-market Pajero on 2026-10-29, with domestic sales scheduled for 2026-12-17. It is not described as already on sale as of this audit.
- Four Japanese grades are announced: SUPER EXCEED, EXCEED, GSR, GLS.
- SUPER EXCEED uses a honeycomb grille; the other three use a horizontal-bar grille.
- The announced powertrain is a 2.4 L clean-diesel turbo with an 8-speed automatic. The vehicle uses Super Select 4WD-II / S-AWC and has three-row, seven-seat packaging.
- Mitsubishi's heritage material identifies four prior production generations from the 1982 first generation. Pajero Mini, Pajero iO and Pajero Sport are excluded from this lineage.
- The domestic model was discontinued in 2019; overseas production ended in 2021. These dates must not be merged into one domestic sales period.

Primary sources:

- https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2026/20261029_1.html
- https://www.mitsubishi-motors.com/en/newsroom/newsrelease/2026/20260902_1.html
- https://www.mitsubishi-motors.com/jp/newsroom/newsrelease/2023/20231107_1.html
- https://www.mitsubishi-motors.com/en/company/history/car/

### Subaru selection

The requested Forester, Crosstrek and Levorg set is retained. Forester has the strongest volume and six-generation comparison value. Crosstrek has a distinct user problem because the Japanese name changed from SUBARU XV after two generations. Levorg has a clear two-generation boundary and a current 620-unit/month official plan; Layback remains a separate model.

Primary sources:

- https://www.subaru.co.jp/news/2025_04_17_164724/
- https://www.subaru.co.jp/news/2022_12_01_135725/
- https://www.subaru.co.jp/press/news/2017_03_07_3758/
- https://www.subaru.co.jp/news/archives/14_04_06/14_04_15_98451.html
- https://www.subaru.co.jp/press/news/2020_10_15_9094/
- https://www.subaru.co.jp/news/2026_06_04_143345/

## Image gate

- Pajero TOP candidate revision 2 was created from the current official SUPER EXCEED reference and the existing Alphard TOP composition reference.
- Candidate status: **HOLD**. Composition is close, but the lower bumper, lamp details and wheel/fascia correspondence cannot be scored at Automotive Accuracy 95+ without a second same-grade primary reference.
- No Subaru TOP candidate was adopted. The available press headers do not provide a sufficient same-grade front-three-quarter reference set for current and historical generations.
- Existing Master Assets were not overwritten.

## Re-entry conditions

Re-open a vehicle only when all of the following exist:

1. Primary-source generation dates and model codes.
2. A primary exterior reference for every depicted generation and exact representative grade.
3. TOP candidate passing automotive accuracy, composition and 390 px checks.
4. Independent image review separate from implementation.
5. Complete initial HTML, search, YEAR FINDER, sitemap and SEO regression tests.
