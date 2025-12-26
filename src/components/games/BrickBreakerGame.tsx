"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * BrickBreakerGame
 * - Brick Breaker game for 404 page with cosmic theme
 * - Neon orange glowing bricks forming "404"
 * - Dark cosmic background with moving stars and planets
 */

// -----------------------------
// Types
// -----------------------------

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

type Planet = {
  x: number;
  y: number;
  radius: number;
  color: string;
  ringColor?: string;
  hasRing: boolean;
  speed: number;
  glowColor: string;
};

type Brick = {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
  health: number;
  maxHealth: number;
};

type Ball = {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  speed: number;
};

type Paddle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

type PowerUpType = "widen" | "multiball" | "slow" | "fast" | "laser";

type PowerUp = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: PowerUpType;
  vy: number;
};

type GameState = "idle" | "playing" | "won" | "lost";

interface BrickBreakerGameProps {
  width?: number;
  height?: number;
  isMobile?: boolean;
}

// -----------------------------
// Constants
// -----------------------------

const PADDLE_HEIGHT = 12;
const PADDLE_WIDTH = 100;
const BALL_RADIUS = 8;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 4;
const BRICK_OFFSET_TOP = 60;
const BRICK_OFFSET_LEFT = 30;

// CODING NINJAS pattern - 1 means brick present, 0 means no brick
// Each letter is 4 wide x 5 tall with 1 space between letters
// C    O    D    I    N    G    _    N    I    N    J    A    S
const PATTERN_CODING_NINJAS = [
  // Row 0 - Top
  [
    1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0,
    1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  ],
  // Row 1
  [
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0,
  ],
  // Row 2 - Middle
  [
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0,
    1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  ],
  // Row 3
  [
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 1,
  ],
  // Row 4 - Bottom
  [
    1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0,
    1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 1, 1, 1,
  ],
];

// CN pattern for mobile - larger letters with more bricks
// C is 6 wide x 8 tall, N is 6 wide x 8 tall, with 2 space between
const PATTERN_CN_MOBILE = [
  // Row 0 - Top
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  // Row 1
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  // Row 2
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // Row 3
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // Row 4
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1],
  // Row 5
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
  // Row 6
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  // Row 7 - Bottom
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
];

// -----------------------------
// Utility functions
// -----------------------------

// -----------------------------
// Component
// -----------------------------

export default function BrickBreakerGame({
  width = 1200,
  height = 550,
  isMobile = false,
}: BrickBreakerGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [lifeLostOverlay, setLifeLostOverlay] = useState(false);
  const [lifeLostCountdown, setLifeLostCountdown] = useState(3);
  const [livesRemaining, setLivesRemaining] = useState(3);

  // Select pattern based on mobile prop
  const PATTERN = isMobile ? PATTERN_CN_MOBILE : PATTERN_CODING_NINJAS;
  const MOBILE_BRICK_OFFSET_TOP = 80;
  const MOBILE_BRICK_HEIGHT = 28;

  // Game refs to persist across renders
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const bricksRef = useRef<Brick[]>([]);
  const ballRef = useRef<Ball | null>(null);
  const paddleRef = useRef<Paddle | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const extraBallsRef = useRef<Ball[]>([]);
  const paddleWidthRef = useRef<number>(PADDLE_WIDTH);
  const powerUpTimersRef = useRef<
    { type: PowerUpType; timeout: NodeJS.Timeout }[]
  >([]);
  const originalBallSpeedRef = useRef<{ dx: number; dy: number } | null>(null);
  const animationRef = useRef<number>(0);
  const mouseXRef = useRef<number>(width / 2);
  const gameStateRef = useRef<GameState>("idle");
  const scoreRef = useRef<number>(0);
  const livesRef = useRef<number>(3);
  const lifeLostRef = useRef<boolean>(false);
  const lifeLostCountdownRef = useRef<number>(0);
  const lifeLostStartTimeRef = useRef<number>(0);
  const lifeLostLivesRemainingRef = useRef<number>(0);

  // Sync refs with state
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  // Initialize stars - more realistic deep space feel
  const initStars = useCallback(() => {
    const stars: Star[] = [];
    // Distant small stars (majority)
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 0.8 + 0.2, // Smaller, more realistic
        speed: Math.random() * 0.02 + 0.005, // Much slower drift
        brightness: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.003 + 0.001, // Subtle twinkle
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    // A few brighter stars
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.8,
        speed: Math.random() * 0.01 + 0.002,
        brightness: Math.random() * 0.3 + 0.7,
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, [width, height]);

  // Initialize planets - more realistic, muted colors
  const initPlanets = useCallback(() => {
    const planets: Planet[] = [
      {
        x: width * 0.08,
        y: height * 0.25,
        radius: 40,
        color: "#1a1520", // Dark purple-grey gas giant
        glowColor: "rgba(60, 50, 80, 0.15)",
        hasRing: true,
        ringColor: "rgba(100, 90, 110, 0.25)",
        speed: 0.008, // Very slow
      },
      {
        x: width * 0.92,
        y: height * 0.75,
        radius: 55,
        color: "#0d1a1f", // Dark teal ice giant
        glowColor: "rgba(30, 60, 70, 0.12)",
        hasRing: false,
        speed: 0.005,
      },
      {
        x: width * 0.75,
        y: height * 0.15,
        radius: 18,
        color: "#1f1510", // Small rusty moon
        glowColor: "rgba(50, 35, 25, 0.1)",
        hasRing: false,
        speed: 0.012,
      },
      {
        x: width * 0.25,
        y: height * 0.8,
        radius: 12,
        color: "#151820", // Tiny distant planet
        glowColor: "rgba(40, 45, 60, 0.08)",
        hasRing: false,
        speed: 0.015,
      },
    ];
    planetsRef.current = planets;
  }, [width, height]);

  // Initialize bricks in CODING NINJAS or CN pattern (mobile)
  const initBricks = useCallback(() => {
    const bricks: Brick[] = [];
    const offsetLeft = isMobile ? 40 : BRICK_OFFSET_LEFT;
    const offsetTop = isMobile ? MOBILE_BRICK_OFFSET_TOP : BRICK_OFFSET_TOP;
    const brickHeight = isMobile ? MOBILE_BRICK_HEIGHT : BRICK_HEIGHT;
    const brickPadding = isMobile ? 6 : BRICK_PADDING;
    const brickWidth =
      (width - offsetLeft * 2 - brickPadding * (PATTERN[0].length - 1)) /
      PATTERN[0].length;

    for (let row = 0; row < PATTERN.length; row++) {
      for (let col = 0; col < PATTERN[row].length; col++) {
        if (PATTERN[row][col] === 1) {
          bricks.push({
            x: offsetLeft + col * (brickWidth + brickPadding),
            y: offsetTop + row * (brickHeight + brickPadding),
            width: brickWidth,
            height: brickHeight,
            active: true,
            health: 1,
            maxHealth: 1,
          });
        }
      }
    }
    bricksRef.current = bricks;
  }, [width, isMobile, PATTERN, MOBILE_BRICK_OFFSET_TOP, MOBILE_BRICK_HEIGHT]);

  // Initialize paddle
  const initPaddle = useCallback(() => {
    paddleRef.current = {
      x: width / 2 - PADDLE_WIDTH / 2,
      y: height - 40,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    };
  }, [width, height]);

  // Initialize ball - slower for mobile
  const initBall = useCallback(() => {
    const ballSpeed = isMobile ? 3 : 4.5;
    ballRef.current = {
      x: width / 2,
      y: height - 60,
      radius: BALL_RADIUS,
      dx: ballSpeed * (Math.random() > 0.5 ? 1 : -1),
      dy: -ballSpeed,
      speed: isMobile ? 3.5 : 5,
    };
  }, [width, height, isMobile]);

  // Create particles on brick hit
  const createParticles = (x: number, y: number, count: number = 10) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
        maxLife: 1,
        color: `hsl(${25 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`,
        size: Math.random() * 4 + 2,
      });
    }
  };

  // Update particles
  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      p.vx *= 0.98;
      p.vy *= 0.98;
      return p.life > 0;
    });
  };

  // Spawn power-up with 12% chance
  const maybeSpawnPowerUp = (x: number, y: number) => {
    if (Math.random() > 0.12) return; // 12% chance to spawn

    const types: PowerUpType[] = [
      "widen",
      "multiball",
      "slow",
      "fast",
      "laser",
    ];
    const weights = [0.25, 0.25, 0.2, 0.2, 0.1]; // Probability weights
    let random = Math.random();
    let selectedType: PowerUpType = "widen";

    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedType = types[i];
        break;
      }
    }

    powerUpsRef.current.push({
      x: x - 15,
      y,
      width: 30,
      height: 15,
      type: selectedType,
      vy: 2,
    });
  };

  // Apply power-up effect
  const applyPowerUp = (powerUp: PowerUp) => {
    const paddle = paddleRef.current;
    const ball = ballRef.current;
    if (!paddle || !ball) return;

    // Clear existing timer for same power-up type
    const existingTimerIndex = powerUpTimersRef.current.findIndex(
      (t) => t.type === powerUp.type,
    );
    if (existingTimerIndex !== -1) {
      clearTimeout(powerUpTimersRef.current[existingTimerIndex].timeout);
      powerUpTimersRef.current.splice(existingTimerIndex, 1);
    }

    switch (powerUp.type) {
      case "widen": {
        paddleWidthRef.current = Math.min(paddleWidthRef.current + 30, 200);
        paddle.width = paddleWidthRef.current;
        // Revert after 5 seconds
        const widenTimeout = setTimeout(() => {
          if (paddleRef.current) {
            paddleWidthRef.current = PADDLE_WIDTH;
            paddleRef.current.width = PADDLE_WIDTH;
          }
          powerUpTimersRef.current = powerUpTimersRef.current.filter(
            (t) => t.type !== "widen",
          );
        }, 3000);
        powerUpTimersRef.current.push({ type: "widen", timeout: widenTimeout });
        break;
      }
      case "multiball": {
        // Add two extra balls (no timer needed - balls last until they fall)
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        extraBallsRef.current.push(
          {
            x: ball.x,
            y: ball.y,
            radius: BALL_RADIUS,
            dx: speed * Math.cos(Math.PI / 4),
            dy: -speed * Math.sin(Math.PI / 4),
            speed: ball.speed,
          },
          {
            x: ball.x,
            y: ball.y,
            radius: BALL_RADIUS,
            dx: -speed * Math.cos(Math.PI / 4),
            dy: -speed * Math.sin(Math.PI / 4),
            speed: ball.speed,
          },
        );
        break;
      }
      case "slow": {
        // Store original speed only if not already slowed
        if (!originalBallSpeedRef.current) {
          originalBallSpeedRef.current = { dx: ball.dx, dy: ball.dy };
          // Slow down the ball
          ball.dx *= 0.7;
          ball.dy *= 0.7;
          extraBallsRef.current.forEach((b) => {
            b.dx *= 0.7;
            b.dy *= 0.7;
          });
        }
        // Revert after 5 seconds (reset timer if already slowed)
        const slowTimeout = setTimeout(() => {
          if (ballRef.current && originalBallSpeedRef.current) {
            // Restore to original speed
            const currentSpeed = Math.sqrt(
              ballRef.current.dx * ballRef.current.dx +
                ballRef.current.dy * ballRef.current.dy,
            );
            const originalSpeed = Math.sqrt(
              originalBallSpeedRef.current.dx *
                originalBallSpeedRef.current.dx +
                originalBallSpeedRef.current.dy *
                  originalBallSpeedRef.current.dy,
            );
            const ratio = originalSpeed / currentSpeed;
            ballRef.current.dx *= ratio;
            ballRef.current.dy *= ratio;
            extraBallsRef.current.forEach((b) => {
              b.dx *= ratio;
              b.dy *= ratio;
            });
            originalBallSpeedRef.current = null;
          }
          powerUpTimersRef.current = powerUpTimersRef.current.filter(
            (t) => t.type !== "slow",
          );
        }, 3000);
        powerUpTimersRef.current.push({ type: "slow", timeout: slowTimeout });
        break;
      }
      case "fast": {
        // Speed up the ball temporarily
        if (!originalBallSpeedRef.current) {
          originalBallSpeedRef.current = { dx: ball.dx, dy: ball.dy };
        }
        ball.dx *= 1.4;
        ball.dy *= 1.4;
        extraBallsRef.current.forEach((b) => {
          b.dx *= 1.4;
          b.dy *= 1.4;
        });
        // Revert after 5 seconds
        const fastTimeout = setTimeout(() => {
          if (ballRef.current && originalBallSpeedRef.current) {
            const currentSpeed = Math.sqrt(
              ballRef.current.dx * ballRef.current.dx +
                ballRef.current.dy * ballRef.current.dy,
            );
            const originalSpeed = Math.sqrt(
              originalBallSpeedRef.current.dx *
                originalBallSpeedRef.current.dx +
                originalBallSpeedRef.current.dy *
                  originalBallSpeedRef.current.dy,
            );
            const ratio = originalSpeed / currentSpeed;
            ballRef.current.dx *= ratio;
            ballRef.current.dy *= ratio;
            extraBallsRef.current.forEach((b) => {
              b.dx *= ratio;
              b.dy *= ratio;
            });
            originalBallSpeedRef.current = null;
          }
          powerUpTimersRef.current = powerUpTimersRef.current.filter(
            (t) => t.type !== "fast",
          );
        }, 3000);
        powerUpTimersRef.current.push({ type: "fast", timeout: fastTimeout });
        break;
      }
      case "laser": {
        // Temporarily widen paddle significantly
        paddleWidthRef.current = Math.min(paddleWidthRef.current + 50, 250);
        paddle.width = paddleWidthRef.current;
        // Revert after 5 seconds
        const laserTimeout = setTimeout(() => {
          if (paddleRef.current) {
            paddleWidthRef.current = PADDLE_WIDTH;
            paddleRef.current.width = PADDLE_WIDTH;
          }
          powerUpTimersRef.current = powerUpTimersRef.current.filter(
            (t) => t.type !== "laser",
          );
        }, 3000);
        powerUpTimersRef.current.push({ type: "laser", timeout: laserTimeout });
        break;
      }
    }

    // Create celebration particles
    createParticles(powerUp.x + powerUp.width / 2, powerUp.y, 8);
  };

  // Update power-ups
  const updatePowerUps = () => {
    const paddle = paddleRef.current;
    if (!paddle) return;

    powerUpsRef.current = powerUpsRef.current.filter((p) => {
      p.y += p.vy;

      // Check collision with paddle
      if (
        p.y + p.height >= paddle.y &&
        p.y <= paddle.y + paddle.height &&
        p.x + p.width >= paddle.x &&
        p.x <= paddle.x + paddle.width
      ) {
        applyPowerUp(p);
        return false;
      }

      // Remove if off screen
      return p.y < height;
    });
  };

  // Update extra balls
  const updateExtraBalls = () => {
    const paddle = paddleRef.current;
    if (!paddle) return;

    extraBallsRef.current = extraBallsRef.current.filter((ball) => {
      // Update position
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collisions
      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= width) {
        ball.dx = -ball.dx;
        ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
      }
      if (ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
        ball.y = ball.radius;
      }

      // Paddle collision
      if (
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
      ) {
        const hitPos = (ball.x - paddle.x) / paddle.width;
        const angle = (hitPos - 0.5) * Math.PI * 0.7;
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        ball.dx = speed * Math.sin(angle);
        ball.dy = -Math.abs(speed * Math.cos(angle));
        ball.y = paddle.y - ball.radius;
      }

      // Brick collisions for extra balls
      bricksRef.current.forEach((brick) => {
        if (!brick.active) return;
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          brick.active = false;
          createParticles(
            brick.x + brick.width / 2,
            brick.y + brick.height / 2,
            15,
          );
          maybeSpawnPowerUp(
            brick.x + brick.width / 2,
            brick.y + brick.height / 2,
          );
          setScore((prev) => prev + 10);
          ball.dy = -ball.dy;
        }
      });

      // Remove if falls off bottom
      return ball.y - ball.radius < height;
    });
  };

  // Draw power-ups
  const drawPowerUps = (ctx: CanvasRenderingContext2D, time: number) => {
    powerUpsRef.current.forEach((powerUp) => {
      const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 0.005);

      // Colors based on power-up type
      const colors: Record<
        PowerUpType,
        { bg: string; glow: string; icon: string }
      > = {
        widen: { bg: "#00ff88", glow: "rgba(0, 255, 136, 0.6)", icon: "↔" },
        multiball: {
          bg: "#ff00ff",
          glow: "rgba(255, 0, 255, 0.6)",
          icon: "●●",
        },
        slow: { bg: "#00ffff", glow: "rgba(0, 255, 255, 0.6)", icon: "▼" },
        fast: { bg: "#ff3366", glow: "rgba(255, 51, 102, 0.6)", icon: "▲" },
        laser: { bg: "#ffff00", glow: "rgba(255, 255, 0, 0.6)", icon: "⚡" },
      };

      const color = colors[powerUp.type];

      // Glow effect
      ctx.shadowColor = color.glow;
      ctx.shadowBlur = 15 * pulseIntensity;

      // Draw capsule shape
      ctx.beginPath();
      ctx.roundRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, 7);
      ctx.fillStyle = color.bg;
      ctx.fill();

      // Inner gradient
      const gradient = ctx.createLinearGradient(
        powerUp.x,
        powerUp.y,
        powerUp.x,
        powerUp.y + powerUp.height,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Icon/text
      ctx.shadowBlur = 0;
      ctx.font = "bold 10px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        color.icon,
        powerUp.x + powerUp.width / 2,
        powerUp.y + powerUp.height / 2,
      );
    });
    ctx.shadowBlur = 0;
  };

  // Draw extra balls
  const drawExtraBalls = (ctx: CanvasRenderingContext2D, time: number) => {
    const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 0.005);

    extraBallsRef.current.forEach((ball) => {
      // Glow effect
      const glowGradient = ctx.createRadialGradient(
        ball.x,
        ball.y,
        0,
        ball.x,
        ball.y,
        ball.radius * 3,
      );
      glowGradient.addColorStop(
        0,
        `rgba(255, 180, 100, ${0.8 * pulseIntensity})`,
      );
      glowGradient.addColorStop(
        0.5,
        `rgba(255, 140, 0, ${0.3 * pulseIntensity})`,
      );
      glowGradient.addColorStop(1, "rgba(255, 100, 0, 0)");

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Ball body
      const bodyGradient = ctx.createRadialGradient(
        ball.x - ball.radius * 0.3,
        ball.y - ball.radius * 0.3,
        0,
        ball.x,
        ball.y,
        ball.radius,
      );
      bodyGradient.addColorStop(0, "#ffffff");
      bodyGradient.addColorStop(0.3, "#ffe5cc");
      bodyGradient.addColorStop(0.7, "#ff9933");
      bodyGradient.addColorStop(1, "#cc6600");

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGradient;
      ctx.fill();
    });
  };

  // Draw stars - realistic deep space rendering
  const drawStars = (ctx: CanvasRenderingContext2D, time: number) => {
    starsRef.current.forEach((star) => {
      // Very subtle drift (simulates distant parallax)
      star.x += star.speed * 0.3;
      star.y += star.speed * 0.1;

      // Wrap around edges
      if (star.x > width) star.x = 0;
      if (star.y > height) star.y = 0;

      // Subtle twinkle - more atmospheric scintillation effect
      const twinkle =
        0.85 + 0.15 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
      const alpha = star.brightness * twinkle;

      // Slight color variation for realism (blue-white to warm white)
      const colorTemp =
        Math.random() > 0.7 ? 240 : Math.random() > 0.5 ? 220 : 255;
      const r = star.size > 1 ? colorTemp : 255;
      const g = star.size > 1 ? colorTemp : 255;
      const b = 255;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();

      // Subtle glow only for the brightest stars
      if (star.size > 1.2 && star.brightness > 0.6) {
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2.5,
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    });
  };

  // Draw planets - realistic with subtle lighting
  const drawPlanets = (ctx: CanvasRenderingContext2D, time: number) => {
    planetsRef.current.forEach((planet) => {
      // Very subtle movement
      const offsetX = Math.sin(time * planet.speed * 0.0005) * 3;
      const offsetY = Math.cos(time * planet.speed * 0.0003) * 2;
      const px = planet.x + offsetX;
      const py = planet.y + offsetY;

      // Subtle atmospheric glow
      const glowGradient = ctx.createRadialGradient(
        px,
        py,
        planet.radius * 0.8,
        px,
        py,
        planet.radius * 1.4,
      );
      glowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      glowGradient.addColorStop(0.7, planet.glowColor);
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(px, py, planet.radius * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Draw planet body with realistic shading (light from top-left)
      const bodyGradient = ctx.createRadialGradient(
        px - planet.radius * 0.4,
        py - planet.radius * 0.4,
        0,
        px + planet.radius * 0.2,
        py + planet.radius * 0.2,
        planet.radius * 1.2,
      );
      bodyGradient.addColorStop(0, lightenColor(planet.color, 15));
      bodyGradient.addColorStop(0.4, planet.color);
      bodyGradient.addColorStop(0.8, darkenColor(planet.color, 20));
      bodyGradient.addColorStop(1, darkenColor(planet.color, 40));
      ctx.beginPath();
      ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGradient;
      ctx.fill();

      // Terminator line (day/night boundary) for realism
      const terminatorGradient = ctx.createLinearGradient(
        px - planet.radius,
        py,
        px + planet.radius,
        py,
      );
      terminatorGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      terminatorGradient.addColorStop(0.6, "rgba(0, 0, 0, 0)");
      terminatorGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.beginPath();
      ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = terminatorGradient;
      ctx.fill();

      // Draw ring if applicable - more realistic
      if (planet.hasRing && planet.ringColor) {
        ctx.save();
        // Ring shadow on planet
        ctx.beginPath();
        ctx.ellipse(
          px,
          py + planet.radius * 0.1,
          planet.radius * 0.9,
          planet.radius * 0.15,
          0,
          0,
          Math.PI,
        );
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fill();

        // Back part of ring (behind planet)
        ctx.beginPath();
        ctx.ellipse(
          px,
          py,
          planet.radius * 2,
          planet.radius * 0.35,
          -0.2,
          Math.PI,
          Math.PI * 2,
        );
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = planet.radius * 0.15;
        ctx.stroke();

        // Front part of ring (in front of planet)
        ctx.beginPath();
        ctx.ellipse(
          px,
          py,
          planet.radius * 2,
          planet.radius * 0.35,
          -0.2,
          0,
          Math.PI,
        );
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = planet.radius * 0.15;
        ctx.stroke();
        ctx.restore();
      }
    });
  };

  // Draw bricks with neon glow
  const drawBricks = (ctx: CanvasRenderingContext2D, time: number) => {
    bricksRef.current.forEach((brick) => {
      if (!brick.active) return;

      const pulseIntensity = 0.7 + 0.3 * Math.sin(time * 0.003);

      // Outer glow
      ctx.shadowColor = `rgba(255, 140, 0, ${pulseIntensity})`;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Brick gradient
      const gradient = ctx.createLinearGradient(
        brick.x,
        brick.y,
        brick.x,
        brick.y + brick.height,
      );
      gradient.addColorStop(0, `rgba(255, 160, 50, ${0.9 * pulseIntensity})`);
      gradient.addColorStop(
        0.5,
        `rgba(255, 120, 20, ${0.95 * pulseIntensity})`,
      );
      gradient.addColorStop(1, `rgba(200, 80, 0, ${0.9 * pulseIntensity})`);

      // Draw brick
      ctx.beginPath();
      ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Neon border
      ctx.strokeStyle = `rgba(255, 200, 100, ${pulseIntensity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner highlight
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.roundRect(brick.x + 2, brick.y + 2, brick.width - 4, 4, 2);
      ctx.fillStyle = `rgba(255, 255, 200, ${0.3 * pulseIntensity})`;
      ctx.fill();

      ctx.shadowBlur = 0;
    });
  };

  // Draw paddle
  const drawPaddle = (ctx: CanvasRenderingContext2D, _time: number) => {
    const paddle = paddleRef.current;
    if (!paddle) return;

    // Solid glow effect (no pulsing)
    ctx.shadowColor = "rgba(255, 140, 0, 0.7)";
    ctx.shadowBlur = 15;

    // Paddle gradient
    const gradient = ctx.createLinearGradient(
      paddle.x,
      paddle.y,
      paddle.x,
      paddle.y + paddle.height,
    );
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.3, "#16213e");
    gradient.addColorStop(0.7, "#0f0f23");
    gradient.addColorStop(1, "#0a0a15");

    // Draw paddle body
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Orange accent lines (solid, no pulsing)
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(255, 140, 0, 0.9)";

    // Top accent
    ctx.beginPath();
    ctx.roundRect(paddle.x + 5, paddle.y, paddle.width - 10, 3, 2);
    ctx.fillStyle = "rgba(255, 140, 0, 1)";
    ctx.fill();

    // Side accents
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y + 2, 3, paddle.height - 4, 2);
    ctx.fillStyle = "rgba(255, 140, 0, 0.8)";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(
      paddle.x + paddle.width - 3,
      paddle.y + 2,
      3,
      paddle.height - 4,
      2,
    );
    ctx.fillStyle = "rgba(255, 140, 0, 0.8)";
    ctx.fill();

    ctx.shadowBlur = 0;
  };

  // Draw ball
  const drawBall = (ctx: CanvasRenderingContext2D, time: number) => {
    const ball = ballRef.current;
    if (!ball) return;

    const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 0.005);

    // Glow effect
    const glowGradient = ctx.createRadialGradient(
      ball.x,
      ball.y,
      0,
      ball.x,
      ball.y,
      ball.radius * 3,
    );
    glowGradient.addColorStop(
      0,
      `rgba(255, 180, 100, ${0.8 * pulseIntensity})`,
    );
    glowGradient.addColorStop(
      0.5,
      `rgba(255, 140, 0, ${0.3 * pulseIntensity})`,
    );
    glowGradient.addColorStop(1, "rgba(255, 100, 0, 0)");

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Ball body
    const bodyGradient = ctx.createRadialGradient(
      ball.x - ball.radius * 0.3,
      ball.y - ball.radius * 0.3,
      0,
      ball.x,
      ball.y,
      ball.radius,
    );
    bodyGradient.addColorStop(0, "#ffffff");
    bodyGradient.addColorStop(0.3, "#ffe5cc");
    bodyGradient.addColorStop(0.7, "#ff9933");
    bodyGradient.addColorStop(1, "#cc6600");

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = bodyGradient;
    ctx.fill();

    // Trail effect
    ctx.beginPath();
    ctx.moveTo(ball.x - ball.dx * 3, ball.y - ball.dy * 3);
    ctx.lineTo(ball.x, ball.y);
    ctx.strokeStyle = `rgba(255, 140, 0, ${0.5 * pulseIntensity})`;
    ctx.lineWidth = ball.radius * 1.5;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color
        .replace(")", `, ${p.life})`)
        .replace("hsl", "hsla");
      ctx.fill();
    });
  };

  // Draw UI
  const drawUI = (ctx: CanvasRenderingContext2D) => {
    // Score
    ctx.font = "bold 20px 'Orbitron', 'Segoe UI', sans-serif";
    ctx.fillStyle = "#ff9933";
    ctx.shadowColor = "rgba(255, 140, 0, 0.8)";
    ctx.shadowBlur = 10;
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${scoreRef.current}`, 20, 30);

    // Lives
    ctx.textAlign = "right";
    ctx.fillText(`Lives: ${livesRef.current}`, width - 20, 30);

    ctx.shadowBlur = 0;

    // Game state messages are now handled by React overlay
  };

  // Draw life lost overlay - now just draws the red line at bottom (rest handled by React)
  const drawLifeLostOverlay = (ctx: CanvasRenderingContext2D, time: number) => {
    if (!lifeLostRef.current) return;

    // Red line at bottom with glow
    ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = `rgba(255, 50, 50, ${0.8 + 0.2 * Math.sin(time * 0.01)})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  // Color utilities
  function lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  }

  function darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `rgb(${R}, ${G}, ${B})`;
  }

  // Update game logic
  const updateGame = () => {
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    if (!ball || !paddle || gameStateRef.current !== "playing") return;

    // Update paddle position based on mouse
    paddle.x = Math.max(
      0,
      Math.min(width - paddle.width, mouseXRef.current - paddle.width / 2),
    );

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collisions
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= width) {
      ball.dx = -ball.dx;
      ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
    }
    if (ball.y - ball.radius <= 0) {
      ball.dy = -ball.dy;
      ball.y = ball.radius;
    }

    // Bottom - lose life (only if no extra balls remaining)
    if (ball.y + ball.radius >= height) {
      // Check if there are extra balls still in play
      if (extraBallsRef.current.length > 0) {
        // Promote the first extra ball to be the main ball
        const promotedBall = extraBallsRef.current.shift()!;
        ballRef.current = promotedBall;
      } else {
        // No extra balls - lose a life
        const newLives = livesRef.current - 1;
        lifeLostLivesRemainingRef.current = newLives;

        if (newLives <= 0) {
          setLives(0);
          setGameState("lost");
        } else {
          // Show life lost overlay
          lifeLostRef.current = true;
          lifeLostStartTimeRef.current = performance.now();
          lifeLostCountdownRef.current = 3;
          setLives(newLives);
          setLifeLostOverlay(true);
          setLivesRemaining(newLives);
          setLifeLostCountdown(3);

          // Start countdown
          const countdownInterval = setInterval(() => {
            lifeLostCountdownRef.current -= 1;
            setLifeLostCountdown(lifeLostCountdownRef.current);
            if (lifeLostCountdownRef.current <= 0) {
              clearInterval(countdownInterval);
              lifeLostRef.current = false;
              setLifeLostOverlay(false);
              initBall();
            }
          }, 1000);
        }
      }
    }

    // Paddle collision
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width
    ) {
      // Calculate angle based on where ball hits paddle
      const hitPos = (ball.x - paddle.x) / paddle.width;
      const angle = (hitPos - 0.5) * Math.PI * 0.7; // -70 to 70 degrees
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

      ball.dx = speed * Math.sin(angle);
      ball.dy = -Math.abs(speed * Math.cos(angle));
      ball.y = paddle.y - ball.radius;

      createParticles(ball.x, ball.y, 5);
    }

    // Brick collisions
    bricksRef.current.forEach((brick) => {
      if (!brick.active) return;

      if (
        ball.x + ball.radius > brick.x &&
        ball.x - ball.radius < brick.x + brick.width &&
        ball.y + ball.radius > brick.y &&
        ball.y - ball.radius < brick.y + brick.height
      ) {
        brick.active = false;
        createParticles(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
          15,
        );
        maybeSpawnPowerUp(
          brick.x + brick.width / 2,
          brick.y + brick.height / 2,
        );
        setScore((prev) => prev + 10);

        // Determine collision side
        const overlapLeft = ball.x + ball.radius - brick.x;
        const overlapRight = brick.x + brick.width - (ball.x - ball.radius);
        const overlapTop = ball.y + ball.radius - brick.y;
        const overlapBottom = brick.y + brick.height - (ball.y - ball.radius);

        const minOverlapX = Math.min(overlapLeft, overlapRight);
        const minOverlapY = Math.min(overlapTop, overlapBottom);

        if (minOverlapX < minOverlapY) {
          ball.dx = -ball.dx;
        } else {
          ball.dy = -ball.dy;
        }
      }
    });

    // Check win condition
    const activeBricks = bricksRef.current.filter((b) => b.active);
    if (activeBricks.length === 0) {
      setGameState("won");
    }

    // Update particles
    updateParticles();

    // Update power-ups
    updatePowerUps();

    // Update extra balls
    updateExtraBalls();
  };

  // Main game loop
  const gameLoop = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      // Clear canvas with dark cosmic background
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height),
      );
      bgGradient.addColorStop(0, "#0d0d1a");
      bgGradient.addColorStop(0.5, "#080812");
      bgGradient.addColorStop(1, "#030308");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw background elements
      drawStars(ctx, time);
      drawPlanets(ctx, time);

      // Update game if playing and not in life lost state
      if (gameStateRef.current === "playing" && !lifeLostRef.current) {
        updateGame();
      }

      // Draw game elements
      drawBricks(ctx, time);
      drawPaddle(ctx, time);

      if (
        (gameStateRef.current === "playing" ||
          gameStateRef.current === "idle") &&
        !lifeLostRef.current
      ) {
        drawBall(ctx, time);
        drawExtraBalls(ctx, time);
      }

      drawPowerUps(ctx, time);
      drawParticles(ctx);
      drawUI(ctx);

      // Draw life lost overlay if active
      if (lifeLostRef.current) {
        drawLifeLostOverlay(ctx, time);
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height],
  );

  // Initialize game
  const initGame = useCallback(() => {
    // Clear all power-up timers
    powerUpTimersRef.current.forEach((t) => clearTimeout(t.timeout));
    powerUpTimersRef.current = [];
    originalBallSpeedRef.current = null;
    lifeLostRef.current = false;
    lifeLostCountdownRef.current = 0;

    initStars();
    initPlanets();
    initBricks();
    initPaddle();
    initBall();
    particlesRef.current = [];
    powerUpsRef.current = [];
    extraBallsRef.current = [];
    paddleWidthRef.current = PADDLE_WIDTH;
    setScore(0);
    setLives(3);
  }, [initStars, initPlanets, initBricks, initPaddle, initBall]);

  // Start game loop
  useEffect(() => {
    initGame();
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initGame, gameLoop]);

  // Mouse/Touch handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Account for canvas scaling (maxWidth: 100%)
      const scaleX = canvas.width / rect.width;
      mouseXRef.current = (e.clientX - rect.left) * scaleX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      // Account for canvas scaling (maxWidth: 100%)
      const scaleX = canvas.width / rect.width;
      mouseXRef.current = (e.touches[0].clientX - rect.left) * scaleX;
    };

    const handleClick = () => {
      if (gameStateRef.current === "idle") {
        setGameState("playing");
      } else if (
        gameStateRef.current === "won" ||
        gameStateRef.current === "lost"
      ) {
        initGame();
        setGameState("playing");
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleClick);
    };
  }, [initGame]);

  // Determine if we should show an overlay
  const showOverlay =
    gameState === "idle" ||
    gameState === "won" ||
    gameState === "lost" ||
    lifeLostOverlay;

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-xl border border-orange-500/30 shadow-[0_0_30px_rgba(255,140,0,0.2)] cursor-none"
        style={{
          touchAction: "none",
          maxWidth: "100%",
          height: "auto",
        }}
      />

      {/* Glass blur overlay for game states */}
      {showOverlay && (
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={() => {
            if (gameState === "idle") {
              setGameState("playing");
            } else if (gameState === "won" || gameState === "lost") {
              initGame();
              setGameState("playing");
            }
          }}
        >
          <div className="text-center px-6 py-8 rounded-2xl bg-black/30 border border-orange-500/20 shadow-[0_0_40px_rgba(255,140,0,0.15)]">
            {/* Idle State */}
            {gameState === "idle" && !lifeLostOverlay && (
              <>
                <h2
                  className="text-2xl md:text-3xl font-bold text-orange-400 mb-2 drop-shadow-[0_0_15px_rgba(255,140,0,0.8)]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Click to Start
                </h2>
                <p
                  className="text-sm md:text-base text-gray-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Break the blocks!
                </p>
              </>
            )}

            {/* Won State */}
            {gameState === "won" && !lifeLostOverlay && (
              <>
                <h2
                  className="text-2xl md:text-3xl font-bold text-green-400 mb-2 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  You Win! 🎉
                </h2>
                <p
                  className="text-sm md:text-base text-gray-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Click to Play Again
                </p>
              </>
            )}

            {/* Lost State */}
            {gameState === "lost" && !lifeLostOverlay && (
              <>
                <h2
                  className="text-2xl md:text-3xl font-bold text-red-400 mb-2 drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Game Over
                </h2>
                <p
                  className="text-sm md:text-base text-gray-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Click to Try Again
                </p>
              </>
            )}

            {/* Life Lost State */}
            {lifeLostOverlay && (
              <>
                {/* Broken Heart */}
                <div className="text-5xl md:text-6xl mb-4 animate-pulse">
                  💔
                </div>
                <h2
                  className="text-xl md:text-2xl font-bold text-pink-400 mb-2 drop-shadow-[0_0_15px_rgba(255,51,102,0.8)]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Oops! You lost a life
                </h2>
                <p
                  className="text-sm md:text-base text-white mb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {livesRemaining} {livesRemaining === 1 ? "life" : "lives"}{" "}
                  remaining
                </p>
                <div
                  className="text-4xl md:text-5xl font-bold text-orange-400 drop-shadow-[0_0_20px_rgba(255,140,0,0.8)]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {lifeLostCountdown}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");
      `}</style>
    </div>
  );
}
