import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from './common/adapters/axios.adapter';

@Injectable()
export class AppService {
  constructor(private readonly axios: AxiosAdapter) {}
  getHello(): string {
    return 'API is running!';
  }

  async removeBackground(video: Express.Multer.File){
    const response:string = await this.axios.post('http://127.0.0.1:5000/removebg',{videoUrl: video.path})
    return response
  }
}

