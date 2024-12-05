import crypto from "node:crypto"

export interface ICryptoPrivateKeyDecryptor {
  decrypt: <T>(data: string) => T
}

export class CryptoPrivateKeyDecryptor implements ICryptoPrivateKeyDecryptor {
  
  constructor(private privateKey: string){}

  public decrypt = <T,>(data: string) => {
    const decryptedBuffer = crypto.privateDecrypt(this.privateKey, Buffer.from(data, "base64"))
    return JSON.parse(decryptedBuffer.toString()) as T
  }
}