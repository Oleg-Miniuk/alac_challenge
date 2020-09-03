import { Module } from '@nestjs/common';
import { StoringController } from './storing.controller';
import { StoringService } from './storing.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [StoringController],
  providers: [StoringService, EncryptionService],
  imports: [ConfigModule]
})
export class StoringModule {}
