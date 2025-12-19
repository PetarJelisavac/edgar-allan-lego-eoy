// 2x2 LEGO Brick Component
import brick2x2 from '../../assets/images/brick-2x2.svg';

interface Brick2x2Props {
  style?: React.CSSProperties;
}

function Brick2x2({ style }: Brick2x2Props) {
  return (
    <img
      src={brick2x2}
      alt="LEGO 2x2 brick"
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

export default Brick2x2;
