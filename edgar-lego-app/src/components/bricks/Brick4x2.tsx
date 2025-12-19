// 4x2 LEGO Brick Component
import brick4x2 from '../../assets/images/brick-4x2.svg';

interface Brick4x2Props {
  style?: React.CSSProperties;
}

function Brick4x2({ style }: Brick4x2Props) {
  return (
    <img
      src={brick4x2}
      alt="LEGO 4x2 brick"
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

export default Brick4x2;
