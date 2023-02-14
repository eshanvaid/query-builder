import './App.css';
import Navbar from './components/Navbar';
import QueryBuilder from './components/Builder';

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#1D2025]">
        <Navbar />
        <QueryBuilder />
      </div>
    </>
  );
}

export default App;
