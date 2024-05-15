import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('API for removing video background by AI')
@Controller()
export class AppController {
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
  removeBackground(@UploadedFile() video: Express.Multer.File){
    return this.appService.removeBackground(video);
  }
}
