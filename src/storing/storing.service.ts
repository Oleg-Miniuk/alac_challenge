import { Injectable } from '@nestjs/common';
import { StoredData } from './interfaces/stored-data.interface';
import { EncryptionService } from '../encryption/encryption.service';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StoringService {
  private dynamoDbClient;

  constructor(private encryptionService: EncryptionService, private config: ConfigService) {
    this.dynamoDbClient = new AWS.DynamoDB.DocumentClient(
      {
        region: this.config.get<string>('AWS_REGION')
      });
  }

  public async storeData(data): Promise <string> {
    const {encryption_key, value, id} = data;
    const encryptedData = this.encryptionService.encryptData(value, encryption_key);
    const params = {
      TableName: this.config.get<string>('DDB_TABLE'),
      Item: {'id': id, 'data': encryptedData },
    };
    await this.dynamoDbClient.put(params).promise();
    return 'Data successfully stored';
  }

  public async getData(data): Promise <StoredData> {
    const {decryption_key, id} = data;
    console.log(data);
    const params = {
      TableName: this.config.get<string>('DDB_TABLE'),
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    };
    const allDataQuery =  await this.dynamoDbClient.query(params).promise();
    const dbItem = allDataQuery.Items[0];
    const decryptedData = this.encryptionService.decryptData(dbItem.data, decryption_key);
    return {id, value: decryptedData};
  }
}
