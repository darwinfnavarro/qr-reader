import './card-result.styles.css';

export interface CardResultProps {
  result: any;
}

const defaultResult = 'Scan a QR Code to get the result';

export function CardResult({ result = defaultResult }: CardResultProps) {
  return (
    <div className="card">
      <div className="cardHeader">
        <p>Scanned Result</p>
      </div>

      <div className="cardBody">
        <p>{result}</p>
      </div>
    </div>
  );
}
