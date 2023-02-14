import './App.css';
import logo from './logo.png';
import Navbar from './components/Navbar';
import QueryBuilder from './components/QueryBuilder';

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
