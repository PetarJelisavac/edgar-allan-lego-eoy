// BackSideStep1Front - Front-facing elements that render IN FRONT of pips
// This contains the top surfaces and right-side faces that should overlap the pips
import type { BrickColorPalette } from '../../store/buildStore';

interface BackSideStep1FrontProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function BackSideStep1Front({ style, colorPalette }: BackSideStep1FrontProps) {
  const primary = colorPalette?.primary || '#0080FF';
  const secondary = colorPalette?.secondary || '#005FBE';
  const highlight = colorPalette?.highlight || '#169AFF';

  return (
    <svg width="212" height="386" viewBox="0 0 212 386" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      {/* Bottom row - right side faces (secondary) and top surfaces (primary) */}
      {/* These elements overlap the pips when they slide in from the left */}
      
      {/* Bottom brick row - right side face */}
      <path d="M120 290.045L60 322.02V336.454L120 303.695V290.045Z" fill={secondary}/>
      {/* Bottom brick row - top surface */}
      <path d="M119.47 290.045L60 321.807L0.530273 290.045L60 258.283L119.47 290.045Z" fill={primary} stroke="black" strokeWidth="0.5"/>
      
      {/* Second row from bottom - right side face */}
      <path d="M120 248.045L60 280.02V321.665L120 289.078V248.045Z" fill={secondary}/>
      {/* Second row - top surface */}
      <path d="M119.47 248.045L60 279.807L0.530273 248.045L60 216.283L119.47 248.045Z" fill={primary} stroke="black" strokeWidth="0.5"/>
      
      {/* Third row - right side face */}
      <path d="M120 233.045L60 265.02V279.454L120 246.695V233.045Z" fill={secondary}/>
      {/* Third row - top surface */}
      <path d="M119.47 233.045L60 264.807L0.530273 233.045L60 201.283L119.47 233.045Z" fill={primary} stroke="black" strokeWidth="0.5"/>

      {/* Studs on top surfaces - these should be in front of pips */}
      {/* Bottom row studs */}
      <path d="M60.5 268.25C63.9051 268.25 66.9774 269.244 69.1924 270.839C71.4077 272.434 72.75 274.616 72.75 277C72.75 279.384 71.4077 281.566 69.1924 283.161C66.9774 284.756 63.9051 285.75 60.5 285.75C57.0949 285.75 54.0226 284.756 51.8076 283.161C49.5923 281.566 48.25 279.384 48.25 277C48.25 274.616 49.5923 272.434 51.8076 270.839C54.0226 269.244 57.0949 268.25 60.5 268.25Z" fill={secondary} stroke="black" strokeWidth="0.5"/>
      <path d="M60.5 261.25C63.9051 261.25 66.9774 262.244 69.1924 263.839C71.4077 265.434 72.75 267.616 72.75 270C72.75 272.384 71.4077 274.566 69.1924 276.161C66.9774 277.756 63.9051 278.75 60.5 278.75C57.0949 278.75 54.0226 277.756 51.8076 276.161C49.5923 274.566 48.25 272.384 48.25 270C48.25 267.616 49.5923 265.434 51.8076 263.839C54.0226 262.244 57.0949 261.25 60.5 261.25Z" fill={highlight} stroke="black" strokeWidth="0.5"/>
      
      {/* Left stud */}
      <path d="M30.5 283.25C33.9051 283.25 36.9774 284.244 39.1924 285.839C41.4077 287.434 42.75 289.616 42.75 292C42.75 294.384 41.4077 296.566 39.1924 298.161C36.9774 299.756 33.9051 300.75 30.5 300.75C27.0949 300.75 24.0226 299.756 21.8076 298.161C19.5923 296.566 18.25 294.384 18.25 292C18.25 289.616 19.5923 287.434 21.8076 285.839C24.0226 284.244 27.0949 283.25 30.5 283.25Z" fill={secondary} stroke="black" strokeWidth="0.5"/>
      <path d="M30.5 276.25C33.9051 276.25 36.9774 277.244 39.1924 278.839C41.4077 280.434 42.75 282.616 42.75 285C42.75 287.384 41.4077 289.566 39.1924 291.161C36.9774 292.756 33.9051 293.75 30.5 293.75C27.0949 293.75 24.0226 292.756 21.8076 291.161C19.5923 289.566 18.25 287.384 18.25 285C18.25 282.616 19.5923 280.434 21.8076 278.839C24.0226 277.244 27.0949 276.25 30.5 276.25Z" fill={highlight} stroke="black" strokeWidth="0.5"/>
      
      {/* Right stud */}
      <path d="M89.5 283.25C92.9051 283.25 95.9774 284.244 98.1924 285.839C100.408 287.434 101.75 289.616 101.75 292C101.75 294.384 100.408 296.566 98.1924 298.161C95.9774 299.756 92.9051 300.75 89.5 300.75C86.0949 300.75 83.0226 299.756 80.8076 298.161C78.5923 296.566 77.25 294.384 77.25 292C77.25 289.616 78.5923 287.434 80.8076 285.839C83.0226 284.244 86.0949 283.25 89.5 283.25Z" fill={secondary} stroke="black" strokeWidth="0.5"/>
      <path d="M89.5 276.25C92.9051 276.25 95.9774 277.244 98.1924 278.839C100.408 280.434 101.75 282.616 101.75 285C101.75 287.384 100.408 289.566 98.1924 291.161C95.9774 292.756 92.9051 293.75 89.5 293.75C86.0949 293.75 83.0226 292.756 80.8076 291.161C78.5923 289.566 77.25 287.384 77.25 285C77.25 282.616 78.5923 280.434 80.8076 278.839C83.0226 277.244 86.0949 276.25 89.5 276.25Z" fill={highlight} stroke="black" strokeWidth="0.5"/>
    </svg>
  );
}

export default BackSideStep1Front;
