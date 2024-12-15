import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Home, Login, Requests } from '@/pages';
import { Header, Footer } from '@/components';
import { useState } from 'react';
import { User } from './models';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({
  element,
  user,
}: {
  element: JSX.Element;
  user: User | null;
}) => {
  return user ? element : <Navigate to="/login" replace />;
};

const Layout = ({ user }: { user: User | null }) => {
  return (
    <>
      <Header user={user} />
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
    setUser(user);
  };

  return (
    <main className="w-full flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<Layout user={user} />}>
            <Route
              path="qr-reader"
              element={<ProtectedRoute element={<Home />} user={user} />}
            />
            <Route
              path="solicitudes"
              element={
                <ProtectedRoute
                  element={<Requests user={user} />}
                  user={user}
                />
              }
            />
          </Route>
          <Route path="login" element={<Login addUser={addUser} />} />
        </Routes>
      </Router>
      <Toaster />
    </main>
  );
}

export default App;
