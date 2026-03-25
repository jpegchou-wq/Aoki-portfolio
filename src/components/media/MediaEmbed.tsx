import React from 'react';
import Image from 'next/image';

export type MediaItem =
  | {
      type: 'image';
      src: string;
      alt?: string;
    }
  | {
      type: 'video';
      provider: 'mp4' | 'youtube' | 'bilibili' | 'vimeo' | 'iframe';
      src: string;
      title?: string;
      poster?: string;
    };

export default function MediaEmbed({ item }: { item: MediaItem }) {
  if (item.type === 'image') {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-black/5 border border-black/[0.04]">
        <Image src={item.src} alt={item.alt ?? ''} fill className="object-cover" />
      </div>
    );
  }

  if (item.provider === 'mp4') {
    return (
      <div className="overflow-hidden rounded-[1.5rem] bg-black border border-white/10">
        <video
          controls
          playsInline
          preload="metadata"
          poster={item.poster}
          className="w-full h-auto"
        >
          <source src={item.src} />
        </video>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-black border border-white/10">
      <div className="relative w-full aspect-video">
        <iframe
          src={item.src}
          title={item.title ?? 'Embedded video'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

