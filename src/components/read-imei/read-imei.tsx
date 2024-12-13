import { useCallback, useEffect, useState } from 'react';
import { qrSubject$, qrSubjectAction } from '@/subjects';
import { IMEI, readQrService } from '@/services';
import { QrReader } from '@/components';
import { Button } from '@mui/material';
import { Close, QrCode } from '@mui/icons-material';

interface ReadIMEIProps {
  handleListOfIMEI: (list: IMEI[]) => void;
}

export const ReadIMEI = ({ handleListOfIMEI }: ReadIMEIProps) => {
  const [result, setResult] = useState<string>();
  const [showQrReader, setShowQrReader] = useState<boolean>(false);
  const [listOfIMEI, setListOfIMEI] = useState<IMEI[]>([]);

  const handleResult = (result: string) => {
    setResult(result);
  };

  const onResult = useCallback(async (result: string) => {
    if (!result || typeof result !== 'string') {
      return;
    }

    try {
      const foundIMEI = await readQrService(result);
      setListOfIMEI((prevList) => {
        if (prevList.some((item) => item.id === foundIMEI.id)) {
          return prevList;
        }
        return [...prevList, foundIMEI];
      });
    } catch (error) {
      console.error('Error creating data:', error);
    } finally {
      qrSubject$.closeQR();
    }
  }, []);

  useEffect(() => {
    if (result) {
      onResult(result);
    }
  }, [result]);

  useEffect(() => {
    if (handleListOfIMEI) {
      handleListOfIMEI(listOfIMEI);
    }
  }, [listOfIMEI]);

  useEffect(() => {
    const subscription = qrSubject$
      .getSubjectObservable()
      .subscribe((action) => {
        if (action === qrSubjectAction.OPEN_QR) {
          setShowQrReader(true);
        } else {
          setShowQrReader(false);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {showQrReader ? (
        <Button
          onClick={() => qrSubject$.closeQR()}
          variant="contained"
          endIcon={<Close />}
          style={{
            padding: '10px 20px',
          }}
        >
          Cerrar lector QR
        </Button>
      ) : (
        <Button
          onClick={() => qrSubject$.openQR()}
          variant="contained"
          endIcon={<QrCode />}
          style={{
            padding: '10px 20px',
          }}
        >
          Abrir lector QR
        </Button>
      )}

      {showQrReader && <QrReader handleResult={handleResult} />}
    </div>
  );
};
