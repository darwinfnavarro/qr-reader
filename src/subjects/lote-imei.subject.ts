import { Subject } from 'rxjs';

interface Payload {
  listOfImeis: string[];
  loteId: string;
}

interface LoteImeiPayload {
  type: loteImeiSubjectAction;
  payload?: Payload;
}

const loteImeiSubject = new Subject<LoteImeiPayload>();

export enum loteImeiSubjectAction {
  OPEN_LOTE_IMEI = 'openQR',
  CLOSE_LOTE_IMEI = 'closeQR',
}

export const loteImeiSubject$ = {
  open: (payload: Payload) =>
    loteImeiSubject.next({
      type: loteImeiSubjectAction.OPEN_LOTE_IMEI,
      payload,
    }),
  close: () =>
    loteImeiSubject.next({ type: loteImeiSubjectAction.CLOSE_LOTE_IMEI }),
  getSubjectObservable: () => loteImeiSubject.asObservable(),
};
