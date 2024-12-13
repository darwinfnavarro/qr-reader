import { useState, useEffect, useCallback } from 'react';
import { QrReader } from '../components/qr-reader/qr-reader';
import { CardResult } from '../components/card-result/card-result';
import './styles/home.styles.css';
import { imeiQrServiceCreate } from '../services/imei-qr.service';
import { Lots } from '../components/lots/lots';
import {SelectBase} from '../components/select/select-base';
import { getPlatforms, getBodegas } from '../services';

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
        console.log({ newLots });

        setLotsList(newLots);
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

  useEffect(() => {
    getPlatforms()
    getBodegas()
  },[])

  const optionsPlatform = [
    {label: '1', value: 1},
    {label: '2', value: 2}

  ]

  const handleSelectionPlatform = (value: string | number) => {
    console.log({newValue: value})
  }

  return (
    <div className="homeWrapper">
      <h1>Home</h1>
      {showQrReader && <QrReader handleResult={handleResult} />}
      {result && <CardResult result={result} />}
      <button onClick={() => setShowQrReader(!showQrReader)} className="button">
        {showQrReader ? 'Close QR Reader' : 'Open QR Reader'}
      </button>

      {lotsList && lotsList.length > 0 && <Lots items={lotsList} />}
      <SelectBase options={optionsPlatform} handleSelection={handleSelectionPlatform} label='Seleccionar plataforma'/>
      <SelectBase options={optionsPlatform} handleSelection={handleSelectionPlatform} label='Seleccionar plataforma'/>

    </div>
  );
}
