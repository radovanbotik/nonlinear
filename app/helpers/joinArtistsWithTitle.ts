export function joinArtistsWithTitle(artists: { name: string }[], joinWith: string = ", ", title: string) {
  if (artists.length > 4) return `Various Artists - ${title}`;
  return `${artists.map((a, i, arr) => a.name).join(joinWith)} - ${title}`;
}
