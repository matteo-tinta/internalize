import NodeRSA from "node-rsa"

export interface ICryptoPrivateKeyDecryptor {
  decrypt: <T>(data: string) => T
}

export class CryptoPrivateKeyDecryptor implements ICryptoPrivateKeyDecryptor {
  
  constructor(private privateKey: string){}

  public decrypt = <T,>(data: string) => {
    const key = new NodeRSA(
      this.privateKey
    )
  
    const decrypted = key.decrypt(data, "utf8")
  
    return JSON.parse(decrypted.toString()) as T
  }
}