import { Injectable, Inject } from '@nestjs/common';
import { StoredData } from './interfaces/stored-data.interface';
import { EncryptionService } from '../encryption/encryption.service';
import { Config } from '../config';
import * as AWS from 'aws-sdk';

@Injectable()
export class StoringService {
  private dynamoDbClient;

  constructor(private encryptionService: EncryptionService, @Inject('Config') private config: Config) {
    this.dynamoDbClient = new AWS.DynamoDB.DocumentClient(
      {
        region: this.config.AWS_REGION
      });
  }

  public async storeData(storeDataDto): Promise <string> {
    const {encryption_key, value} = storeDataDto;
    const encryptedData = this.encryptionService.encryptData(value, encryption_key);
    //TODO save encrypted data to db
    console.log(encryptedData);
    return 'ok';
  }

  public async getData(getDataDto): Promise <StoredData> {
    console.log(getDataDto);
    const params = {
      TableName: this.config.DDB_TABLE,
      KeyConditionExpression: 'id = :id',
      Limit: 100
    };
    const allDataQuery =  await this.dynamoDbClient.query(params).promise();
    const result = allDataQuery.Items;
    const {decryption_key, id} = getDataDto;
    //TODO get data from DB
    const decryptedData = this.encryptionService.decryptData("", decryption_key);
    return {id, value: decryptedData};
  }
}
