import { Injectable } from '@nestjs/common';
import { StoredData } from './interfaces/stored-data.interface';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StoringService {
  constructor(private encryptionService: EncryptionService, private configService: ConfigService ) {
  }

  storeData(storeDataDto): string {
    const {encryption_key, value} = storeDataDto;
    const encryptedData = this.encryptionService.encryptData(value, encryption_key);
    //TODO save encrypted data to db
    console.log(encryptedData);
    return 'ok';
  }

  getData(getDataDto): StoredData {
    console.log(getDataDto);
    const {decryption_key, id} = getDataDto;
    //TODO get data from DB
    const decryptedData = this.encryptionService.decryptData("", decryption_key);
    return {id, value: decryptedData};

  }
}
