import { useNavigate } from 'react-router-dom';
import logoLego from '../../assets/images/Logo.Lego.svg';
import edgarLego from '../../assets/images/EdgarLego.svg';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* LEGO Logo - Top Left */}
      <div style={{
        position: 'absolute',
        top: '1.625rem',
        left: '1.5rem',
        zIndex: 10
      }}>
        <img
          src={logoLego}
          alt="Edgar Allan LEGO Logo"
          style={{
            width: '10.0375rem',
            height: 'auto'
          }}
          className="welcome-logo"
        />
      </div>

      {/* Main Content - Absolute positioned to match Figma */}
      <div
        style={{
          position: 'absolute',
          left: '21.875rem',
          top: '11.5rem',
          display: 'flex',
          gap: '5.75rem',
          alignItems: 'flex-end'
        }}
        className="welcome-content"
      >
        {/* Left Side - Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4.375rem',
            width: '29.1875rem',
            flexShrink: 0
          }}
          className="welcome-text"
        >
          {/* Text Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6.0625rem'
          }}>
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: '3.75rem',
                lineHeight: '4.25rem',
                color: '#000000',
                margin: 0,
                height: '9.25rem',
                width: '100%'
              }}
              className="welcome-heading"
            >
              It's time to <br />
              build together <br />
              in 2026!
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.2,
                color: '#000000',
                margin: 0,
                width: '26.3125rem',
                height: '4.125rem'
              }}
              className="welcome-description"
            >
              Welcome! We hope the new year finds you well. Take a moment to relax, zone out and build something fun with us.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/build/step/1')}
            style={{
              backgroundColor: '#000000',
              color: '#fefff8',
              padding: '0.84375rem 1.875rem',
              height: '4.25rem',
              width: '20.375rem',
              borderRadius: '6.25rem',
              fontFamily: 'Petrona, serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: '1.5rem',
              lineHeight: 'normal',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              flexShrink: 0,
              overflow: 'hidden'
            }}
            className="welcome-button"
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Lets get building!
          </button>
        </div>

        {/* Right Side - LEGO Brick Illustration */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            lineHeight: 0
          }}
          className="welcome-illustration"
        >
          <img
            src={edgarLego}
            alt="Edgar LEGO Character"
            style={{
              display: 'block',
              width: 'auto',
              height: 'auto',
              maxWidth: 'none'
            }}
          />
        </div>
      </div>

      {/* Media Queries via inline styles */}
      <style>{`
        @media (max-width: 1200px) {
          .welcome-content {
            left: 3rem !important;
            gap: 3rem !important;
          }
          .welcome-text {
            width: 25rem !important;
          }
          .welcome-heading {
            font-size: 2.5rem !important;
            line-height: 3rem !important;
            height: auto !important;
          }
          .welcome-description {
            width: 22rem !important;
            height: auto !important;
          }
          .welcome-button {
            width: 18rem !important;
          }
        }

        @media (max-width: 768px) {
          .welcome-logo {
            width: 6rem !important;
          }
          .welcome-content {
            position: static !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
            padding: 6rem 1.5rem 2rem !important;
            margin: 0 auto !important;
          }
          .welcome-text {
            gap: 2rem !important;
            width: 100% !important;
            max-width: 28rem !important;
            align-items: center !important;
            text-align: center !important;
          }
          .welcome-heading {
            font-size: 2rem !important;
            line-height: 2.5rem !important;
            height: auto !important;
          }
          .welcome-description {
            font-size: 1rem !important;
            width: 100% !important;
            height: auto !important;
          }
          .welcome-button {
            width: 100% !important;
            max-width: 20rem !important;
            font-size: 1.25rem !important;
            height: 3.5rem !important;
          }
          .welcome-illustration img {
            width: 15rem !important;
            height: auto !important;
          }
        }

        @media (max-width: 480px) {
          .welcome-heading {
            font-size: 1.75rem !important;
            line-height: 2.25rem !important;
          }
          .welcome-illustration img {
            width: 12rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default WelcomeScreen;
