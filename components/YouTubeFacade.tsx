"use client";
import { useState } from "react";

interface YouTubeFacadeProps {
  videoId: string;
  title?: string;
  aspectRatio?: "16/9" | "4/3";
}

export default function YouTubeFacade({ videoId, title = "Watch video", aspectRatio = "16/9" }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false);
  const paddingTop = aspectRatio === "16/9" ? "56.25%" : "75%";
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-black cursor-pointer group"
      style={{ paddingTop }}
      onClick={() => setLoaded(true)}
    >
      {loaded ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumbUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110"
              style={{ background: "#EE6C13" }}
            >
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
