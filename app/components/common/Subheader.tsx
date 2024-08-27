import { ReactNode } from "react";
import { Container } from "../Container";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Subheader({
  breadcrums,
  children,
  headline,
}: {
  breadcrums: { href: string; title: string };
  children: ReactNode;
  headline: string;
}) {
  return (
    <div className="">
      <div className="bg-black text-white">
        <Container size="md" className="py-5 space-y-5">
          <Link href={breadcrums.href} className="flex items-center gap-1 text-white/80">
            <ChevronLeftIcon className="w-3.5 h-3.5 inline-block translate-y-px " />{" "}
            <span className="text-lg">{breadcrums.title}</span>
          </Link>
          <div>
            <span className="text-[#d0ff4b] text-4xl">{headline}</span>
          </div>
        </Container>
      </div>
      <div className="bg-black/90 text-white py-2.5">
        <Container size="md">{children}</Container>
      </div>
    </div>
  );
}
