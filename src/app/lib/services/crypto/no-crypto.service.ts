import { ICryptoService } from "./crypto.service";

//TODO: zod validation for decryption

export class NoCryptoService implements ICryptoService {
  encrypt = (data: object) => JSON.stringify(data);
  decrypt = <T>(data: string) => JSON.parse(data) as T;
}
