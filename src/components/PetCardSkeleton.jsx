import { Skeleton } from "@/components/ui/skeleton";

const PetCardSkeleton = () => {
  return (
    <div className="shadow-md max-w-sm mx-auto overflow-hidden">
      {/* Image */}
      <div className="h-80 w-full aspect-square overflow-hidden">
        <Skeleton className="h-full w-full bg-neutral-200" />
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <Skeleton className="h-6 w-1/2 rounded bg-neutral-200" />

        {/* Age + Gender row */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16 rounded bg-neutral-200" />
          <Skeleton className="h-4 w-20 rounded bg-neutral-200" />
        </div>

        {/* Breed */}
        <Skeleton className="h-4 w-24 rounded bg-neutral-200" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full bg-neutral-200" /> {/* map icon */}
          <Skeleton className="h-4 w-28 rounded bg-neutral-200" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-28 rounded-full mt-2 bg-neutral-200" />
      </div>
    </div>
  );
};

export default PetCardSkeleton;