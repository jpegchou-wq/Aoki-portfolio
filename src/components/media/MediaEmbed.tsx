import React from 'react';

export type MediaItem =
  | {
      type: 'image';
      src: string;
      alt?: string;
      sizeMB?: number;
    }
  | {
      type: 'gif';
      src: string;
      alt?: string;
      sizeMB?: number;
    }
  | {
      type: 'video';
      provider: 'mp4' | 'youtube' | 'bilibili' | 'vimeo' | 'iframe';
      src: string;
      title?: string;
      poster?: string;
      sizeMB?: number;
    }
  | {
      type: 'gallery';
      title?: string;
      sizeMB?: number;
      layout?: 'masonry' | 'row';
      columns?: 2 | 3 | 4;
      compact?: boolean;
      images: Array<{
        src: string;
        alt?: string;
        widthRatio?: number;
      }>;
    }
  | {
      type: 'videoCarousel';
      title?: string;
      sizeMB?: number;
      videos: Array<{
        src: string;
        title?: string;
        poster?: string;
      }>;
    };

export default function MediaEmbed({ item }: { item: MediaItem }) {
  const maxSizeMB = 1.5;
  if (typeof item.sizeMB === 'number' && item.sizeMB > maxSizeMB) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        Media file is too large ({item.sizeMB}MB). Please keep it at or below {maxSizeMB}MB.
      </div>
    );
  }

  if (item.type === 'image' || item.type === 'gif') {
    return (
      <div className="overflow-hidden rounded-[1.5rem] bg-black/5 border border-black/[0.04]">
        <img src={item.src} alt={item.alt ?? ''} className="w-full h-auto object-contain object-top" loading="lazy" />
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
      <section className="glass-card rounded-[2rem] p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-black/80 mb-5">{item.title ?? '海报系列'}</h3>
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
              className={`${useRowLayout ? '' : 'break-inside-avoid mb-3 sm:mb-4'} overflow-hidden rounded-[1.25rem] bg-black/5 border border-black/[0.04]`}
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
    <section className="glass-card rounded-[2rem] p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        {item.title ? <h3 className="text-lg font-semibold text-black/80">{item.title}</h3> : <div />}
        <div className="text-xs text-black/50">
          {activeIndex + 1}/{total}
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] bg-black border border-white/10">
        <video controls playsInline preload="metadata" poster={activeVideo.poster} className="w-full h-auto">
          <source src={activeVideo.src} />
        </video>
      </div>
      {total > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={goPrev}
            className="px-3 py-1.5 rounded-full bg-black/5 text-black/70 hover:bg-black/10 transition-colors"
          >
            上一个
          </button>
          <button
            type="button"
            onClick={goNext}
            className="px-3 py-1.5 rounded-full bg-black/5 text-black/70 hover:bg-black/10 transition-colors"
          >
            下一个
          </button>
        </div>
      )}
    </section>
  );
}
