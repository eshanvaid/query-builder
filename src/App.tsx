import './App.css';
import Navbar from './components/Navbar';
import Builder from './components/Builder';

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#1D2025]">
        <Navbar />
        <Builder />
      </div>
    </>
  );
}

export default App;
