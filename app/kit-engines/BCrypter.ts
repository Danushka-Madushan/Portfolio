import bcrypt from 'bcryptjs'

export class BCrypter {
  public static hash = async (password: string, saltRounds: number): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    return bcrypt.hash(password, salt);
  }

  public static compare = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  }
}
