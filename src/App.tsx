import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import AddMemory from './pages/AddMemory';
import MemoryDetail from './pages/MemoryDetail';
import CompartmentHub from './pages/CompartmentHub';
import CompartmentPage from './pages/CompartmentPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-app text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/compartments" element={<CompartmentHub />} />
          <Route path="/compartment/:compartmentId" element={<CompartmentPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/add" element={<AddMemory />} />
          <Route path="/memory/:id" element={<MemoryDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
