import { useState, useEffect } from 'react';
import { Option, SelectBase } from '@/components';

interface DoubleSelectProps {
  platforms: Option[];
  bodegas: Option[];
  handleSelectionOptions: (
    platform: string | number,
    bodega: string | number
  ) => void;
}

export const DoubleSelect = ({
  platforms,
  bodegas,
  handleSelectionOptions,
}: DoubleSelectProps) => {
  const [platform, setPlatform] = useState<string | number>('');
  const [bodega, setBodega] = useState<string | number>('');

  const handleSelectionPlatform = (value: string | number) => {
    setPlatform(value);
  };

  const handleSelectionBodega = (value: string | number) => {
    setBodega(value);
  };

  useEffect(() => {
    if (handleSelectionOptions) {
      handleSelectionOptions(platform, bodega);
    }
  }, [platform, bodega]);

  return (
    <div className="flex gap-4">
      <SelectBase
        options={platforms}
        handleSelection={handleSelectionPlatform}
        label="plataforma"
      />
      <SelectBase
        options={bodegas}
        handleSelection={handleSelectionBodega}
        label="bodega"
      />
    </div>
  );
};

export default DoubleSelect;
