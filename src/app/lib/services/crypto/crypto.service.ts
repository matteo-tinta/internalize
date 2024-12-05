import { ICryptoPublicKeyEncrypter as ICryptoPublicKeyEncryptor } from "./encryptors/crypto-public-key-encryptor.service";
import { ICryptoPrivateKeyDecryptor } from "./decryptors/crypto-private-key-decryptor.service";

export interface ICryptoService
  extends ICryptoPublicKeyEncryptor,
    ICryptoPrivateKeyDecryptor {}

export class CryptoService implements ICryptoService {
  constructor(
    private encryptor: ICryptoPublicKeyEncryptor,
    private decryptor: ICryptoPrivateKeyDecryptor
  ) {}

  encrypt = this.encryptor.encrypt;
  decrypt = this.decryptor.decrypt;
}
