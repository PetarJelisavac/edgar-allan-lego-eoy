import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import { instructionConfigs } from '../../data/instructionConfigs';

import buildingBackground from '../../assets/images/Building.Background.png';
import audioIcon from '../../assets/images/audio-icon.svg';
import arrowBack from '../../assets/images/arrow-back.svg';

import brickBaddyBlue from '../../assets/images/brick-baddy-blue.svg';
import brickWine from '../../assets/images/brick-wine.svg';
import brickSunshine from '../../assets/images/brick-sunshine.svg';
import brickRojo from '../../assets/images/brick-rojo.svg';
import brickCoal from '../../assets/images/brick-coal.svg';
import Brick1x2 from '../../components/bricks/Brick1x2';
import Brick2x1 from '../../components/bricks/Brick2x1';
import Brick2x2 from '../../components/bricks/Brick2x2';
import Brick3x1 from '../../components/bricks/Brick3x1';
import Brick4x1 from '../../components/bricks/Brick4x1';
import Brick4x2 from '../../components/bricks/Brick4x2';
import Brick6x1 from '../../components/bricks/Brick6x1';
import BrickVertical from '../../components/bricks/BrickVertical';
import BrickTop from '../../components/bricks/BrickTop';
import BrickTopLeftCurve from '../../components/bricks/BrickTopLeftCurve';
import BrickTopCurveRight from '../../components/bricks/BrickTopCurveRight';
import Brick1x2SidePip from '../../components/bricks/Brick1x2SidePip';
import Brick3x1White from '../../components/bricks/Brick3x1White';
import Brick3x1Flat from '../../components/bricks/Brick3x1Flat';
import Brick8x2 from '../../components/bricks/Brick8x2';
import InstructionPlaceholder from '../../components/bricks/InstructionPlaceholder';
import { brickColorPalettes } from '../../store/buildStore';

function InstructionStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted, selectedBrickColor } = useBuildStore();
  const [animationKey, setAnimationKey] = React.useState(0);

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];
  const config = instructionConfigs[currentStepIndex] || instructionConfigs[2];

  // Force animation restart when step changes
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentStepIndex]);

  // Get the appropriate single brick asset based on selected color
  const getSingleBrickAsset = () => {
    switch (selectedBrickColor) {
      case 'Wine':
        return brickWine;
      case 'Sunshine':
        return brickSunshine;
      case 'Rojo':
        return brickRojo;
      case 'Coal':
        return brickCoal;
      case 'Baddy Blue':
      default:
        return brickBaddyBlue;
    }
  };

  // Get color palette for precise color matching
  const getColorPalette = () => {
    return selectedBrickColor ? brickColorPalettes[selectedBrickColor] : undefined;
  };

  if (!step || step.type !== 'build') {
    return <div className="min-h-screen flex items-center justify-center">Step not found</div>;
  }

  const handleNext = () => {
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= buildSteps.length) {
      // All steps completed - navigate to completed screen
      navigate('/build/completed');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
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
    console.log('Audio toggle clicked');
  };

  const generateKeyframes = () => {
    // Calculate starting Y position based on step index
    // Steps 0-4: -300px, Steps 5-9: -275px, Steps 10-14: -250px, Steps 15+: -225px
    const stepGroup = Math.floor(currentStepIndex / 5);
    const startY = -300 + (stepGroup * 70);

    return config.bricks.map((brick, index) => {
      // Check if this brick has a gap-closing animation (finalLeft property)
      if (brick.finalLeft) {
        const startLeft = parseFloat(brick.left);
        const finalLeft = parseFloat(brick.finalLeft);
        const horizontalShift = finalLeft - startLeft;

        // Scene-1.json pattern - uniform timing:
        // 0-25%: fade in (0→100%) + scale up (50%→100%), stay in place
        // 25-100%: move to final position (both vertical AND horizontal together)

        return `
          @keyframes fallBrick${index + 1} {
            0% { opacity: 0; transform: translate(0, ${startY}px) scale(0.5); }
            25% { opacity: 1; transform: translate(0, ${startY}px) scale(1); }
            100% { opacity: 1; transform: translate(${horizontalShift}px, 0) scale(1); }
          }
        `;
      } else {
        // Regular fall animation with Scene-1.json pattern
        // 0-25%: fade in (0→100%) + scale up (50%→100%), stay at starting position
        // 25-100%: move down to final position (0px)
        return `
          @keyframes fallBrick${index + 1} {
            0% { opacity: 0; transform: translateY(${startY}px) scale(0.5); }
            25% { opacity: 1; transform: translateY(${startY}px) scale(1); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `;
      }
    }).join('\n');
  };

  const renderBrickComponent = (type: string) => {
    const colorPalette = getColorPalette();
    const singleBrickAsset = getSingleBrickAsset();

    switch (type) {
      case '1x2':
        return <Brick1x2 colorPalette={colorPalette} />;
      case '2x1':
        return <Brick2x1 colorPalette={colorPalette} />;
      case '2x2':
        return <Brick2x2 colorPalette={colorPalette} />;
      case '3x1':
        return <Brick3x1 colorPalette={colorPalette} />;
      case '4x1':
        return <Brick4x1 colorPalette={colorPalette} />;
      case '4x2':
        return <Brick4x2 colorPalette={colorPalette} />;
      case '6x1':
        return <Brick6x1 colorPalette={colorPalette} />;
      case 'vertical':
        return <BrickVertical colorPalette={colorPalette} />;
      case 'top':
        return <BrickTop colorPalette={colorPalette} />;
      case 'top-left-curve':
        return <BrickTopLeftCurve colorPalette={colorPalette} />;
      case 'top-curve-right':
        return <BrickTopCurveRight colorPalette={colorPalette} />;
      case '3x1-white':
        return <Brick3x1White />;
      case '3x1-flat':
        return <Brick3x1Flat />;
      case '8x2':
        return <Brick8x2 colorPalette={colorPalette} />;
      case '1x2-side-pip':
        return <Brick1x2SidePip colorPalette={colorPalette} />;
      case 'vertical-white':
        return <BrickVertical colorPalette={{ name: 'Baddy Blue', primary: '#FFFFFF', secondary: '#D9D9D9', tertiary: '#E5E5E5', highlight: '#FFFFFF' }} />;
      case 'vertical-blue':
        return <BrickVertical colorPalette={colorPalette} />;
      case 'single':
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
      default:
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
    }
  };

  const renderStaticBrick = (brickConfig: typeof config.staticBricks[0], index: number) => {
    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(${parseFloat(brickConfig.left) / 930 * 100}%)`,
      top: `calc(${parseFloat(brickConfig.top) / 712 * 100}%)`,
      width: `calc(${parseFloat(brickConfig.width) / 930 * 100}%)`,
      height: `calc(${parseFloat(brickConfig.height) / 712 * 100}%)`,
      zIndex: brickConfig.zIndex,
    };

    return (
      <div key={`static-brick-${index}`} style={containerStyle}>
        {renderBrickComponent(brickConfig.type)}
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2vw, 24px)',
      paddingBottom: 'clamp(100px, 12vw, 140px)', // Extra padding for fixed buttons
      position: 'relative'
    }}>
      {/* Background container - fills remaining vertical space */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '930px',
        margin: '0 auto',
        flex: '1 1 0%',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background image - fills entire container */}
        <img
          src={buildingBackground}
          alt="Building background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            borderRadius: '8px'
          }}
        />

        {/* Animation container - maintains 930:712 aspect ratio for proper brick scaling */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '930 / 712',
          maxHeight: '100%'
        }}>

          {/* Step number badge - centered at top */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '10%',
            width: 'clamp(50px, 6vw, 60px)',
            height: 'clamp(50px, 6vw, 60px)',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              color: 'black',
              textAlign: 'center',
              lineHeight: 1,
              margin: 0
            }}>
              {config.stepNumber}
            </p>
          </div>

          {/* Audio button - top right */}
          <button
            onClick={handleAudioToggle}
            style={{
              position: 'absolute',
              right: 'clamp(12px, 1.5vw, 16px)',
              top: 'clamp(12px, 1.5vw, 16px)',
              width: 'clamp(32px, 4vw, 38px)',
              height: 'clamp(32px, 4vw, 38px)',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              padding: 0,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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

          {/* LEGO Bricks and Placeholders - scaled relative to container */}
          <div key={animationKey} style={{
            position: 'absolute',
            inset: 0
          }}>
            {/* Placeholder outlines - only show on first instruction step (no static bricks) */}
            {(!config.staticBricks || config.staticBricks.length === 0) && config.placeholders.map((placeholder, index) => (
              <div
                key={`placeholder-${index}`}
                style={{
                  position: 'absolute',
                  left: `calc(${parseFloat(placeholder.left) / 930 * 100}%)`,
                  top: `calc(${parseFloat(placeholder.top) / 712 * 100}%)`,
                  width: `calc(${parseFloat(placeholder.width) / 930 * 100}%)`,
                  height: `calc(${parseFloat(placeholder.height) / 712 * 100}%)`,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              >
                <InstructionPlaceholder />
              </div>
            ))}

            {/* Static bricks from previous steps */}
            {config.staticBricks?.map((staticBrick, index) => renderStaticBrick(staticBrick, index))}

            {/* Animated bricks for current step */}
            {config.bricks.map((brick, index) => {
              const animationName = `fallBrick${index + 1}`;
              const brickStyle: React.CSSProperties = {
                left: `calc(${parseFloat(brick.left) / 930 * 100}%)`,
                top: `calc(${parseFloat(brick.finalTop) / 712 * 100}%)`,
                width: `calc(${parseFloat(brick.width) / 930 * 100}%)`,
                height: `calc(${parseFloat(brick.height) / 712 * 100}%)`,
                animationName: animationName,
                animationDuration: '4s',
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'forwards',
                animationDelay: brick.animationDelay,
                zIndex: brick.zIndex,
              };

              // Add fade effect on the right side if specified
              if (brick.fadeRight) {
                brickStyle.maskImage = 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)';
                brickStyle.WebkitMaskImage = 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)';
              }

              return (
                <div
                  key={brick.id}
                  style={{
                    ...brickStyle,
                    position: 'absolute',
                    opacity: 0
                  }}
                >
                  {renderBrickComponent(brick.type)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom controls container - Fixed at bottom */}
      <div style={{
        position: 'fixed',
        bottom: 'clamp(20px, 2vw, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - clamp(32px, 4vw, 48px))',
        maxWidth: '930px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(12px, 1.5vw, 16px)',
        zIndex: 50
      }}>
        {/* Back button */}
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #939393',
            borderRadius: '80px',
            padding: 'clamp(16px, 2vw, 32px) clamp(24px, 3vw, 40px)',
            backgroundColor: '#fefff8',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            transform: 'rotate(180deg)',
            width: 'clamp(20px, 2.5vw, 27px)',
            height: 'clamp(12px, 1.5vw, 15px)'
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
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          style={{
            flex: '1 1 0%',
            maxWidth: '399px',
            height: 'clamp(52px, 6vw, 68px)',
            backgroundColor: 'black',
            color: '#fefff8',
            borderRadius: '100px',
            padding: 'clamp(12px, 1.5vw, 13.5px) clamp(24px, 3vw, 30px)',
            fontFamily: 'Petrona, serif',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 24px)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Next
        </button>
      </div>

      {/* Animations */}
      <style>{`
        ${generateKeyframes()}
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default InstructionStep;
