export default function getMinMaxBPM(BPMArray: number[]) {
  const minBPM = Math.min(...BPMArray);
  const maxBPM = Math.max(...BPMArray);
  if (minBPM === maxBPM) return `${minBPM} BPM`;
  return `${minBPM} - ${maxBPM} BPM`;
}
