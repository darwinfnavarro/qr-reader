import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Requests } from '@/pages';
import { Header, Footer } from '@/components';

function App() {
  return (
    <main className="w-full flex flex-col">
      <Router>
        <Header />
        <main className="w-full">
          <div className="main w-full">
            <div className="max-w-3xl mx-auto p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="solicitudes" element={<Requests />} />
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
