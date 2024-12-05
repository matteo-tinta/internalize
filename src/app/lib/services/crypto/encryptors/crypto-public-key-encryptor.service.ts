import crypto from "node:crypto"

type CryptoKeyType = Parameters<typeof crypto["privateDecrypt"]>[0]

export interface ICryptoPublicKeyEncrypter {
  encrypt: (data: object) => Buffer,
}

export class CryptoPublicKeyEncrypter implements ICryptoPublicKeyEncrypter {
  constructor(protected publicKey: string) {
    
  }

  public encrypt = (data: object) => crypto.publicEncrypt(this.publicKey, Buffer.from(JSON.stringify(data)))

  public fromString = (key: string, options?: Omit<CryptoKeyType, "key">): CryptoKeyType => {
    const keyOptions: typeof options = options || {
    }
  
    return {
      key: key.replaceAll("\\n", "\n"),
      ...keyOptions
    }
  }
}