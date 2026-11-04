export interface SimOptions {
  /** "r,g,b" */
  color?: string;
  bright?: number;
  /** Transition mode: one directed wave across the canvas, driven by the caller. */
  sweep?: boolean;
}

export interface Sim {
  /** 0..1 multiplier the host raises on hover. */
  bright: number;
  /** Sweep mode only: how far the wave has travelled. */
  progress: number;
  resize(dpr: number): void;
  tick(now: number): void;
}
