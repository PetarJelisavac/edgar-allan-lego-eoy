import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/build/WelcomeScreen';
import BuildStep from './pages/build/BuildStep';
import InstructionStep from './pages/build/InstructionStep';
import CompletedScreen from './pages/build/CompletedScreen';
import Gallery from './pages/build/Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/step/:stepId" element={<BuildStep />} />
        <Route path="/instruction/:stepId" element={<InstructionStep />} />
        <Route path="/completed" element={<CompletedScreen />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
