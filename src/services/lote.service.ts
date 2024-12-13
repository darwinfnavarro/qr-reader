import { axiosClient } from './axios-client.service';

interface Lote {
  loteId: string;
}

export const getPendingLotes = async () => {
  try {
    const response = await axiosClient.get('/registros/pendientes');
    return response.data as Lote;
  } catch (error) {
    console.error('Error fetching pending lotes:', error);
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

export const getAuthorizedLotes = async () => {
  try {
    const response = await axiosClient.get('/registros/autorizados');
    return response.data as Lote[];
  } catch (error) {
    console.error('Error fetching authorized lotes:', error);
    throw error;
  }
};
