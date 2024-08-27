"use client";
import { cn } from "@/app/lib/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

type Navlink = ComponentPropsWithoutRef<typeof Link> & { activeStyling: string };

export default function NavLink({ href, children, className, activeStyling, ...props }: Navlink) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // const lastPathnameRoute = pathname.split("/").pop();
    // const lastHrefRoute = href.toString().split("/").pop();
    const lastPathnameRoute = pathname.split("/")[1];
    const lastHrefRoute = href.toString().split("/")[1];
    console.log(lastHrefRoute);
    console.log(lastPathnameRoute);

    if (lastHrefRoute === lastPathnameRoute) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, href]);

  //"text-[#d0ff4b]" : "text-white"

  return (
    <Link className={cn(className, isActive ? activeStyling : "")} href={href} {...props}>
      {children}
    </Link>
  );
}
