import { TripleSelect, ReadIMEI } from '@/components';
import './styles/home.styles.css';

export function Home() {
  return (
    <div className="homeWrapper">
      <h1>Home</h1>
      <ReadIMEI />
      <TripleSelect />
    </div>
  );
}
