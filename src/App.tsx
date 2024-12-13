import './App.css';
import { Header } from './components/header/header';
import { Home } from './pages/home';

function App() {
  return (
    <div className="w-full">
      <Header />
      <main className="w-full">
        <Home />
      </main>
    </div>
  );
}

export default App;
