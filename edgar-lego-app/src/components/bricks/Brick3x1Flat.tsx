// 3x1 Flat LEGO Brick Component
import type { BrickColorPalette } from '../../store/buildStore';

interface Brick3x1FlatProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function Brick3x1Flat({ style, colorPalette }: Brick3x1FlatProps) {
  const secondary = colorPalette?.secondary || '#005FBE';
  const tertiary = colorPalette?.tertiary || '#006DDA';
  const highlight = colorPalette?.highlight || '#169AFF';

  return (
    <svg width="121" height="97" viewBox="0 0 121 97" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M0 32.0454L90 79.8784V94.3589L0 46.5259V32.0454Z" fill={tertiary}/>
      <path d="M120.924 64.02L89.9994 80.5006V94.3281L120.924 78V64.02Z" fill={secondary}/>
      <path d="M120.469 64.019L90 80.2163L0.526367 32.0454L30.6875 15.7778L120.469 64.019Z" fill={highlight} stroke="black" strokeWidth="0.5"/>
    </svg>
  );
}

export default Brick3x1Flat;
