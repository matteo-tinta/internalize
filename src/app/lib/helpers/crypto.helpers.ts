import crypto from "node:crypto"

type CryptoKeyType = Parameters<typeof crypto["privateDecrypt"]>[0]

const encrypt = (publicKey: CryptoKeyType) => (data: object) => {
  return crypto.publicEncrypt(publicKey, Buffer.from(JSON.stringify(data)))
}

const decrypt = (privateKey: CryptoKeyType) => <T,>(data: string) => {
  const decryptedBuffer = crypto.privateDecrypt(privateKey, Buffer.from(data, "base64"))
  return JSON.parse(decryptedBuffer.toString()) as T
}

const fromString = (key: string, options?: Omit<CryptoKeyType, "key">): CryptoKeyType => {
  const keyOptions: typeof options = options || {
  }

  return {
    key: key.replaceAll("\\n", "\n"),
    ...keyOptions
  }
}

export {
  encrypt, 
  decrypt,
  fromString,
}