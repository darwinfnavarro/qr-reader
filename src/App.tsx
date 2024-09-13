import './App.css';
import { Header } from './components/header/header';
import { Home } from './pages/home';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
