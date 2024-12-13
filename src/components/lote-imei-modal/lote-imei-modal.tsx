import {
  loteImeiSubject$,
  loteImeiSubjectAction,
} from '@/subjects/lote-imei.subject';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';

export const LoteImeiDialog = () => {
  const [open, setOpen] = useState(false);
  const [loteImei, setLoteImei] = useState<string[]>([]);
  const [loteId, setLoteId] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const subscription = loteImeiSubject$
      .getSubjectObservable()
      .subscribe(({ type, payload }) => {
        if (type === loteImeiSubjectAction.OPEN_LOTE_IMEI) {
          setLoteImei(payload?.listOfImeis);
          setLoteId(payload?.loteId);
          handleClickOpen();
        } else if (type === loteImeiSubjectAction.CLOSE_LOTE_IMEI) {
          handleClose();
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xl">Listado de IMEI del lote {loteId}</p>
            <div>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
          </div>

          <ul className="pt-4 flex flex-col gap-2">
            {loteImei?.map((imei, index) => (
              <li key={index}>IMEI: {imei}</li>
            ))}
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default LoteImeiDialog;
