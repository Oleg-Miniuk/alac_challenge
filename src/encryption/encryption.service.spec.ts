import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('encrypts primitives: strings', () => {
    const stringData = 'here is a string';
    const secretKey = 'secret key';

    expect(service.encryptData(stringData, secretKey)).not.toBe(stringData);
  });

  it('encrypts primitives: integers', () => {
    const intData = 12345;
    const secretKey = 'secret key';

    expect(service.encryptData(intData, secretKey)).not.toBe(intData);
  });

  it('encrypts and decrypts primitives: strings', () => {
    const stringData = 'here is a string';
    const secretKey = 'secret key';

    const encryptedString = service.encryptData(stringData, secretKey);
    const decryptedString = service.decryptData(encryptedString, secretKey);

    expect(stringData).toBe(decryptedString);
  });

  it('encrypts and decrypts primitives: integers', () => {
    const intData = 12345;
    const secretKey = 'secret key';

    const encryptedInt = service.encryptData(intData, secretKey);
    const decryptedInt = service.decryptData(encryptedInt, secretKey);

    expect(intData).toBe(decryptedInt);
  });

  it('encrypts objects', () => {
    const obj = {
      name: 'John',
      surname: 'Smith',
    };
    const secretKey = 'secret key';

    expect(service.encryptData(obj, secretKey)).not.toEqual(obj);
  });

  it('encrypts and decrypts objects', () => {
    const obj = {
      name: 'John',
      surname: 'Smith',
    };

    const secretKey = 'secret key';

    const encryptedObj = service.encryptData(obj, secretKey);
    const decryptedObj = service.decryptData(encryptedObj, secretKey);

    expect(obj).toEqual(decryptedObj);
  });

  it('encrypts arrays', () => {
    const arr = [
      {
        name: 'John',
        surname: 'Smith',
      },
      {
        name: 'Lisa',
        surname: 'Smith',
      },
    ];
    const secretKey = 'secret key';

    expect(service.encryptData(arr, secretKey)).not.toEqual(arr);
  });

  it('encrypts and decrypts objects', () => {
    const arr = [
      {
        name: 'John',
        surname: 'Smith',
      },
      {
        name: 'Lisa',
        surname: 'Smith',
      },
    ];
    const secretKey = 'secret key';

    const encryptedArr = service.encryptData(arr, secretKey);
    const decryptedArr = service.decryptData(encryptedArr, secretKey);

    expect(arr).toEqual(decryptedArr);
  });

  it('error handler for a wrong secret key ', () => {
    const stringData = 'here is a string';
    const secretKey = 'secret key';
    const wrongSecretKey = 'wrong secret key';

    const encryptedString = service.encryptData(stringData, secretKey);

    try {
      service.decryptData(encryptedString, wrongSecretKey);
    } catch (err) {
      expect(err.message).toBe('Decryption error');
    }
  });

});
