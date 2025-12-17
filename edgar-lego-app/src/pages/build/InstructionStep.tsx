import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import { instructionConfigs } from '../../data/instructionConfigs';

// Import instruction assets
import instructionBg from '../../assets/images/instruction-bg.png';
import instructionOverlay1 from '../../assets/images/instruction-overlay-1.svg';
import instructionOverlay2 from '../../assets/images/instruction-overlay-2.svg';
import instructionPlaceholder from '../../assets/images/instruction-placeholder.svg';
import audioIcon from '../../assets/images/audio-icon.svg';
import arrowBack from '../../assets/images/arrow-back.svg';

// Import LEGO brick components
import brickSingle from '../../assets/images/brick-baddy-blue.svg';
import Brick4x1 from '../../components/bricks/Brick4x1';
import Brick4x2 from '../../components/bricks/Brick4x2';

function InstructionStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted } = useBuildStore();

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];

  // Get configuration for this step, or use default (step 2) if not configured
  const config = instructionConfigs[currentStepIndex] || instructionConfigs[2];

  if (!step || step.type !== 'build') {
    return <div>Step not found</div>;
  }

  const handleNext = () => {
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= buildSteps.length) {
      // TODO: Navigate to completion page when ready
      navigate('/build');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
        // Check if it's the first build step or color selection
        // Step 1 is color selection, others are instruction steps
        if (nextIndex === 1) {
          navigate(`/build/step/${nextIndex}`);
        } else {
          navigate(`/build/instruction/${nextIndex}`);
        }
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex < 0) {
      navigate('/build');
    } else {
      const prevStep = buildSteps[prevIndex];
      if (prevStep.type === 'build') {
        if (prevIndex === 1) {
          navigate(`/build/step/${prevIndex}`);
        } else {
          navigate(`/build/instruction/${prevIndex}`);
        }
      }
    }
  };

  const handleAudioToggle = () => {
    // TODO: Implement audio playback
    console.log('Audio toggle clicked');
  };

  // Render brick based on type
  const renderBrick = (brickConfig: typeof config.bricks[0], index: number) => {
    const animationName = `fallBrick${index + 1}`;

    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      left: brickConfig.left,
      top: brickConfig.finalTop,
      width: brickConfig.width,
      height: brickConfig.height,
      animation: `${animationName} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
      animationDelay: brickConfig.animationDelay,
      opacity: 0,
      transform: 'translateY(-300px)',
      zIndex: brickConfig.zIndex,
    };

    if (brickConfig.type === '4x1') {
      return (
        <div key={brickConfig.id} style={containerStyle} className={`brick-fall-${index + 1}`}>
          <Brick4x1 />
        </div>
      );
    } else if (brickConfig.type === '4x2') {
      return (
        <div key={brickConfig.id} style={containerStyle} className={`brick-fall-${index + 1}`}>
          <Brick4x2 />
        </div>
      );
    } else {
      // Single brick
      return (
        <div key={brickConfig.id} style={containerStyle} className={`brick-fall-${index + 1}`}>
          <img
            src={brickSingle}
            alt="LEGO brick"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              maxWidth: 'none'
            }}
          />
        </div>
      );
    }
  };

  // Generate keyframes for all bricks
  const generateKeyframes = () => {
    return config.bricks.map((_, index) => `
      @keyframes fallBrick${index + 1} {
        0% {
          opacity: 0;
          transform: translateY(-300px) scale(0.8);
        }
        60% {
          opacity: 1;
        }
        80% {
          transform: translateY(5px) scale(1.02);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `).join('\n');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Blue instruction box background */}
      <div style={{
        position: 'absolute',
        left: '255px',
        top: '23px',
        width: '930px',
        height: '88px',
        backgroundColor: '#cce5ff'
      }} />

      {/* Main instruction background image */}
      <div style={{
        position: 'absolute',
        left: '255px',
        top: '23px',
        width: '930px',
        height: '712px'
      }}>
        <img
          src={instructionBg}
          alt="Instruction background"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            maxWidth: 'none'
          }}
        />
      </div>

      {/* Overlay 1 - Top left diagonal */}
      <div style={{
        position: 'absolute',
        left: '255px',
        top: '23px',
        width: '474px',
        height: '274px'
      }}>
        <img
          src={instructionOverlay1}
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            maxWidth: 'none'
          }}
        />
      </div>

      {/* Overlay 2 - Bottom right diagonal */}
      <div style={{
        position: 'absolute',
        left: '955px',
        top: '603px',
        width: '230px',
        height: '132px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          transform: 'rotate(180deg)',
          width: '230px',
          height: '132px'
        }}>
          <img
            src={instructionOverlay2}
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

      {/* Step number badge */}
      <div style={{
        position: 'absolute',
        left: '693px',
        top: '81px',
        width: '55px',
        height: '60px',
        border: '1px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      }}>
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: 'normal',
          color: '#000000',
          textAlign: 'center',
          margin: 0,
          width: '100%',
          height: '20px'
        }}>
          {config.stepNumber}
        </p>
      </div>

      {/* Placeholder outlines - pulses to show where bricks go (BEHIND bricks) */}
      {config.placeholders.map((placeholder, index) => (
        <div
          key={`placeholder-${index}`}
          className="placeholder-pulse"
          style={{
            position: 'absolute',
            left: placeholder.left,
            top: placeholder.top,
            width: placeholder.width,
            height: placeholder.height,
            animation: 'pulsePlaceholder 2s ease-in-out infinite',
            animationDelay: placeholder.animationDelay || '0s',
            zIndex: 1
          }}
        >
          <img
            src={instructionPlaceholder}
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              maxWidth: 'none'
            }}
          />
        </div>
      ))}

      {/* LEGO Bricks - rendered in order of zIndex (lowest first) */}
      {[...config.bricks]
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((brick, index) => renderBrick(brick, index))}

      {/* Audio button */}
      <button
        onClick={handleAudioToggle}
        style={{
          position: 'absolute',
          left: '1125px',
          top: '45px',
          width: '38px',
          height: '38px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img
          src={audioIcon}
          alt="Audio toggle"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            maxWidth: 'none'
          }}
        />
      </button>

      {/* Back button */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          left: '255px',
          top: '753px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #939393',
          borderRadius: '80px',
          padding: '34px 41px',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          width: 'auto',
          height: 'auto'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        className="back-button"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            transform: 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '27px',
              height: '14.72px',
              position: 'relative'
            }}>
              <img
                src={arrowBack}
                alt="Back"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          left: '519px',
          top: '753px',
          width: '399px',
          height: '68px',
          backgroundColor: '#000000',
          color: '#fefff8',
          borderRadius: '100px',
          padding: '13.5px 30px',
          fontFamily: 'Petrona, serif',
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: '24px',
          lineHeight: 'normal',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Next
      </button>

      {/* Animations and Media Queries */}
      <style>{`
        /* Falling brick animations - dynamically generated */
        ${generateKeyframes()}

        /* Placeholder pulse animation */
        @keyframes pulsePlaceholder {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .placeholder-pulse {
          animation-timing-function: ease-in-out;
        }

        @media (max-width: 1280px) {
          /* Center instruction box on smaller screens */
          div[style*="left: 255px"][style*="930px"] {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }

          div[style*="left: 693px"] {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }

          button[style*="left: 519px"] {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }

          .back-button {
            left: calc(50% - 350px) !important;
          }

          button[style*="left: 1125px"] {
            right: 2rem !important;
            left: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .back-button {
            left: 2rem !important;
          }
        }

        @media (max-width: 1024px) {
          div[style*="930px"][style*="712px"],
          div[style*="930px"][style*="88px"] {
            width: calc(100vw - 4rem) !important;
            max-width: 700px !important;
          }

          div[style*="left: 690px"],
          div[style*="left: 596px"],
          div[style*="left: 689.5px"] {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="930px"][style*="712px"],
          div[style*="930px"][style*="88px"] {
            width: calc(100vw - 2rem) !important;
            left: 1rem !important;
            transform: none !important;
          }

          button[style*="399px"] {
            width: calc(100% - 4rem) !important;
            max-width: 400px !important;
          }

          div[style*="474px"][style*="274px"],
          div[style*="230px"][style*="132px"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default InstructionStep;
