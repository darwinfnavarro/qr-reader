import { axiosClient } from './axios-client.service';

export interface Lote {
  loteId: string;
  imei: string;
  bodega: string;
  service: string;
}

export const loteAdapter = (lote: Lote) => {
  return {
    loteId: lote.loteId,
    imei: lote.imei,
    bodega: lote?.nombreBodega,
    service: lote?.descripcionServicio,
  };
};
export const getPendingLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/pendientes');
    return response.data?.map(loteAdapter);
  } catch (error) {
    console.error('Error fetching pending lotes:', error);
    throw error;
  }
};

export const getAuthorizedLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/autorizados');
    return response.data?.map(loteAdapter);
  } catch (error) {
    console.error('Error fetching authorized lotes:', error);
    throw error;
  }
};

export const getRejectedLotes = async (): Promise<Lote[]> => {
  try {
    const response = await axiosClient.get('/registros/rechazados');
    return response.data?.map(loteAdapter);
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
  }
};

export const rejectLote = async (loteId: string) => {
  try {
    const response = await axiosClient.put(`/lotes/rechazar/${loteId}`);
    return response.data as Lote;
  } catch (error) {
    console.error(`Error rejecting lote with ID ${loteId}:`, error);
    throw error;
  }
};
