import { Controller, Post, Body } from '@nestjs/common';
import { StoringService } from './storing.service';
import { StoreDataDto } from './dto/store-data.dto';
import { GetDataDto } from './dto/get-data.dto';
import { StoredData } from './interfaces/stored-data.interface';

@Controller('storing')
export class StoringController {
  constructor(private readonly storingService: StoringService) {}

  @Post('store-data')
  storeData(@Body() storeDataDto: StoreDataDto): Promise <string> {
    return this.storingService.storeData(storeDataDto);
  }

  @Post('get-data')
  getData(@Body() getDataDto: GetDataDto): Promise <StoredData> {
    return this.storingService.getData(getDataDto);
  }
}
