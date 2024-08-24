import * as bcrypt from 'bcrypt';

export const hashing = async (password: string): Promise<string> => {
  const salt: number = 10;
  return await bcrypt.hash(password, salt);
};

export const comparing = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
