import { AxiosError } from "axios";

export function errorHandler(error: unknown) {

    if(error instanceof AxiosError) {
        alert(JSON.stringify(error.response?.data.message, null, 2));
    } else {
        console.log(error)
    }
    
}