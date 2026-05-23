'use client';

import { motion } from 'motion/react';
import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  FillGradient,
  Graphics,
  Sprite,
  Texture
} from 'pixi.js';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Texture,
  FillGradient
});

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d')!;
const radialGradientRatio = 0.75;
const minBubbleRadius = 25;
const maxBubbleRadius = 50;
const bubbleX = Math.floor(Math.random() * canvas.width);
const bubbleY = Math.floor(Math.random() * canvas.height);
const bubbleRadius = Math.max(Math.round(Math.random() * maxBubbleRadius), minBubbleRadius);
const x0 = bubbleX;
const y0 = bubbleY;
const x1 = x0;
const y1 = y0;
const r0 = bubbleRadius * radialGradientRatio;
const r1 = bubbleRadius;
const grad = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
const bubbleColor = getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim();
grad.addColorStop(0, backgroundColor);
grad.addColorStop(1, bubbleColor);
context.beginPath();
context.arc(bubbleX, bubbleY, bubbleRadius, 0, 2 * Math.PI);
context.fillStyle = grad;
context.fill();
const texture = Texture.from(canvas);

export default function Canvas() {
  return <motion.div className="-z-10" initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1 }}>
    <Application className='absolute top-0 left-0' resizeTo={window} backgroundColor={backgroundColor}>
      <pixiSprite texture={texture}></pixiSprite>
    </Application>
  </motion.div>;
}