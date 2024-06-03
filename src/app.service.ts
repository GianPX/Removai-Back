import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from './common/adapters/axios.adapter';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class AppService {
  constructor(private readonly axios: AxiosAdapter) {}
  async getHello() {
    return await this.axios.get(`${process.env.AI_API}/hello`)
  }

  async removeBackground(video: Express.Multer.File):Promise<string>{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const videoname = video.filename.split('.')[0]
    try {
      const result = await cloudinary.uploader.upload(video.path, {
        resource_type: 'video',
        public_id: videoname,
      });
      console.log(result.secure_url)
      const answer:string = await this.axios.post(`${process.env.AI_API}/remove_bg`,{url: result.secure_url})
      console.log(answer)
      return answer
    } catch (error) {
      return error.message
    }

  
  }
}

