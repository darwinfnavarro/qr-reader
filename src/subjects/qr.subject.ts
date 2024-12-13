import { Subject } from 'rxjs';

const qrSubject = new Subject();

export enum qrSubjectAction {
  OPEN_QR = 'openQR',
  CLOSE_QR = 'closeQR',
}

export const qrSubject$ = {
  openQR: () => qrSubject.next(qrSubjectAction.OPEN_QR),
  closeQR: () => qrSubject.next(qrSubjectAction.CLOSE_QR),
  getSubjectObservable: () => qrSubject.asObservable(),
};
