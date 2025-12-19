// 6x1 LEGO Brick Component
import brick6x1 from '../../assets/images/brick-6x1.svg';

interface Brick6x1Props {
  style?: React.CSSProperties;
}

function Brick6x1({ style }: Brick6x1Props) {
  return (
    <img
      src={brick6x1}
      alt="LEGO 6x1 brick"
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

export default Brick6x1;
