// 3x1 LEGO Brick Component
import brick3x1 from '../../assets/images/brick-3x1.svg';

interface Brick3x1Props {
  style?: React.CSSProperties;
}

function Brick3x1({ style }: Brick3x1Props) {
  return (
    <img
      src={brick3x1}
      alt="LEGO 3x1 brick"
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

export default Brick3x1;
