import * as bcrypt from 'bcrypt';

export async function encryptPassword(password): Promise<string> {
  const hash = await bcrypt.hash(password, 10);

  return hash;
}
