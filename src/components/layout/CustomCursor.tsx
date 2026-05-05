'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'image' | 'text' | 'button'>('default');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing dot
  const trailX = useSpring(mouseX, { damping: 35, stiffness: 100, mass: 1 });
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 100, mass: 1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"]');
      const isImage = target.closest('img, .shutter-image-container');
      const isLargeText = target.closest('h1, .experimental-title');
      
      setIsHovering(!!isClickable);
      
      if (isImage) {
        setCursorType('image');
      } else if (isLargeText) {
        setCursorType('text');
      } else if (isClickable) {
        setCursorType('button');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Core */}
      <motion.div
        className="fixed top-0 left-0 hidden h-3 w-3 pointer-events-none z-[10000] md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          backgroundColor: '#181816',
          borderRadius: '50%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />

      <motion.div
        className="fixed top-0 left-0 hidden pointer-events-none z-[9999] md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? (cursorType === 'image' ? 112 : cursorType === 'text' ? 92 : 64) : 32,
          height: isHovering ? (cursorType === 'image' ? 112 : cursorType === 'text' ? 40 : 64) : 32,
          borderRadius: cursorType === 'text' ? '999px' : '50%',
          borderWidth: 1,
          borderColor: cursorType === 'image' ? 'rgba(24,24,22,0.15)' : 'rgba(24,24,22,0.28)',
          backgroundColor:
            cursorType === 'image'
              ? 'rgba(204,255,0,0.20)'
              : cursorType === 'button'
                ? 'rgba(24,24,22,0.06)'
                : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />

      <motion.div
        className="fixed top-0 left-0 hidden pointer-events-none z-[10001] items-center justify-center md:flex"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: cursorType !== 'default' ? 1 : 0, scale: cursorType !== 'default' ? 1 : 0.5 }}
      >
        <span className={`font-mono-tech ${cursorType === 'image' ? 'text-brand-dark' : 'text-neutral-500'}`}>
          {cursorType === 'image' ? 'EXPLORE' : cursorType === 'text' ? 'READ' : 'OPEN'}
        </span>
      </motion.div>
    </>
  );
};

export default CustomCursor;
