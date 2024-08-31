import MediaObject from "./MediaObject";

export default function Chart({
  tracks,
  heading,
}: {
  tracks: {
    artists: { name: string; slug: string }[];
    _id: string;
    image: string;
    label: { name: string; href: string };
    slug: string;
    title: string;
  }[];
  heading: string;
}) {
  return (
    <div aria-label="Sidebar" className="flex flex-1 flex-col px-4 py-6 divide-y">
      <div className="flex items-end w-full pb-4">
        <div className="flex-1 flex">
          <div>icon</div>
          <div>icon</div>
        </div>
        <div className="flex-1 text-teal-400 justify-self-center w-full ">
          <div className="-translate-x-1/2 w-fit font-semibold tracking-wide  ">{heading}</div>
        </div>
      </div>
      <ul role="list" className="//-mx-2 //divide-y-6 divide-gray-800 space-y-4 pt-6">
        {tracks.map(track => (
          <li key={track._id}>
            <MediaObject artists={track.artists} image={track.image} slug={track.slug} title={track.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
