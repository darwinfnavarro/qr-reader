import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full border-b-2 border-t-0 border-slate-200 p-4">
      <nav className="max-w-3xl mx-auto">
        <ul className="flex gap-12 justify-center">
          <li>
            <Link to="/">Lector QR</Link>
          </li>
          <li>
            <Link to="/solicitudes">Solicitudes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
