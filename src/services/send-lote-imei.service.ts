import { axiosClient } from './axios-client.service';

export const sendLoteImeiService = async (
  loteIMEI: string[]
): Promise<void> => {
  try {
    await axiosClient.post('/registros/bulk', [...loteIMEI]);
  } catch (error) {
    console.error(error);
  } finally {
    window.location.reload();
  }
};
