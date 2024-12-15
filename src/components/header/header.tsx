import { User } from '@/models';
import { Link, useLocation } from 'react-router-dom';

export function Header({ user }: { user: User | null }) {
  const location = useLocation(); // Obtiene la ubicación actual

  // Función para determinar si el enlace es activo
  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-500 font-bold'
      : 'text-slate-700';
  };

  return (
    <header className="w-full border-b-2 border-t-0 border-slate-200 p-4 bg-white shadow-md">
      <nav className="max-w-3xl mx-auto">
        <ul className="flex gap-12 justify-center">
          {user?.role === 'tecnico' && (
            <li>
              <Link
                to="/qr-reader"
                className={`text-lg font-semibold hover:text-blue-500 transition duration-300 ${isActive(
                  '/qr-reader'
                )}`}
              >
                Lector QR
              </Link>
            </li>
          )}

          {user &&
            user.role === 'admin' && ( // Verifica si el usuario es admin
              <li>
                <Link
                  to="/solicitudes"
                  className={`text-lg font-semibold hover:text-blue-500 transition duration-300 ${isActive(
                    '/solicitudes'
                  )}`}
                >
                  Solicitudes
                </Link>
              </li>
            )}
        </ul>
      </nav>
    </header>
  );
}
