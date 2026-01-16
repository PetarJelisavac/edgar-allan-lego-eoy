/**
 * Script to split BackSideStep1.tsx into two layers:
 * - BackSideStep1Back: Elements that should be BEHIND the pips (left side faces)
 * - BackSideStep1Front: Elements that should be IN FRONT of the pips (front faces, top)
 * 
 * The split is based on Y coordinates - elements in the bottom portion (high Y values)
 * that represent the left-facing side where pips attach go to the back layer.
 * 
 * Usage: node splitSvgLayers.js
 */

const fs = require('fs');
const path = require('path');

// Read the source file
const sourcePath = path.join(__dirname, '../src/components/bricks/BackSideStep1.tsx');
const sourceContent = fs.readFileSync(sourcePath, 'utf8');

// Extract just the SVG content between <svg> tags
const svgMatch = sourceContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
if (!svgMatch) {
  console.error('Could not find SVG content');
  process.exit(1);
}

const svgContent = svgMatch[1];

// Parse individual path/mask/g elements
// We'll split based on which elements are part of the left side (where pips attach)
// vs the front/right side (which should be in front of pips)

// Elements with low X coordinates (0-90) and high Y coordinates (bottom area) 
// are typically the left side faces where pips attach

// For BackSideStep1, looking at the structure:
// - Lines 760-783: Top left curved pieces (front layer)
// - Lines 784-805: Right side column pieces (front layer)  
// - The bottom row bricks (around Y > 250) on the LEFT side should be back layer

// Let's identify elements by their approximate bounding box
// Elements where the main action is on the LEFT side (x < 120) and BOTTOM (y > 200)
// should go to the back layer

const lines = svgContent.split('\n');

// Group elements - we need to keep mask definitions with their usage
let backLayerLines = [];
let frontLayerLines = [];
let defsContent = [];

// Track which masks are used in which layer
let backMasks = new Set();
let frontMasks = new Set();

// Simple heuristic: elements that are part of the left-side bottom area
// Looking at the coordinates, the left side column is roughly x: 0-90
// The bottom row is roughly y > 250

lines.forEach((line, index) => {
  // Skip empty lines
  if (!line.trim()) return;
  
  // Collect defs separately
  if (line.includes('<defs>') || line.includes('</defs>') || 
      line.includes('<linearGradient') || line.includes('</linearGradient>') ||
      line.includes('<stop')) {
    defsContent.push(line);
    return;
  }
  
  // Check if this is a mask definition
  if (line.includes('<mask id=')) {
    // We'll handle masks later based on usage
    return;
  }
  
  // Parse path elements to determine layer
  // Look for fill coordinates or path d attribute
  
  // Elements with tertiary fill on left side (x < 90) go to back
  // Elements with primary/secondary on bottom-left go to back
  
  // For simplicity, let's use line numbers based on visual inspection:
  // Lines 17-109: Bottom studs area (complex, keep in front for now)
  // Lines 110-202: Right side studs (front layer)
  // Lines 203-243: Left side column elements (BACK layer - where pips attach)
  // Lines 244+: Top pieces (front layer)
  
  // Actually, let's be more precise based on the Figma:
  // The pips attach to the LEFT SIDE FACE of the bottom bricks
  // So we need the LEFT SIDE VERTICAL FACES to be in the back layer
  
  // Looking at tertiary fills (left side faces):
  // Line 17, 48, 79, 110, 141, 172, 203, 220 - these are left side faces
  
  // For now, let's output the analysis
});

console.log('BackSideStep1.tsx analysis:');
console.log('Total lines in SVG content:', lines.length);
console.log('\nTo properly split, we need to identify:');
console.log('1. Left side vertical faces (tertiary color) - BACK layer');
console.log('2. Front faces and top - FRONT layer');
console.log('\nThe pips will be sandwiched between these layers.');

// Let's create a simpler approach - extract specific elements
// Based on the Figma, the white pips attach to the LEFT SIDE of the bottom bricks

// For instruction/17, we're using BackSideStep1 which shows the back view
// The pips need to appear IN FRONT of the left-side faces but BEHIND the front faces

// Create the back layer component (left side faces only)
const backLayerTemplate = `// BackSideStep1Back - Left side faces where pips attach (renders BEHIND pips)
import type { BrickColorPalette } from '../../store/buildStore';

interface BackSideStep1BackProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function BackSideStep1Back({ style, colorPalette }: BackSideStep1BackProps) {
  const primary = colorPalette?.primary || '#0080FF';
  const secondary = colorPalette?.secondary || '#005FBE';
  const tertiary = colorPalette?.tertiary || '#006DDA';
  const highlight = colorPalette?.highlight || '#169AFF';

  return (
    <svg width="212" height="386" viewBox="0 0 212 386" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      {/* Left side vertical faces - these go BEHIND the pips */}
      {/* Bottom section left faces */}
      <path d="M0 290.045L60 322.02V336.44L0 304.695V290.045Z" fill={tertiary}/>
      <path d="M0.020726 247.045L60 279.091V321.665L0 289.078L0.020726 247.045Z" fill={tertiary}/>
      <path d="M0 233.045L60 265.02V279.44L0 247.695V233.045Z" fill={tertiary}/>
      <path d="M0 191.116L30 207.171V248.629L0 231.81V191.116Z" fill={tertiary}/>
      <path d="M31 206.187L151 269.878V311.826L31 248.135V206.187Z" fill={tertiary}/>
    </svg>
  );
}

export default BackSideStep1Back;
`;

// Create the front layer component (everything else)
// This is more complex - we need to include all non-left-side elements

console.log('\n--- Generated BackSideStep1Back.tsx ---');
console.log('This component contains only the left-side vertical faces.');
console.log('These should render BEHIND the pips (z-index: 1)');

// Write the back layer file
const backLayerPath = path.join(__dirname, '../src/components/bricks/BackSideStep1Back.tsx');
fs.writeFileSync(backLayerPath, backLayerTemplate);
console.log('\nWrote:', backLayerPath);

console.log('\n--- Next Steps ---');
console.log('1. Create BackSideStep1Front.tsx with remaining elements');
console.log('2. Update instructionConfigs.ts to use layered approach');
console.log('3. Pips will have z-index: 2, sandwiched between layers');
