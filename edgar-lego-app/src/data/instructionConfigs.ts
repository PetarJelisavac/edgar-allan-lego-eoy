// Configuration for each instruction step's brick layout and animations

export interface BrickConfig {
  id: string;
  type: '4x1' | '4x2' | 'single';
  left: string;
  top: string;
  finalTop: string; // Where brick lands after animation
  width: string;
  height: string;
  animationDelay: string;
  zIndex: number;
}

export interface PlaceholderConfig {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay?: string;
}

export interface InstructionConfig {
  stepNumber: number;
  bricks: BrickConfig[];
  placeholders: PlaceholderConfig[];
}

export const instructionConfigs: Record<number, InstructionConfig> = {
  // Step 2 (index 2) - Two single bricks stacked
  2: {
    stepNumber: 0,
    bricks: [
      {
        id: 'brick-1',
        type: 'single',
        left: '690px',
        top: '441px',
        finalTop: '441px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.5s',
        zIndex: 3,
      },
      {
        id: 'brick-2',
        type: 'single',
        left: '596px',
        top: '392px',
        finalTop: '392px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.8s',
        zIndex: 2,
      },
    ],
    placeholders: [
      {
        left: '689.5px',
        top: '553px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '596px',
        top: '503px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 3 (index 3) - Four 4x1 bricks (two pairs)
  3: {
    stepNumber: 1,
    bricks: [
      {
        id: 'brick-1',
        type: '4x1',
        left: '690px',
        top: '553px',
        finalTop: '553px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.5s',
        zIndex: 4,
      },
      {
        id: 'brick-2',
        type: '4x1',
        left: '596px',
        top: '504px',
        finalTop: '504px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.8s',
        zIndex: 3,
      },
      {
        id: 'brick-3',
        type: '4x2',
        left: '500px',
        top: '313px',
        finalTop: '313px',
        width: '120.001px',
        height: '122.764px',
        animationDelay: '1.1s',
        zIndex: 2,
      },
      {
        id: 'brick-4',
        type: '4x2',
        left: '560px',
        top: '383px',
        finalTop: '383px',
        width: '120.001px',
        height: '122.764px',
        animationDelay: '1.4s',
        zIndex: 2,
      },
    ],
    placeholders: [
      {
        left: '689.5px',
        top: '553px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '596px',
        top: '503px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
    ],
  },
};
