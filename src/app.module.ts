import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoringModule } from './storing/storing.module';
import { EncryptionService } from './encryption/encryption.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StoringModule, ConfigModule.forRoot({
    envFilePath: '.dev.env',
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})

export class AppModule {
}
