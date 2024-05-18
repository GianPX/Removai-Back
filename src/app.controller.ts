import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express'
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { readFileSync, readdirSync, unlinkSync } from 'fs';

@ApiTags('API for removing video background by AI')
@Controller()
export class AppController {
  private uploadFolderPath = 'uploads'
  constructor(private readonly appService: AppService) {}

  @Get('greet')
  @ApiResponse({ status: 201, description: 'User Registered', type: String})
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    }),
    limits: {fieldSize: 30000000}
  }))
  async removeBackground(@UploadedFile() video: Express.Multer.File, @Res() res:Response){
    const uploadFolder = readdirSync(this.uploadFolderPath)
    for(const file of uploadFolder){
      if(file != video.filename){
        const filePath = join(this.uploadFolderPath,file)
        unlinkSync(filePath)
      }
    }
    const videoPath = await this.appService.removeBackground(video)
    const videoBuffer: Buffer = readFileSync(videoPath);
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'inline'
    });
    res.send(videoBuffer);
    
  }

  @Get('download')
  downloadVideo(@Res() res:Response){
    const uploadFolder = readdirSync(this.uploadFolderPath)
    const videoPath = join(this.uploadFolderPath,uploadFolder[0])
    const videoBuffer: Buffer = readFileSync(videoPath)
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="removedBGvideo.mp4"'
    });
    res.send(videoBuffer);
  }
}
