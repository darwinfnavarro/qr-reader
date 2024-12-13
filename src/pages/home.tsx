import { useEffect, useState } from 'react';
import { DoubleSelect, ReadIMEI } from '@/components';
import { ListOfIMEI } from '@/components/list-of-imei/list-of-imei';
import { IMEI } from '@/services';
import { Option } from '@/components';
import { getPlatforms, getBodegas } from '@/services';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Toaster, toast } from 'react-hot-toast';
import { sendLoteImeiService } from '@/services/send-lote-imei.service';

export function Home() {
  const [listOfIMEI, setListOfIMEI] = useState<IMEI[] | []>([]);
  const [platforms, setPlatforms] = useState<Option[]>([]);
  const [bodegas, setBodegas] = useState<Option[]>([]);
  const [selectionOptions, setSelectionOptions] = useState<{
    platform: string | number;
    bodega: string | number;
  }>({
    platform: '',
    bodega: '',
  });

  const onLoadOptions = async () => {
    const platformsData = await getPlatforms();
    setPlatforms(platformsData as Option[]);

    const bodegasData = await getBodegas();
    setBodegas(bodegasData as Option[]);
  };

  useEffect(() => {
    onLoadOptions();
  }, []);

  const handleListOfIMEI = (list: IMEI[]) => {
    setListOfIMEI(list as any);
  };

  const handleSelectionOptions = (
    platform: string | number,
    bodega: string | number
  ) => {
    setSelectionOptions({
      platform,
      bodega,
    });
  };

  const onSubmit = async () => {
    if (listOfIMEI.length === 0) {
      toast.error('No hay IMEI para enviar', {
        duration: 4000,
        id: 'imei-error',
        position: 'bottom-right',
      });
      return;
    }

    if (!selectionOptions.platform) {
      toast.error('Seleccione una plataforma', {
        duration: 4000,
        id: 'platform-error',
        position: 'bottom-right',
      });
      return;
    }

    if (!selectionOptions.bodega) {
      toast.error('Seleccione una bodega', {
        duration: 4000,
        id: 'bodega-error',
        position: 'bottom-right',
      });
      return;
    }

    const newLoteIMEI = listOfIMEI?.map((imei) => {
      return [imei.id, selectionOptions.bodega, selectionOptions.platform];
    });

    try {
      sendLoteImeiService(newLoteIMEI as any);
      toast.success('Lote enviado correctamente', {
        duration: 4000,
        id: 'imei-success',
        position: 'bottom-right',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error al enviar lote', {
        duration: 4000,
        id: 'imei-error',
        position: 'bottom-right',
      });
    } finally {
      setListOfIMEI([]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <ReadIMEI handleListOfIMEI={handleListOfIMEI} />

      {listOfIMEI.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Nuevo lote:</h2>

          <div className="flex flex-col gap-2">
            <ListOfIMEI items={listOfIMEI as IMEI[]} />
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <h2 className="text-xl">Seleccione una plataforma y bodega</h2>

            <DoubleSelect
              platforms={platforms}
              bodegas={bodegas}
              handleSelectionOptions={handleSelectionOptions}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
            }}
            endIcon={<Send />}
            onClick={onSubmit}
          >
            Enviar nuevo lote
          </Button>
        </div>
      )}

      <Toaster />
    </div>
  );
}
