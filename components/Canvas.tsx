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
  FillGradient,
  Circle
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
  speed: number;
  baseSpeed: number;
  alpha: number;
}

const BASE_BUBBLE_RADIUS = 60;
const MAX_SPEED = 10;
const SPEED_DECAY_RATE = 0.99;
const BASE_ALPHA = 0.1;
const MAX_ALPHA = 0.9;
const ALPHA_DECAY_RATE = 0.99;

const backgroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-background').trim();
const foregroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-foreground').trim();

function BubbleContainer() {
  const { app, isInitialised } = useApplication();
  const containerRef = useRef<Container>(null);
  const bubblesRef = useRef<BubbleData[]>([]);

  const numBubbles = [
    { breakpoint: 1440, count: 60 },
    { breakpoint: 1024, count: 40 },
    { breakpoint: 768, count: 20 },
    { breakpoint: 0, count: 10 },
  ].find(({ breakpoint }) => window.innerWidth >= breakpoint)?.count ?? 10;

  const bubbleTexture = useMemo(() => {
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

    for (let i = 0; i < numBubbles; i++) {
      const bubble = new Sprite(bubbleTexture);
      bubble.anchor.set(0.5);
      bubble.x = Math.random() * app.screen.width;
      bubble.y = Math.random() * app.screen.height;
      bubble.scale = Math.max(Math.random(), 0.5);
      bubble.hitArea = new Circle(0, 0, BASE_BUBBLE_RADIUS * 3);
      bubble.eventMode = 'dynamic';
      bubble.alpha = BASE_ALPHA;
      container.addChild(bubble);

      const baseSpeed = (1 / bubble.scale.x);
      const angle = Math.random() * Math.PI * 2;

      bubblesRef.current.push({
        baseSpeed: baseSpeed,
        speed: baseSpeed,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        alpha: BASE_ALPHA,
      });

      bubble.on('pointerenter', () => {
        const data = bubblesRef.current[i];
        data.speed = MAX_SPEED;
        data.alpha = MAX_ALPHA;
      });
    }

    return () => {
      container.removeChildren();
      bubblesRef.current = [];
    };
  }, [isInitialised, bubbleTexture]);

  useTick((ticker) => {
    if (!containerRef.current) return;

    containerRef.current.children.forEach((child, i) => {
      const data = bubblesRef.current[i];
      const radius = BASE_BUBBLE_RADIUS * child.scale.x;

      data.speed = Math.max(data.baseSpeed, data.speed * Math.pow(SPEED_DECAY_RATE, ticker.deltaTime));

      child.x += (data.speed * data.dx);
      child.y += (data.speed * data.dy);

      data.alpha = Math.max(BASE_ALPHA, data.alpha * Math.pow(ALPHA_DECAY_RATE, ticker.deltaTime))
      child.alpha = data.alpha;

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
  return <motion.div className="-z-10 fixed inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: 'easeIn' }}>
    <Application className='absolute top-0 left-0' width={window.innerWidth} height={window.innerHeight} backgroundColor={backgroundColor}>
      <BubbleContainer />
    </Application>
  </motion.div>;
}