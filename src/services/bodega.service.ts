import { Option } from '../components/select/select-base';
import { axiosClient } from './axios-client';

interface Bodega {
  id: number;
  nombre: string;
}

export const getBodegas = async (): Promise<Option[] | undefined> => {
  try {
    const response: Bodega[] = (await axiosClient.get('/bodegas')).data;

    const newData: Option[] = response?.map((option) => ({
      label: option.nombre,
      value: option.id,
    }));

    return newData;
  } catch (error) {
    console.log(error);
  }
};
