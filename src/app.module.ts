import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoringModule } from './storing/storing.module';

@Module({
  imports: [StoringModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
