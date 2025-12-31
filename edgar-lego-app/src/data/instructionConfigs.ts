// Configuration for each instruction step's brick layout and animations

export interface BrickConfig {
  id: string;
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single' | '3x1-white' | '3x1-flat';
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

export interface StaticBrickConfig {
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single' | '3x1-white' | '3x1-flat';
  left: string;
  top: string;
  width: string;
  height: string;
  zIndex: number;
}

export interface InstructionConfig {
  stepNumber: number;
  staticBricks: StaticBrickConfig[]; // Bricks from previous steps that are already built
  bricks: BrickConfig[]; // New bricks that animate in
  placeholders: PlaceholderConfig[];
}

export const instructionConfigs: Record<number, InstructionConfig> = {
  // Step 1 (index 2) - Two 4x1 bricks (foundation)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=192-17434
  2: {
    stepNumber: 1,
    staticBricks: [], // First step, no previous bricks
    bricks: [
      // Left 4x1 brick - drops from above
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '478px', // Lands on top of placeholder
        width: '120px',
        height: '78.454px',
        animationDelay: '0s',
        zIndex: 2,
      },
      // Right 4x1 brick - drops from above
      {
        id: 'brick-2',
        type: '4x1',
        left: '434px',
        top: '-100px',
        finalTop: '528px', // Lands on top of placeholder
        width: '120px',
        height: '78.454px',
        animationDelay: '0.3s',
        zIndex: 1,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '478px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '434px',
        top: '528px',
        width: '120px',
        height: '78.454px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 2 (index 3) - Two 4x2 bricks on top of 4x1 foundation
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=192-17434
  3: {
    stepNumber: 2,
    staticBricks: [
      // Bricks from step 1 - the 4x1 foundation bricks
      {
        type: '4x1',
        left: '340px',
        top: '478px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '434px',
        top: '528px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
    ],
    bricks: [
      // Left 4x2 brick - drops from above, on top of left 4x1
      {
        id: 'brick-1',
        type: '4x2',
        left: '340px',
        top: '-100px',
        finalTop: '436px', // Lands on top of 4x1
        width: '120px',
        height: '113px',
        animationDelay: '0s',
        zIndex: 2,
      },
      // Right 4x2 brick - drops from above, on top of right 4x1 (front brick)
      {
        id: 'brick-2',
        type: '4x2',
        left: '434px',
        top: '-100px',
        finalTop: '486px', // Lands on top of 4x1
        width: '120px',
        height: '113px',
        animationDelay: '0.3s',
        zIndex: 3,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '436px',
        width: '120px',
        height: '113px',
      },
      {
        left: '434px',
        top: '486px',
        width: '120px',
        height: '113px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 3 (index 4) - Two 4x1 bricks on top of 4x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17824
  4: {
    stepNumber: 3,
    staticBricks: [
      // Bricks from step 1 (4x1 foundation)
      {
        type: '4x1',
        left: '340px',
        top: '478px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '434px',
        top: '528px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
      // Bricks from step 2 (4x2 bricks on top)
      {
        type: '4x2',
        left: '340px',
        top: '436px', // From Step 2 finalTop
        width: '120px',
        height: '113px',
        zIndex: 2,
      },
      {
        type: '4x2',
        left: '434px',
        top: '486px', // From Step 2 finalTop
        width: '120px',
        height: '113px',
        zIndex: 3,
      },
    ],
    bricks: [
      // New 4x1 brick on left - drops from above, on top of left 4x2
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '421px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 4,
      },
      // New 4x1 brick on right - drops from above, on top of right 4x2
      {
        id: 'brick-2',
        type: '4x1',
        left: '434px',
        top: '-100px',
        finalTop: '471px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
        zIndex: 5,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '421px',
        width: '120px',
        height: '80.5px',
      },
      {
        left: '434px',
        top: '471px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 4 (index 5) - One 8x2 brick and one 2x2 brick
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17523
  5: {
    stepNumber: 4,
    staticBricks: [
      // All bricks from steps 1-3
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
    ],
    bricks: [
      // New 8x2 brick on left - drops from above (behind 2x2)
      {
        id: 'brick-1',
        type: '8x2',
        left: '340px',
        top: '-100px',
        finalTop: '376px',
        width: '180px',
        height: '142px',
        animationDelay: '0s',
        zIndex: 5,
      },
      // New 2x2 brick on right - drops from above (in front)
      {
        id: 'brick-2',
        type: '2x2',
        left: '464px',
        top: '-100px',
        finalTop: '445px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
        zIndex: 6,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '376px',
        width: '180px',
        height: '142px',
      },
      {
        left: '464px',
        top: '445px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 5 (index 6) - Three bricks: 4x1, 2x1, 4x1
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17674
  6: {
    stepNumber: 5,
    staticBricks: [
      // All bricks from steps 1-4
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
    ],
    bricks: [
      // New 4x1 brick on left - drops from above, on top of 8x2 (back)
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '363px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 7,
      },
      // New 2x1 brick in middle - drops from above (middle)
      {
        id: 'brick-2',
        type: '2x1',
        left: '402px',
        top: '-100px',
        finalTop: '397px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 8,
      },
      // New 4x1 brick on right - drops from above (front)
      {
        id: 'brick-3',
        type: '4x1',
        left: '435px',
        top: '-100px',
        finalTop: '413px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.6s',
        zIndex: 9,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '363px',
        width: '120px',
        height: '80.5px',
      },
      {
        left: '402px',
        top: '397px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
      },
      {
        left: '435px',
        top: '413px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.6s',
      },
    ],
  },
  // Step 6 (index 7) - Two 2x1 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17979
  7: {
    stepNumber: 6,
    staticBricks: [
      // All bricks from steps 1-5
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
    ],
    bricks: [
      // New 2x1 brick on left - drops from above
      {
        id: 'brick-1',
        type: '2x1',
        left: '341px',
        top: '-100px',
        finalTop: '348px',
        width: '90px',
        height: '61px',
        animationDelay: '0s',
        zIndex: 10,
      },
      // New 2x1 brick on right - drops from above
      {
        id: 'brick-2',
        type: '2x1',
        left: '465px',
        top: '-100px',
        finalTop: '415px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 11,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '348px',
        width: '90px',
        height: '61px',
      },
      {
        left: '465px',
        top: '415px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 7 (index 8) - Three 3x1 bricks (white, blue, flat)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18206
  8: {
    stepNumber: 7,
    staticBricks: [
      // All bricks from steps 1-6
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
    ],
    bricks: [
      // New 3x1 brick (blue) - drops from above first (bottom layer)
      {
        id: 'brick-1',
        type: '3x1',
        left: '372px',
        top: '-100px',
        finalTop: '363px',
        width: '120px',
        height: '96px',
        animationDelay: '0s',
        zIndex: 12,
      },
      // New 3x1 White brick - drops from above second (middle layer)
      {
        id: 'brick-2',
        type: '3x1-white',
        left: '374px',
        top: '-100px',
        finalTop: '348px',
        width: '120px',
        height: '96px',
        animationDelay: '0.3s',
        zIndex: 13,
      },
      // New 3x1 Flat brick - drops from above last (top layer)
      {
        id: 'brick-3',
        type: '3x1-flat',
        left: '375px',
        top: '-100px',
        finalTop: '333px',
        width: '120px',
        height: '96px',
        animationDelay: '0.6s',
        zIndex: 14,
      },
    ],
    placeholders: [
      {
        left: '372px',
        top: '363px',
        width: '120px',
        height: '96px',
      },
      {
        left: '374px',
        top: '348px',
        width: '120px',
        height: '96px',
        animationDelay: '0.3s',
      },
      {
        left: '375px',
        top: '333px',
        width: '120px',
        height: '96px',
        animationDelay: '0.6s',
      },
    ],
  },
  // Step 8 (index 9) - Two 2x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18469
  9: {
    stepNumber: 8,
    staticBricks: [
      // All bricks from steps 1-8
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
    ],
    bricks: [
      // New 2x2 brick - drops from above on left side
      {
        id: 'brick-1',
        type: '2x2',
        left: '341px',
        top: '-100px',
        finalTop: '305px',
        width: '90px',
        height: '97px',
        animationDelay: '0s',
        zIndex: 11,
      },
      // New 2x2 brick - drops from above on right side
      {
        id: 'brick-2',
        type: '2x2',
        left: '466px',
        top: '-100px',
        finalTop: '372px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
        zIndex: 16,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '305px',
        width: '90px',
        height: '97px',
      },
      {
        left: '466px',
        top: '372px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 9 (index 10) - Two 2x1 bricks on top
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18756
  10: {
    stepNumber: 9,
    staticBricks: [
      // All bricks from steps 1-9 (exactly matching step 9)
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 16 },
    ],
    bricks: [
      // New 2x1 brick - drops from above on left
      {
        id: 'brick-1',
        type: '2x1',
        left: '431px',
        top: '-100px',
        finalTop: '291px',
        width: '90px',
        height: '61px',
        animationDelay: '0s',
        zIndex: 17,
      },
      // New 2x1 brick - drops from above on right
      {
        id: 'brick-2',
        type: '2x1',
        left: '556px',
        top: '-100px',
        finalTop: '358px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 18,
      },
    ],
    placeholders: [
      {
        left: '431px',
        top: '291px',
        width: '90px',
        height: '61px',
      },
      {
        left: '556px',
        top: '358px',
        width: '90px',
        height: '61px',
      },
    ],
  },
};
