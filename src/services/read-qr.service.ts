import { axiosClient } from './axios-client';

export interface IMEI {
  id: string;
  imeiCode: string;
}

export const readQrService = async (
  qrCode: string
): Promise<IMEI | undefined> => {
  try {
    const response = await axiosClient.get(`producto/imei/${qrCode}`);
    return {
      id: response.data.id,
      imeiCode: response.data.imei,
    };
  } catch (error) {
    console.error(error);
  }
};
