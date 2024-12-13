import { useState, useEffect } from 'react';
import { Option, SelectBase } from '../select/select-base';
import { getPlatforms, getBodegas } from '../../services';

const TripleSelect = () => {
  const [platforms, setPlatforms] = useState<Option[]>([]);
  const [bodegas, setBodegas] = useState<Option[]>([]);

  const onLoad = async () => {
    const platformsData = await getPlatforms();
    console.log({ platformsData });

    setPlatforms(platformsData as Option[]);

    const bodegasData = await getBodegas();
    setBodegas(bodegasData as Option[]);
  };

  useEffect(() => {
    onLoad();

    console.log('Platforms:', platforms);
    console.log('Bodegas:', bodegas);
  }, []);

  const handleSelectionPlatform = (value: string | number) => {
    console.log({ newValue: value });
  };

  const handleSelectionBodega = (value: string | number) => {
    console.log({ newValue: value });
  };

  return (
    <div className="flex gap-4">
      <SelectBase
        options={platforms}
        handleSelection={handleSelectionPlatform}
        label="Seleccionar plataforma"
      />
      <SelectBase
        options={bodegas}
        handleSelection={handleSelectionBodega}
        label="Seleccionar bodega"
      />
    </div>
  );
};

export default TripleSelect;
