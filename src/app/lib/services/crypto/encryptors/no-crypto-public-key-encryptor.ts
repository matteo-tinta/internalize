import { ICryptoPublicKeyEncrypter } from "./crypto-public-key-encryptor.service"

export class NoCryptoPublicKeyEncrypter implements ICryptoPublicKeyEncrypter {
  public encrypt = (data: object) => Buffer.from(JSON.stringify(data))
}