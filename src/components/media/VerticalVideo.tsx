"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface VerticalVideoProps {
  /** Video file (9:16). Leave undefined while the file is not available. */
  src?: string;
  /** Screenshot used as the video poster and as the fallback picture. */
  fallbackSrc: string;
  fallbackAlt: string;
  videoLabel: string;
  className?: string;
}

/**
 * Vertical (9:16) video player inside a phone frame.
 * Shows the fallback picture when there is no video or when it fails to load.
 */
export function VerticalVideo({
  src,
  fallbackSrc,
  fallbackAlt,
  videoLabel,
  className,
}: VerticalVideoProps) {
  const [failed, setFailed] = useState(false);
  const showVideo = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative mx-auto w-[260px] sm:w-[280px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl",
        className
      )}
    >
      <div className="aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-gray-900">
        {showVideo ? (
          <video
            src={src}
            poster={fallbackSrc}
            controls
            playsInline
            preload="none"
            aria-label={videoLabel}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={fallbackSrc}
            alt={fallbackAlt}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
