"use client";

import Flowers from "@/components/Flowers/Flowers";
import Bubbles from "@/components/Bubbles/Bubbles";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import YouTube, { YouTubePlayer } from "react-youtube";
import EditBox from "@/components/EditBox/EditBox";
import { FaPlay, FaPause } from "react-icons/fa";

const decodeBase64 = (encoded: string) => {
  try {
    return decodeURIComponent(escape(atob(encoded)));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return "...";
  }
};

function NameComponent({
  name,
  setName,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const searchParams = useSearchParams();
  const [shouldPlay, setShouldPlay] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [musicId, setMusicId] = useState<string | null>(null);

  useEffect(() => {
    const encodedName = searchParams.get("name");
    const music = searchParams.get("music");

    setShouldPlay(false);
    setIsPlaying(false);
    setIsPlayerReady(false);
    setPlayer(null);

    if (encodedName) {
      const decodedName = decodeBase64(encodedName);
      setName(decodedName);
      setShouldPlay(!!music);
      setMusicId(music);
    }
  }, [searchParams, setName]);

  const handlePlayerReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);

    setTimeout(() => {
      setIsPlayerReady(true);
      event.target.setVolume(volume);
    }, 1000);
  };

  const handlePlayPauseClick = () => {
    if (!player || !isPlayerReady) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (player && isPlayerReady) {
      player.setVolume(newVolume);
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full text-white z-50 font-josephsophia text-3xl sm:text-4xl md:text-5xl">
        <h1 className="h-full p-8">{name}</h1>
      </div>

      {!searchParams.get("name") && (
        <EditBox name={name} setName={setName} setMusicId={setMusicId} />
      )}

      {shouldPlay && musicId && searchParams.get("name") && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-4">
          <button
            onClick={handlePlayPauseClick}
            disabled={!isPlayerReady}
            className={`p-4 rounded-full shadow-lg transition duration-300 ease-in-out text-white ${isPlayerReady ? "bg-neon-green hover:bg-neon-green-hover" : "bg-gray-400"
              }`}
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>

          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="slider-neon"
              disabled={!isPlayerReady}
            />
            <span className="ml-2 text-white">{volume}%</span>
          </div>
        </div>
      )}

      {shouldPlay && musicId && searchParams.get("name") && (
        <YouTube
          videoId={musicId}
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 0,
              controls: 0,
            },
          }}
          onReady={handlePlayerReady}
        />
      )}
    </div>
  );
}

export default function Page() {
  const [name, setName] = useState("For you ❤️ My friend...");

  return (
    <div>
      <div className="night"></div>
      <Flowers />
      <Bubbles />
      <Suspense fallback={<div>Loading...</div>}>
        <NameComponent name={name} setName={setName} />
      </Suspense>
    </div>
  );
}
