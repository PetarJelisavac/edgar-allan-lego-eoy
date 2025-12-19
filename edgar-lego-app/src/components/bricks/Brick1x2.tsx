// 1x2 LEGO Brick Component
import brick1x2 from '../../assets/images/brick-1x2.svg';

interface Brick1x2Props {
  style?: React.CSSProperties;
}

function Brick1x2({ style }: Brick1x2Props) {
  return (
    <img
      src={brick1x2}
      alt="LEGO 1x2 brick"
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

export default Brick1x2;
