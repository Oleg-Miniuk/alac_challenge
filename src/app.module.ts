import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoringModule } from './storing/storing.module';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [StoringModule],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
