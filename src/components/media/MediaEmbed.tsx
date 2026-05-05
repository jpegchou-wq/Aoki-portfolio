'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type MediaItem =
  | { type: 'image' | 'gif'; src: string; alt?: string; sizeMB?: number }
  | {
      type: 'gallery';
      title?: string;
      layout?: 'masonry' | 'row';
      columns?: 2 | 3 | 4;
      compact?: boolean;
      images: { src: string; alt?: string; widthRatio?: number }[];
    }
  | {
      type: 'videoCarousel';
      title?: string;
      videos: { src: string; poster?: string; title?: string }[];
    }
  | { type: 'video'; provider: 'mp4' | 'youtube' | 'vimeo'; src: string; poster?: string; title?: string };

export default function MediaEmbed({ item }: { item: MediaItem }) {
  const maxSizeMB = 1.5;
  if ('sizeMB' in item && typeof item.sizeMB === 'number' && item.sizeMB > maxSizeMB) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        Media file is too large ({item.sizeMB}MB). Please keep it at or below {maxSizeMB}MB.
      </div>
    );
  }

  if (item.type === 'image' || item.type === 'gif') {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-black/5">
        <img
          src={item.src}
          alt={item.alt ?? ''}
          className="w-full h-auto object-contain object-top"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
        />
      </div>
    );
  }

  if (item.type === 'gallery') {
    const useRowLayout = item.layout === 'row';
    const layout = item.layout ?? 'masonry';

    const masonryColumnsClass =
      item.columns === 4
        ? 'sm:columns-2 lg:columns-3 xl:columns-4'
        : item.columns === 3
          ? 'sm:columns-2 lg:columns-3'
          : 'sm:columns-2';

    const rowColumnsClass =
      item.columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : item.columns === 3
          ? 'sm:grid-cols-2 lg:grid-cols-3'
          : 'sm:grid-cols-2';

    return (
      <section className="content-panel">
        <h3 className="mb-5 text-lg font-semibold text-black/80">{item.title ?? '海报系列'}</h3>
        <div
          className={
            useRowLayout
              ? `grid grid-cols-1 ${rowColumnsClass} gap-4`
              : `columns-1 ${masonryColumnsClass} gap-3 sm:gap-4 [column-fill:_balance]`
          }
        >
          {item.images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`${useRowLayout ? '' : 'mb-3 break-inside-avoid sm:mb-4'} overflow-hidden rounded-[1.25rem] border border-black/[0.04] bg-black/5`}
              style={{ contentVisibility: 'auto', containIntrinsicSize: '320px' }}
            >
              <img
                src={image.src}
                alt={image.alt ?? ''}
                style={
                  typeof image.widthRatio === 'number' && image.widthRatio > 0 && image.widthRatio < 1
                    ? { width: `${image.widthRatio * 100}%` }
                    : undefined
                }
                className={`${useRowLayout && item.compact ? 'block w-full max-h-44 object-contain' : 'block w-full h-auto object-contain'}${
                  typeof image.widthRatio === 'number' && image.widthRatio > 0 && image.widthRatio < 1 ? ' mx-auto' : ''
                }`}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (item.type === 'videoCarousel') {
    return <VideoCarouselEmbed item={item} />;
  }

  if (item.type === 'video' && item.provider === 'mp4') {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
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

  if (item.type === 'video') {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
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

  return null;
}

function VideoCarouselEmbed({
  item,
}: {
  item: Extract<MediaItem, { type: 'videoCarousel' }>;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = item.videos.length;

  if (total === 0) {
    return null;
  }

  const activeVideo = item.videos[activeIndex];
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section className="content-panel">
      <div className="mb-4 flex items-center justify-between">
        {item.title ? <h3 className="text-lg font-semibold text-black/80">{item.title}</h3> : <div />}
        <div className="text-xs text-black/50">
          {activeIndex + 1}/{total}
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
        <video controls playsInline preload="metadata" poster={activeVideo.poster} className="w-full h-auto">
          <source src={activeVideo.src} />
        </video>
      </div>
      {total > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-neutral-100 p-2 text-neutral-600 transition-colors hover:bg-neutral-200"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
