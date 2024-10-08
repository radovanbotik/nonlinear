import Link from "next/link";
import { cn } from "../lib/helpers";

export default function Artists({
  artists,
  className,
}: {
  artists: { name: string; slug: string }[];
  className?: string;
}) {
  const uniqueArr: { name: string; slug: string }[] = [];
  artists.map(artist => {
    if (!uniqueArr.find(object => object.name === artist.name && object.slug === artist.slug)) uniqueArr.push(artist);
  });

  return (
    <ul className={cn("flex //text-teal-400 //font-medium //inline-flex //flex-wrap", className)}>
      {uniqueArr.map((a, i, arr) => (
        <li key={a.slug} className="group/artists shrink-0">
          <Link href={`/artists/${a.slug}`} className="group-hover/artists:underline underline-inherit">
            {a.name}
          </Link>
          {i < arr.length - 1 && <span>,&nbsp;</span>}
        </li>
      ))}
    </ul>
  );
}
