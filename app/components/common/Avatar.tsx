import Image from "next/image";
import Link from "next/link";

export default function Avatar({
  action,
  href,
  image,
  name,
}: {
  action: string;
  href: string;
  image: string;
  name: string;
}) {
  return (
    <Link href={href} className="group block flex-shrink-0">
      <div className="flex items-center">
        <div className="relative h-9 w-9 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={`Image of ${href}`}
            fill
            className="object-cover //h-9 //w-9 //rounded-full inset-0"
            placeholder="blur"
            blurDataURL={image}
            quality={100}
          />
          {/* <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-9 w-9 rounded-full"
          /> */}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{action}</p>
        </div>
      </div>
    </Link>
  );
}
