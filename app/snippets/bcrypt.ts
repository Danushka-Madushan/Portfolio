export const TS_CODE_SNIPPET_SERVER = `import bcrypt from 'bcrypt'

export async function hash(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verify(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}`

export const JS_CODE_SNIPPET_SERVER = `import bcrypt from 'bcrypt'

export async function hash(password) {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verify(password, hash) {
  return await bcrypt.compare(password, hash)
}`

export const TS_CODE_SNIPPET_WEB = `import bcrypt from 'bcryptjs'

export async function hash(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(password, salt)
}

export async function verify(password: string, hash: string): Promise<boolean> {
  return bcrypt.compareSync(password, hash)
}`

export const JS_CODE_SNIPPET_WEB = `import bcrypt from 'bcryptjs'

export function hash(password) {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(password, salt)
}

export function verify(password, hash) {
  return bcrypt.compareSync(password, hash)
}`

export const PYTHON_CODE_SNIPPET = `import bcrypt

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed)`

export const CSHARP_CODE_SNIPPET = `using BCrypt.Net;

public static class PasswordUtils
{
    private const int WorkFactor = 12;

    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, WorkFactor);
    }

    public static bool VerifyPassword(string password, string hashed)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashed);
    }
}`

export const GO_CODE_SNIPPET = `package auth

import (
	"golang.org/x/crypto/bcrypt"
)

const cost = 12 // bcrypt work factor

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func VerifyPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}`

export const JAVA_CODE_SNIPPET = `import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {

    private static final int WORK_FACTOR = 12;

    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(WORK_FACTOR));
    }

    public static boolean verifyPassword(String password, String hashed) {
        return BCrypt.checkpw(password, hashed);
    }
}`
