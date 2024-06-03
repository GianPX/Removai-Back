import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CommonModule, ConfigModule.forRoot({
    envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
