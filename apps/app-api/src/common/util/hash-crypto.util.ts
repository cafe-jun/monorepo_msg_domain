import { pbkdf2Sync } from 'crypto';

export const hashCrypto = async (string: string): Promise<string> => {
  return pbkdf2Sync(string, 'salt', 100000, 64, 'sha512').toString();
};
