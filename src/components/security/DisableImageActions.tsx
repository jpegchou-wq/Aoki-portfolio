'use client';

import React from 'react';

export default function DisableImageActions() {
  React.useEffect(() => {
    const isImageTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return target.tagName === 'IMG' || Boolean(target.closest('img'));
    };

    const onContextMenu = (event: MouseEvent) => {
      if (!isImageTarget(event.target)) return;
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (!isImageTarget(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  return null;
}

