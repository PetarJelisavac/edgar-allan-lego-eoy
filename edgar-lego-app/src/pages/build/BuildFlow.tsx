import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import BuildStep from './BuildStep';
import InstructionStep from './InstructionStep';
import MusicToggle from '../../components/common/MusicToggle';

function BuildFlow() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Music Toggle - Always visible */}
      <div className="fixed top-4 right-4 z-50">
        <MusicToggle />
      </div>

      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="step/:stepId" element={<BuildStep />} />
        <Route path="instruction/:stepId" element={<InstructionStep />} />
      </Routes>
    </div>
  );
}

export default BuildFlow;
