import { Injectable } from '@nestjs/common';

// import statement fails for some reason in jest
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require("crypto-js");


@Injectable()
export class EncryptionService {
  encryptData(data: any, secretKey: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  }

  decryptData(data: any, secretKey: string) {
    const bytes  = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
