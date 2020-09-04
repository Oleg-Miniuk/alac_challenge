import { Module } from '@nestjs/common';
import { StoringController } from './storing.controller';
import { StoringService } from './storing.service';
import { EncryptionService } from '../encryption/encryption.service';
import { Config } from '../config';

@Module({
  controllers: [StoringController],
  providers: [StoringService, EncryptionService, { provide: 'Config', useClass: Config },],
})
export class StoringModule {}
