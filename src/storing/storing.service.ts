import { Injectable } from '@nestjs/common';
import { StoredData } from './interfaces/stored-data.interface';

@Injectable()
export class StoringService {
  storeData(storeDataDto): string {
    console.log(storeDataDto);
    return 'ok';
  }

  getData(getDataDto): StoredData {
    console.log(getDataDto);
    return {id: "11", value: {}};
  }
}
