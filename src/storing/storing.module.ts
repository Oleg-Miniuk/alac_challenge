import { Module } from '@nestjs/common';
import { StoringController } from './storing.controller';
import { StoringService } from './storing.service';

@Module({
  controllers: [StoringController],
  providers: [StoringService]
})
export class StoringModule {}
