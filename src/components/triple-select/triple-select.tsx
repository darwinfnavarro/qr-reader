import { useState, useEffect } from 'react';
import { Option, SelectBase } from '../select/select-base';
import { getPlatforms, getBodegas } from '../../services';
import { qrSubject$, qrSubjectAction } from '../../subjects/qr.subject';

export const TripleSelect = () => {
  const [show, setShow] = useState<boolean>(false);
  const [platforms, setPlatforms] = useState<Option[]>([]);
  const [bodegas, setBodegas] = useState<Option[]>([]);

  const onLoad = async () => {
    const platformsData = await getPlatforms();
    setPlatforms(platformsData as Option[]);

    const bodegasData = await getBodegas();
    setBodegas(bodegasData as Option[]);
  };

  useEffect(() => {
    const subscription = qrSubject$
      .getSubjectObservable()
      .subscribe((action) => {
        if (action === qrSubjectAction.CLOSE_QR) {
          setShow(true);
        } else {
          setShow(false);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  const handleSelectionPlatform = (value: string | number) => {
    console.log({ newValue: value });
  };

  const handleSelectionBodega = (value: string | number) => {
    console.log({ newValue: value });
  };

  return (
    <div>
      {show && (
        <>
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
        </>
      )}
    </div>
  );
};

export default TripleSelect;
