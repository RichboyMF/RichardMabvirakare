import React, { useRef, useEffect } from "react";
import type { DebugConfig } from "../types";

interface InteractiveBackgroundProps {
  config: DebugConfig;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number; // for fading
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  config,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isIdleRef = useRef(false);
  const idleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const IDLE_TIMEOUT = 2000; // 2 seconds
    const resetIdleTimer = () => {
      isIdleRef.current = false;
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = window.setTimeout(() => {
        isIdleRef.current = true;
      }, IDLE_TIMEOUT);
    };
    resetIdleTimer();

    const resizeCanvas = () => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    const mouse = {
      x: -1000,
      y: -1000,
      radius: config.mouseRadius,
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      resetIdleTimer();
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      const scrollForce = Math.min(Math.max(deltaY * 0.5, -20), 20); // Capped force

      if (particlesArray) {
        for (const particle of particlesArray) {
          particle.applyForce(0, scrollForce);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      mass: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 1.5 + Math.random() * 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.mass = Math.random() * 20 + 10;
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(100, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      applyForce(fx: number, fy: number) {
        this.vx += fx / this.mass;
        this.vy += fy / this.mass;
      }

      update() {
        // Mouse repel force
        const dxMouse = this.x - mouse.x;
        const dyMouse = this.y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.radius && distanceMouse > 0) {
          const force = (mouse.radius - distanceMouse) / mouse.radius;
          const repelForceX = (dxMouse / distanceMouse) * force * 2.5;
          const repelForceY = (dyMouse / distanceMouse) * force * 2.5;
          this.applyForce(repelForceX, repelForceY);
        }

        // Spring force to return to base
        const springConstant = 0.005;
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;
        const springForceX = dxBase * springConstant * this.mass;
        const springForceY = dyBase * springConstant * this.mass;
        this.applyForce(springForceX, springForceY);

        // Damping / friction
        const damping = 0.92;
        this.vx *= damping;
        this.vy *= damping;

        // Update position
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    let particlesArray: Particle[] = [];
    let pulses: Pulse[] = [];

    const init = () => {
      particlesArray = [];
      pulses = [];
      if (canvas.width <= 0 || canvas.height <= 0) return;
      const numberOfParticles =
        (canvas.width * canvas.height) / config.particleDensity;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    };

    let resizeTimeout: number;
    const debouncedInit = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
        init();
      }, 100);
    };

    window.addEventListener("resize", debouncedInit);

    // Defer initial setup to prevent race condition where canvas has 0 dimensions
    const initTimeout = setTimeout(debouncedInit, 50);

    const connect = () => {
      if (!ctx) return;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const pa = particlesArray[a];
          const pb = particlesArray[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            let baseOpacity = 1 - distance / config.connectionDistance;
            let opacityValue = baseOpacity;
            let strokeStyle = `rgba(100, 255, 255, ${opacityValue})`;
            let lineWidth = 0.5;

            // Check for pulse influence
            for (const pulse of pulses) {
              const distToA = Math.sqrt(
                (pa.x - pulse.x) ** 2 + (pa.y - pulse.y) ** 2
              );
              const waveThickness = 40;

              if (Math.abs(distToA - pulse.radius) < waveThickness) {
                const pulseProximity =
                  1 - Math.abs(distToA - pulse.radius) / waveThickness;
                const pulseInfluence =
                  Math.max(0, pulseProximity) *
                  pulse.intensity *
                  config.pulseIntensity;

                opacityValue = Math.min(1, baseOpacity + pulseInfluence);
                strokeStyle = `rgba(150, 255, 255, ${opacityValue})`;
                lineWidth = 0.5 + pulseInfluence * 1.5;
                break;
              }
            }

            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // if (isIdleRef.current && config.idleZapFrequency > 0 && canvas.width > 0) {
      if (config.idleZapFrequency > 0 && canvas.width > 0) {
        const pulseProbability = config.idleZapFrequency / 4000;
        if (Math.random() < pulseProbability) {
          pulses.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: Math.min(canvas.width, canvas.height) / 2.5,
            speed:
              (Math.min(canvas.width, canvas.height) / 500) *
              (0.8 + Math.random() * 0.4),
            intensity: 1,
          });
        }
      }

      pulses = pulses.filter((pulse) => {
        pulse.radius += pulse.speed;
        pulse.intensity = 1 - pulse.radius / pulse.maxRadius;
        return pulse.radius < pulse.maxRadius && pulse.intensity > 0;
      });

      if (particlesArray.length > 0) {
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        connect();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(resizeTimeout);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      window.removeEventListener("resize", debouncedInit);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-screen" />
  );
};

export default InteractiveBackground;
