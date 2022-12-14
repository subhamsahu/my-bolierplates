import './App.css';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './route/CustomRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Sidebar />
          <Navbar />
        </header>
        <main style={{ 'marginTop': '58px' }}>
          <div className="container-fluid pt-3" style={{ minHeight: "100vh" }}>
            <CustomRoutes />
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
