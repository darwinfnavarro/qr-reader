import { Option } from "../components/select/select-base";
import { axiosClient } from "./axios-client";

interface Platform {
    id: number;
    descripcion: string
}


export const getPlatforms = async (): Promise<Option[] | undefined> => {

    try {
        const response: Platform[] = await axiosClient.get('/servicios'); 
        const newData: Option[] = response?.map((option) => ({
            label: option.descripcion,
            value: option.id
        }))

        return newData;

    } catch (error) {
        // console.log(error)
    }
}