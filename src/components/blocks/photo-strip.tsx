import { SitePhoto } from "@/components/blocks/site-photo";
import type { SitePhoto as SitePhotoEntry } from "@/content/gallery-images";

/**
 * Horizontal photo band — reads as a car wash, not a brochure.
 * Static grid on small screens; scroll rail on wider viewports.
 */
export function PhotoStrip({
  photos,
  className,
}: {
  photos: SitePhotoEntry[];
  className?: string;
}) {
  return (
    <div
      className={`rail flex gap-3 overflow-x-auto pb-1 md:gap-4 ${className ?? ""}`}
      aria-label="Photos from the wash"
    >
      {photos.map((photo) => (
        <SitePhoto
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          label={photo.label}
          aspect="4/3"
          className="w-[min(72vw,16rem)] shrink-0 md:w-[min(28vw,14rem)]"
        />
      ))}
    </div>
  );
}
