import { NonNullableRecursive } from "../../models/non-nullable-recursive.model";
import { CryptoService, ICryptoService } from "./crypto.service";
import { CryptoPrivateKeyDecryptor } from "./decryptors/crypto-private-key-decryptor.service";
import { CryptoPublicKeyEncrypter } from "./encryptors/crypto-public-key-encryptor.service";
import { NoCryptoService } from "./no-crypto.service";

type KeyPair = {
  publicKey: string | undefined, 
  privateKey: string | undefined
}

export class CryptoServiceFactory {

  private static hasPair = (pair?: KeyPair): 
    pair is NonNullableRecursive<KeyPair> => !!pair?.publicKey && !!pair?.privateKey

  public static buildService(pair?: KeyPair): ICryptoService {
    if(this.hasPair(pair)){
      const {publicKey, privateKey} = pair

      return new CryptoService(
        new CryptoPublicKeyEncrypter(publicKey),
        new CryptoPrivateKeyDecryptor(privateKey)
      )
    }

    return new NoCryptoService()
  }
}