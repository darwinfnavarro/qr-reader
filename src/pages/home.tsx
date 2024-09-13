import { useState } from 'react';
import { QrReader } from '../components/qr-reader/qr-reader';
import { CardResult } from '../components/card-result/card-result';
import './styles/home.styles.css';

export function Home() {
  const [result, setResult] = useState<any>();

  const handleResult = (result: any) => {
    setResult(result);
  };

  return (
    <div className="homeWrapper">
      <QrReader handleResult={handleResult} />
      <CardResult result={result} />
    </div>
  );
}
