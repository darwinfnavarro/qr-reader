import { useCallback, useEffect, useState } from 'react';
import { qrSubject$ } from '@/subjects';
import { IMEI, readQrService } from '@/services';
import { CardResult, QrReader } from '@/components';

export const ReadIMEI = () => {
  const [result, setResult] = useState<string>();
  const [showQrReader, setShowQrReader] = useState<boolean>(false);
  const [listOfIMEI, setListOfIMEI] = useState<IMEI[] | undefined>([]);

  useEffect(() => {
    if (result) {
      onResult(result);
    }
  }, [result]);

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
        const foundIMEI = await readQrService(result);
        setListOfIMEI((prevList: IMEI[] | undefined) => {
          if (prevList.some((item) => item.id === foundIMEI.id)) {
            console.warn('Duplicate IMEI detected:', foundIMEI);
            return prevList; // Return the previous list unchanged
          }
          return [...prevList, foundIMEI]; // Add new IMEI
        });
      } catch (error) {
        console.error('Error creating data:', error);
      } finally {
        qrSubject$.closeQR();
      }
    },
    [setShowQrReader] // Add dependencies here
  );

  return (
    <div>
      {showQrReader && <QrReader handleResult={handleResult} />}

      <ul>
        {listOfIMEI?.map((item, index) => (
          <li key={index} className="py-1">
            <CardResult item={item} />
          </li>
        ))}
      </ul>

      <button onClick={() => setShowQrReader(!showQrReader)} className="button">
        {showQrReader ? 'Close QR Reader' : 'Open QR Reader'}
      </button>
    </div>
  );
};

export default ReadIMEI;
