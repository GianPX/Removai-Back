import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class AxiosAdapter{

    private readonly axios: AxiosInstance = axios

    async get<T>(url: string): Promise<T> {
        try {
            const {data} = await this.axios.get(url,

            )
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async post<T>(url:string, body:Object): Promise<T> {
        try {
            const {data} = await this.axios.post(url,body)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
}