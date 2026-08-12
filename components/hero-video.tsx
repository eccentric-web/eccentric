"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  src: string;
};

export function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = async () => {
      if (!video.paused) {
        return;
      }

      try {
        await video.play();
      } catch {
        // Autoplay can be blocked until the page receives a gesture.
      }
    };

    const handleCanPlay = () => {
      void playVideo();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void playVideo();
      }
    };

    const unlockOnGesture = () => {
      void playVideo();
    };

    void playVideo();

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("touchstart", unlockOnGesture, { once: true });
    document.addEventListener("click", unlockOnGesture, { once: true });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("touchstart", unlockOnGesture);
      document.removeEventListener("click", unlockOnGesture);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero__video"
      muted
      playsInline
      loop
      autoPlay
      preload="auto"
      disableRemotePlayback
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
