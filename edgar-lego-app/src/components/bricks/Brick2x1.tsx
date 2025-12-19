// 2x1 LEGO Brick Component
import brick2x1 from '../../assets/images/brick-2x1.svg';

interface Brick2x1Props {
  style?: React.CSSProperties;
}

function Brick2x1({ style }: Brick2x1Props) {
  return (
    <img
      src={brick2x1}
      alt="LEGO 2x1 brick"
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

export default Brick2x1;
