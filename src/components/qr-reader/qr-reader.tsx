import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import QrFrame from '../../assets/qr-frame.svg';
import './qr-reader.styles.css';

export interface QrReaderProps {
  handleResult: (result: any) => void;
}

export function QrReader({ handleResult }: QrReaderProps) {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>('');

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setScannedResult(result?.data);
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.'
      );
  }, [qrOn]);

  useEffect(() => {
    if (scannedResult) {
      if (handleResult) {
        handleResult(scannedResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedResult]);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
}
