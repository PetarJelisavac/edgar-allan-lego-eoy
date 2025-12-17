// 4x2 LEGO Brick Component
import brick4x2Top from '../../assets/images/brick-4x2-top.svg';
import brick4x2Left from '../../assets/images/brick-4x2-left.svg';
import brick4x2Right from '../../assets/images/brick-4x2-right.svg';

interface Brick4x2Props {
  style?: React.CSSProperties;
}

function Brick4x2({ style }: Brick4x2Props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {/* Left side */}
      <div style={{
        position: 'absolute',
        bottom: '6.17%',
        left: 0,
        right: '50%',
        top: '27.57%'
      }}>
        <img
          src={brick4x2Left}
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            maxWidth: 'none'
          }}
        />
      </div>

      {/* Right side */}
      <div style={{
        position: 'absolute',
        bottom: '6.17%',
        left: '50%',
        right: 0,
        top: '28.46%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          transform: 'rotate(180deg) scaleY(-1)',
          width: '60px',
          height: '73.62px'
        }}>
          <img
            src={brick4x2Right}
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              maxWidth: 'none'
            }}
          />
        </div>
      </div>

      {/* Top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '43.09%'
      }}>
        <img
          src={brick4x2Top}
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            maxWidth: 'none'
          }}
        />
      </div>
    </div>
  );
}

export default Brick4x2;
