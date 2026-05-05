'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'image'>('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isImage = !!(target.tagName === 'IMG' || target.closest('a')?.querySelector('img'));
      const isPointer = window.getComputedStyle(target).cursor === 'pointer';
      const isText = !!(target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN');

      if (isImage) setCursorType('image');
      else if (isPointer) setCursorType('pointer');
      else if (isText) setCursorType('text');
      else setCursorType('default');

      setIsHovering(isPointer || isImage || isText);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: cursorType === 'image' ? '#ccff00' : '#ffffff',
          borderRadius: cursorType === 'text' ? '2px' : '50%',
          width: cursorType === 'text' ? '2px' : '32px',
          height: cursorType === 'text' ? '32px' : '32px',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        {cursorType === 'image' && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[4px] font-bold text-black uppercase tracking-tighter"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
