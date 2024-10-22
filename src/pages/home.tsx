import { useState, useEffect, useCallback } from 'react';
import { QrReader } from '../components/qr-reader/qr-reader';
import { CardResult } from '../components/card-result/card-result';
import './styles/home.styles.css';
import { imeiQrServiceCreate } from '../services/imei-qr.service';

export function Home() {
  const [result, setResult] = useState<string>();
  const [showQrReader, setShowQrReader] = useState<boolean>(false);
  const [lotsList, setLotsList] = useState<any[]>([]);

  const handleResult = (result: any) => {
    setResult(result);
  };

  const onResult = useCallback(
    async (result: string) => {
      setShowQrReader(false); // Ensure this state is in scope

      if (!result || typeof result !== 'string') {
        return;
      }

      try {
        const newLots = await imeiQrServiceCreate(result); // Await the async function
        setLotsList([...lotsList, newLots]);
      } catch (error) {
        console.error('Error creating data:', error);
      }
    },
    [setShowQrReader] // Add dependencies here
  );

  useEffect(() => {
    if (result) {
      onResult(result);
    }
  }, [result]);

  return (
    <div className="homeWrapper">
      {showQrReader && <QrReader handleResult={handleResult} />}
      {result && <CardResult result={result} />}
      <button onClick={() => setShowQrReader(!showQrReader)} className="button">
        {showQrReader ? 'Close QR Reader' : 'Open QR Reader'}
      </button>

      {lotsList && lotsList.length > 0 && (
        <div className="lotsList">
          {lotsList.map((lot, index) => (
            <CardResult key={index} result={lot} />
          ))}
        </div>
      )}
    </div>
  );
}
