import { IMEI } from '@/services';
import './card-result.styles.css';

export interface CardResultProps {
  item: IMEI;
}

export function CardResult({ item }: CardResultProps) {
  return (
    <div className="flex p-4 border-2 rounded-md">
      <p>
        {' '}
        <span>IMEI</span>: {item?.imeiCode}
      </p>
    </div>
  );
}
