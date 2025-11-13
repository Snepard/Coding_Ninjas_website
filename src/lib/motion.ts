"use client";

import { Variants } from "framer-motion";

const appleEasing = [0.22, 1, 0.36, 1] as const;

export const motionDefaults: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: appleEasing },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: appleEasing },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: appleEasing },
  },
};

export const staggeredList = (delay = 0.12): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

export const staggerChildren = (delay = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
    },
  },
});

export const childFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: appleEasing },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: appleEasing },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: appleEasing },
  },
};
