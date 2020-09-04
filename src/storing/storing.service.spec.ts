import { Test, TestingModule } from '@nestjs/testing';
import { StoringService } from './storing.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigService } from '@nestjs/config';

describe('StoringService', () => {
  let service: StoringService;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoringService, EncryptionService, ConfigService],
    }).compile();

    service = module.get<StoringService>(StoringService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should receive and preprocess the data', async () => {

    const spy = jest.fn(() => ({ promise: () => Promise.resolve({})}));
    service['dynamoDbClient'] = {
      put: spy,
    };

    expect(await service.storeData({
      'id': '101',
      'encryption_key': '123',
      'value': 'dasdad',
    })).toBe('Data successfully stored');
  });

  it('should decrypt and return the data', async () => {
    const id = '101';
    const value = 'here is a string';
    const secretKey = 'secret key';

    const encryptedString = encryptionService.encryptData(value, secretKey);

    const spy = jest.fn(() => ({ promise: () => Promise.resolve({
        Items: [{
          data: encryptedString
        }]
      })}));

    service['dynamoDbClient'] = {
      query: spy,
    };

    expect(await service.getData({
      id,
      decryption_key: secretKey,
    })).toEqual({id, value: value});
  });
});
