// 4x1 LEGO Brick Component
import brick4x1 from '../../assets/images/brick-4x1.svg';

interface Brick4x1Props {
  style?: React.CSSProperties;
}

function Brick4x1({ style }: Brick4x1Props) {
  return (
    <img
      src={brick4x1}
      alt="LEGO 4x1 brick"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        ...style
      }}
    />
  );
}

export default Brick4x1;
