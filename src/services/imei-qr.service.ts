import { API_URL } from '../constants';

export const imeiQrServiceCreate = async (
  imei: string
): Promise<any | null> => {
  if (!imei || typeof imei !== 'string') {
    throw new Error('El IMEI es requerido');
  }

  try {
    const response = await fetch(`${API_URL}/producto/imei/${imei}`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
