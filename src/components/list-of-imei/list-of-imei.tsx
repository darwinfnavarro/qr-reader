import { FC } from 'react';
import { CardResult } from '@/components';
import { IMEI } from '@/services';

interface ListOfIMEIProps {
  items: IMEI[];
}

export const ListOfIMEI: FC<ListOfIMEIProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      {items?.length === 0 ? (
        <p>Registra un nuevo imei mediante el lector QR y crea un lote.</p>
      ) : (
        items?.map((imei, index) => <CardResult key={index} item={imei} />)
      )}
    </div>
  );
};
