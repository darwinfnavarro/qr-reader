import {
  getAuthorizedLotes,
  getPendingLotes,
  getRejectedLotes,
  authorizeLote,
  rejectLote,
  Lote,
} from '@/services/lote.service';
import { TableBase } from '@/components';
import { useEffect, useState } from 'react';

export const Requests = () => {
  const [pending, setPending] = useState<Lote[] | []>([]);
  const [approved, setApproved] = useState<Lote[] | []>([]);
  const [rejected, setRejected] = useState<Lote[] | []>([]);

  const loadLotes = async () => {
    const pendingLotes = await getPendingLotes();
    const approvedLotes = await getAuthorizedLotes();
    const rejectedLotes = await getRejectedLotes();

    setPending(pendingLotes);
    setApproved(approvedLotes);
    setRejected(rejectedLotes);
  };

  useEffect(() => {
    loadLotes();
  }, []);

  console.log({ pending, approved, rejected });

  return (
    <div>
      <h1>Requests</h1>

      <TableBase rows={pending} />
      <TableBase rows={approved} />
      <TableBase rows={rejected} />
    </div>
  );
};

export default Requests;
