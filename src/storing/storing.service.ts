import { Injectable, Logger } from '@nestjs/common';
import { StoredData } from './interfaces/stored-data.interface';
import { EncryptionService } from '../encryption/encryption.service';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StoringService {
  private dynamoDbClient;
  private readonly logger = new Logger('StoringService');

  constructor(private encryptionService: EncryptionService, private config: ConfigService) {
    this.dynamoDbClient = new AWS.DynamoDB.DocumentClient(
      {
        region: this.config.get<string>('AWS_REGION'),
      });
  }

  public async storeData(data): Promise<string> {
    const { encryption_key, value, id } = data;
    const encryptedValue = this.encryptionService.encryptData(value, encryption_key);
    const params = {
      TableName: this.config.get<string>('DDB_TABLE'),
      Item: { 'id': id, 'value': encryptedValue },
    };
    await this.dynamoDbClient.put(params).promise();
      return 'Data successfully stored';
  }

  public async getData(data): Promise<StoredData[]> {
    const { decryption_key, id } = data;


    // TODO Crutch! Discuss and rewrite  wildcard *
    // 1) replace scan() as too expensive operation. Consider GSI for DynamoDB. Or index +  select * where command like for SQL-DB
    // 2) remove crutch for wildcard
    const parsedId = id.replace(/-\*/gi, '');

    const params = {
      TableName: this.config.get<string>('DDB_TABLE'),
      ExpressionAttributeValues: { ':id': parsedId },
      FilterExpression: 'contains (id, :id)',
    };
    const dbResponse = await this.dynamoDbClient.scan(params).promise();
    // end of TODO

    try {
      return dbResponse.Items.map(item => ({
        id: item.id,
        value: this.encryptionService.decryptData(item.value, decryption_key)
      }));
    } catch (err) {
      this.logger.error(err.message);
      return [];
    }
  }
}
