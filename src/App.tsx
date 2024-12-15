import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Home, Login, Requests } from '@/pages';
import { Header, Footer } from '@/components';
import { useState, useEffect } from 'react';
import { User } from './models';
import { Toaster } from 'react-hot-toast';

const Layout = ({
  user,
  removeUser,
}: {
  user: User | null;
  removeUser: () => void;
}) => {
  return (
    <>
      <Header user={user} removeUser={removeUser} />
      <main className="w-full">
        <div className="main w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const removeUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  console.log({ user });

  return (
    <main className="w-full flex flex-col">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/solicitudes" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route element={<Layout user={user} removeUser={removeUser} />}>
            <Route path="qr-reader" element={<Home />} />
            <Route path="solicitudes" element={<Requests user={user} />} />
          </Route>
          <Route path="login" element={<Login addUser={addUser} />} />
        </Routes>
      </Router>
      <Toaster />
    </main>
  );
}

export default App;
