"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "../lib/helpers";

export default function ResultsPerPage({ options }: { options: { value: number; label: number }[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const per_page = searchParams.get("per_page");

  function isCurrent(value: number) {
    return Number(per_page) === value;
  }

  function handleSearch(value: string | number) {
    const params = new URLSearchParams(searchParams);
    if (!value || value === per_page) {
      return;
    }
    params.set("per_page", value.toString());
    replace(`${pathname}?${params}`);
  }

  return (
    <div className="flex gap-1.5">
      {options.map(option => (
        <button
          key={option.label}
          className={cn(
            "px-2 py-1 flex place-content-center text-gray-300 bg-gray-700/60 rounded-full text-sm",
            isCurrent(option.value) && "bg-gray-600"
          )}
          onClick={() => handleSearch(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
