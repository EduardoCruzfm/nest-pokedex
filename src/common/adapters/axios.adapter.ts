import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interfaces";
import { Injectable } from "@nestjs/common";

@Injectable()   // para poder inyectarlo se deve decorarlo con este decorador !!
export class AxiosAdapter implements HttpAdapter{

    // AxiosInstance tipado extricto
    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const {data} = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new error('This is an error - Check logs')
        }
    }

}