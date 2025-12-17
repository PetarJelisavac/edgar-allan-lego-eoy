// 4x1 LEGO Brick Component
import brick4x1Top from '../../assets/images/brick-4x1-top.svg';
import brick4x1Left from '../../assets/images/brick-4x1-left.svg';
import brick4x1Right from '../../assets/images/brick-4x1-right.svg';

interface Brick4x1Props {
  style?: React.CSSProperties;
}

function Brick4x1({ style }: Brick4x1Props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {/* Left side */}
      <div style={{
        position: 'absolute',
        bottom: '2.56%',
        left: 0,
        right: '50%',
        top: '39.81%'
      }}>
        <img
          src={brick4x1Left}
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
        bottom: '2.54%',
        left: '50%',
        right: 0,
        top: '39.81%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          transform: 'rotate(180deg) scaleY(-1)',
          width: '60px',
          height: '46.409px'
        }}>
          <img
            src={brick4x1Right}
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
        bottom: '20.38%'
      }}>
        <img
          src={brick4x1Top}
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

export default Brick4x1;
