import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';

// Import color card assets
import colorBaddyBlueBg from '../../assets/images/color-baddy-blue-bg.png';
import colorWineBg from '../../assets/images/color-wine-bg.png';
import colorSunshineBg from '../../assets/images/color-sunshine-bg.png';
import colorRojoBg from '../../assets/images/color-rojo-bg.png';
import colorCoalBg from '../../assets/images/color-coal-bg.png';

import brickBaddyBlue from '../../assets/images/brick-baddy-blue.svg';
import brickWine from '../../assets/images/brick-wine.svg';
import brickSunshine from '../../assets/images/brick-sunshine.svg';
import brickRojo from '../../assets/images/brick-rojo.svg';
import brickCoal from '../../assets/images/brick-coal.svg';

const colorOptions = [
  { name: 'Baddy Blue', background: colorBaddyBlueBg, brick: brickBaddyBlue },
  { name: 'Wine', background: colorWineBg, brick: brickWine },
  { name: 'Sunshine', background: colorSunshineBg, brick: brickSunshine },
  { name: 'Rojo', background: colorRojoBg, brick: brickRojo },
  { name: 'Coal', background: colorCoalBg, brick: brickCoal },
];

function BuildStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted } = useBuildStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];

  if (!step || step.type !== 'build') {
    return <div>Step not found</div>;
  }

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleNext = () => {
    if (!selectedColor) return;

    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= buildSteps.length) {
      navigate('/build/complete');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'question') {
        navigate(`/build/question/${nextIndex}`);
      } else if (nextStep.type === 'video') {
        navigate(`/build/video/${nextIndex}`);
      } else {
        navigate(`/build/step/${nextIndex}`);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Heading */}
      <h2 style={{
        position: 'absolute',
        left: 'calc(33.33% + 39px)',
        top: '39px',
        fontFamily: 'Epilogue, sans-serif',
        fontWeight: 600,
        fontSize: '36px',
        lineHeight: 1.3,
        color: '#000000',
        whiteSpace: 'nowrap',
        margin: 0
      }}>
        What color did you get?
      </h2>

      {/* Color Cards */}
      {colorOptions.map((color, index) => {
        const positions = [
          { left: '23px' },
          { left: 'calc(16.67% + 67px)' },
          { left: 'calc(33.33% + 111px)' },
          { left: 'calc(58.33% + 35px)' },
          { left: 'calc(75% + 79px)' }
        ];

        const brickPositions = [
          { left: '92px' },
          { left: 'calc(25% + 16px)' },
          { left: 'calc(41.67% + 60px)' },
          { left: 'calc(58.33% + 104px)' },
          { left: 'calc(83.33% + 28px)' }
        ];

        const labelPositions = [
          { left: 'calc(8.33% + 126px)' },
          { left: 'calc(25% + 168px)' },
          { left: 'calc(41.67% + 210px)' },
          { left: 'calc(66.67% + 138px)' },
          { left: 'calc(83.33% + 180px)' }
        ];

        return (
          <div key={color.name}>
            {/* Background Card */}
            <button
              onClick={() => handleColorSelect(color.name)}
              style={{
                position: 'absolute',
                ...positions[index],
                top: '110px',
                width: '259px',
                height: '712px',
                border: selectedColor === color.name ? '4px solid #000000' : 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s, border 0.2s',
                background: 'transparent',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={color.background}
                alt={`${color.name} background`}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: 'none'
                }}
              />
            </button>

            {/* LEGO Brick */}
            <div style={{
              position: 'absolute',
              ...brickPositions[index],
              top: '401px',
              width: '121.541px',
              height: '121.316px',
              pointerEvents: 'none'
            }}>
              <img
                src={color.brick}
                alt={`${color.name} brick`}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: 'none'
                }}
              />
            </div>

            {/* Label */}
            <p style={{
              position: 'absolute',
              ...labelPositions[index],
              top: '770px',
              width: '122px',
              height: '14px',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: index === 0 ? 1.1 : 'normal',
              color: '#000000',
              textAlign: 'right',
              transform: 'translateX(-100%)',
              margin: 0,
              pointerEvents: 'none'
            }}>
              {color.name}
            </p>
          </div>
        );
      })}

      {/* Continue Button - appears when color is selected */}
      {selectedColor && (
        <button
          onClick={handleNext}
          style={{
            position: 'fixed',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#000000',
            color: '#fefff8',
            padding: '0.84375rem 1.875rem',
            height: '4.25rem',
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
            zIndex: 10,
            minWidth: '12rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}
        >
          Continue
        </button>
      )}

      {/* Media Queries */}
      <style>{`
        @media (max-width: 1400px) {
          h2[style*="calc(33.33% + 39px)"] {
            left: 50% !important;
            transform: translateX(-50%) !important;
            white-space: normal !important;
            text-align: center !important;
            top: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          /* Stack cards vertically on mobile */
          button[style*="position: absolute"][style*="259px"] {
            position: static !important;
            width: 100% !important;
            max-width: 320px !important;
            height: 400px !important;
            margin: 1rem auto !important;
            display: block !important;
          }

          div[style*="121.541px"] {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 180px !important;
          }

          p[style*="translateX(-100%)"] {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            text-align: center !important;
            bottom: 2rem !important;
            top: auto !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BuildStep;
