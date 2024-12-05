import NodeRSA from "node-rsa"
import crypto from "node:crypto"

type CryptoKeyType = Parameters<typeof crypto["privateDecrypt"]>[0]

export interface ICryptoPublicKeyEncrypter {
  encrypt: (data: object) => string,
}

export class CryptoPublicKeyEncrypter implements ICryptoPublicKeyEncrypter {
  constructor(protected publicKey: string) {
    
  }

  public encrypt = (data: object) => {
    const key = new NodeRSA(
      this.publicKey.replaceAll("\\n", "\n")
    )
  
    return key.encrypt(JSON.stringify(data), "base64")
  }

  public fromString = (key: string, options?: Omit<CryptoKeyType, "key">): CryptoKeyType => {
    const keyOptions: typeof options = options || {
    }
  
    return {
      key: key.replaceAll("\\n", "\n"),
      ...keyOptions
    }
  }
}