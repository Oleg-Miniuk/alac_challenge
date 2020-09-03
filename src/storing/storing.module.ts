import { Module } from '@nestjs/common';
import { StoringController } from './storing.controller';
import { StoringService } from './storing.service';
import { EncryptionService } from '../encryption/encryption.service';


@Module({
  controllers: [StoringController],
  providers: [StoringService, EncryptionService]
})
export class StoringModule {}
