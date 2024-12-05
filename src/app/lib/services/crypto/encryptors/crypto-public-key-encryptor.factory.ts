import { CryptoPublicKeyEncrypter, ICryptoPublicKeyEncrypter } from "./crypto-public-key-encryptor.service";
import { NoCryptoPublicKeyEncrypter } from "./no-crypto-public-key-encryptor";

export class CryptoPublicKeyEncryptorFactory {
  public static buildService(
    publicKey: string | undefined
  ): ICryptoPublicKeyEncrypter {
    if(!publicKey){
      return new NoCryptoPublicKeyEncrypter()
    }

    return new CryptoPublicKeyEncrypter(publicKey)
  }
}