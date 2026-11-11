"use client";

import { useState } from "react";

interface VerticalVideoProps {
  /** Video file (9:16). Leave undefined while the file is not available. */
  src?: string;
  /** Screenshot used as the video poster and as the fallback picture. */
  fallbackSrc: string;
  fallbackAlt: string;
  videoLabel: string;
  /** Text of the button that starts the video (only shown when there is one). */
  playLabel: string;
}

/**
 * Vertical (9:16) video slot.
 * Shows the poster alone when there is no video or when it fails to load;
 * the play button only exists when a video can really be played.
 */
export function VerticalVideo({
  src,
  fallbackSrc,
  fallbackAlt,
  videoLabel,
  playLabel,
}: VerticalVideoProps) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasVideo = Boolean(src) && !failed;

  if (hasVideo && playing) {
    return (
      <div className="lp-video">
        <video
          src={src}
          poster={fallbackSrc}
          controls
          autoPlay
          playsInline
          aria-label={videoLabel}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="lp-video">
      <img
        src={fallbackSrc}
        alt={fallbackAlt}
        width={540}
        height={975}
        loading="lazy"
      />
      {hasVideo && (
        <button type="button" onClick={() => setPlaying(true)}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
          {playLabel}
        </button>
      )}
    </div>
  );
}
