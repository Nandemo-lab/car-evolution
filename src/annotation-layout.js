export function assignAnnotationLanes(annotations = [], minimumGap = 30) {
  const lanes = new Map()
  for (const dir of ['top', 'bottom']) {
    const occupied = []
    annotations
      .map((annotation, index) => ({ annotation, index }))
      .filter(({ annotation }) => annotation.dir === dir)
      .sort((a, b) => a.annotation.labelX - b.annotation.labelX)
      .forEach(({ annotation, index }) => {
        let lane = 0
        while (occupied[lane]?.some((x) => Math.abs(x - annotation.labelX) < minimumGap)) lane += 1
        ;(occupied[lane] ||= []).push(annotation.labelX)
        lanes.set(index, lane)
      })
  }
  return lanes
}
