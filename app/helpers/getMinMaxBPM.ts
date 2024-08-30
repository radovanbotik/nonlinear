export default function getMinMaxBPM(BPMArray: number[] | number) {
  if (Array.isArray(BPMArray)) {
    const minBPM = Math.min(...BPMArray);
    const maxBPM = Math.max(...BPMArray);
    if (minBPM === maxBPM) return `${minBPM} BPM`;
    return `${minBPM} - ${maxBPM} BPM`;
  } else return `${BPMArray} BPM`;
}
