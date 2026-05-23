'use client';

import { motion } from 'motion/react';
import {
  Application,
  extend,
  useApplication,
  useTick,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
  Texture,
  FillGradient
} from 'pixi.js';
import { useEffect, useMemo, useRef } from 'react';

extend({
  Container,
  Graphics,
  Sprite,
  Texture,
  FillGradient
});

interface BubbleData {
  dx: number;
  dy: number;
}

const NUM_BUBBLES = 100;
const BASE_BUBBLE_RADIUS = 50;
const SPEED_MULT = 2;

function BubbleContainer() {
  const { app, isInitialised } = useApplication();
  const containerRef = useRef<Container>(null);
  const bubblesRef = useRef<BubbleData[]>([]);

  const bubbleTexture = useMemo(() => {
    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background').trim();
    const foregroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-foreground').trim();
    const radialGradientRatio = 0.75;
    const size = BASE_BUBBLE_RADIUS * 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d')!;
    const grad = context.createRadialGradient(
      BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS * radialGradientRatio,
      BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS,
    );
    grad.addColorStop(0, backgroundColor);
    grad.addColorStop(1, foregroundColor);
    context.beginPath();
    context.arc(BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS, BASE_BUBBLE_RADIUS, 0, Math.PI * 2);
    context.fillStyle = grad;
    context.fill();
    return Texture.from(canvas);
  }, []);

  useEffect(() => {
    if (!isInitialised || !containerRef.current) return;
    const container = containerRef.current;

    for (let i = 0; i < NUM_BUBBLES; i++) {
      const bubble = new Sprite(bubbleTexture);
      bubble.anchor.set(0.5);
      bubble.x = Math.random() * app.screen.width;
      bubble.y = Math.random() * app.screen.height;
      bubble.scale = Math.max(Math.random(), 0.5);
      container.addChild(bubble);
      bubblesRef.current.push({
        dx: (Math.random() - 0.5) * SPEED_MULT,
        dy: (Math.random() - 0.5) * SPEED_MULT,
      });
    }

    return () => {
      container.removeChildren();
      bubblesRef.current = [];
    };
  }, [isInitialised, bubbleTexture]);

  useTick(() => {
    if (!containerRef.current) return;

    containerRef.current.children.forEach((child, i) => {
      const data = bubblesRef.current[i];
      const radius = BASE_BUBBLE_RADIUS * child.scale.x;

      child.x += data.dx;
      child.y += data.dy;

      if (child.x + radius > app.screen.width) child.x = app.screen.width - radius;
      else if (child.x - radius < 0) child.x = radius;

      if (child.y + radius > app.screen.height) child.y = app.screen.height - radius;
      else if (child.y - radius < 0) child.y = radius;

      if (child.x + radius >= app.screen.width || child.x - radius <= 0) data.dx = -data.dx;
      if (child.y + radius >= app.screen.height || child.y - radius <= 0) data.dy = -data.dy;
    });
  });

  return <pixiContainer ref={containerRef} />;
}

export default function Canvas() {
  return <motion.div className="-z-10" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1, ease: 'easeIn' }}>
    <Application className='absolute top-0 left-0' resizeTo={window}>
      <BubbleContainer />
    </Application>
  </motion.div>;
}