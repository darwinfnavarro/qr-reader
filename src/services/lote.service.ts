import { axiosClient } from './axios-client.service';
import { format } from 'date-fns';

export interface Lote {
  loteId: string;
  imei: string[];
  bodega: string;
  service: string;
  date: string;
}

export const loteAdapter = (lote: Lote) => {
  return {
    loteId: lote.loteId,
    imei: [lote.imei],
    bodega: lote?.nombreBodega,
    service: lote?.descripcionServicio,
    date: format(lote?.fechaRegistro, 'yyyy-MM-dd HH:mm:ss'),
  };
};

export const unifyDuplicateLotes = (lotes: Lote[]): Lote[] => {
  const unifiedLotes: Lote[] = [];

  lotes.forEach((lote) => {
    const existingLote = unifiedLotes.find((ul) => ul.loteId === lote.loteId);

    if (existingLote) {
      existingLote.imei = [...new Set([...existingLote.imei, ...lote.imei])];
    } else {
      unifiedLotes.push(lote);
    }
  });

  return unifiedLotes;
};

export const getPendingLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/pendientes');
    const unifiedLotes = unifyDuplicateLotes(response.data?.map(loteAdapter));

    return unifiedLotes;
  } catch (error) {
    console.error('Error fetching pending lotes:', error);
    throw error;
  }
};

export const getAuthorizedLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/autorizados');
    const unifiedLotes = unifyDuplicateLotes(response.data?.map(loteAdapter));

    return unifiedLotes;
  } catch (error) {
    console.error('Error fetching authorized lotes:', error);
    throw error;
  }
};

export const getRejectedLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/rechazados');
    const unifiedLotes = unifyDuplicateLotes(response.data?.map(loteAdapter));

    return unifiedLotes;
  } catch (error) {
    console.error('Error fetching rejected lotes:', error);
    throw error;
  }
};

export const authorizeLote = async (loteId: string) => {
  try {
    const response = await axiosClient.put(`/lotes/autorizar/${loteId}`);
    return response.data as Lote;
  } catch (error) {
    console.error(`Error authorizing lote with ID ${loteId}:`, error);
    throw error;
  } finally {
    window.location.reload();
  }
};

export const rejectLote = async (loteId: string) => {
  try {
    const response = await axiosClient.put(`/lotes/rechazar/${loteId}`);
    return response.data as Lote;
  } catch (error) {
    console.error(`Error rejecting lote with ID ${loteId}:`, error);
    throw error;
  } finally {
    window.location.reload();
  }
};
