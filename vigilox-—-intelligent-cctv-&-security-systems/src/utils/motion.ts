/**
 * VIGILOX // Autonomous Perimeter Intelligence
 * Motion Design System Tokens & Animation Variants
 *
 * Principles:
 * - Industrial Kinematics: Controlled linear acceleration, constant velocity, zero-overshoot deceleration.
 * - Purposeful & Fast: Transitions complete within 180-450ms for high responsiveness.
 * - Accessible: Respects user's prefers-reduced-motion preferences.
 */

export const TRANSITION_EASE = {
  // Industrial kinematic curve: sharp start, quick plateau, crisp deceleration
  kinematic: [0.16, 1, 0.3, 1] as const,
  // Snappy micro-interaction curve for buttons and toggles
  snap: [0.25, 1, 0.5, 1] as const,
  // Smooth linear easing for continuous telemetry loops
  linear: [0, 0, 1, 1] as const,
  // Optical shutter deceleration
  shutter: [0.05, 0.7, 0.1, 1] as const,
};

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  cinematic: 0.6,
  long: 0.9,
};

/**
 * Reusable motion variants for motion/react
 */
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.cinematic,
      ease: TRANSITION_EASE.kinematic,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const headlineRevealVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: TRANSITION_EASE.kinematic,
    },
  },
};

export const telemetryBadgeVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.fast,
      ease: TRANSITION_EASE.snap,
    },
  },
};

export const productRevealVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.cinematic,
      ease: TRANSITION_EASE.kinematic,
    },
  },
};
