// Top LEGO Brick Component
import type { BrickColorPalette } from '../../store/buildStore';

interface BrickTopProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function BrickTop({ style, colorPalette }: BrickTopProps) {
  const secondary = colorPalette?.secondary || '#005FBE';
  const tertiary = colorPalette?.tertiary || '#006DDA';
  const highlight = colorPalette?.highlight || '#169AFF';

  return (
    <svg width="150" height="97" viewBox="0 0 150 97" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M149 61.5L90 95V76.5L149 45.5V61.5Z" fill={secondary}/>
      <path d="M0 32.0454L90 79.8853V96.1362L0 48.5259V32.0454Z" fill={tertiary}/>
      <path d="M149.471 47.0059L89.998 79.8281L0.530273 32.0449L60.002 0.282227L149.471 47.0059Z" fill={highlight} stroke="black" strokeWidth="0.5"/>
    </svg>
  );
}

export default BrickTop;
