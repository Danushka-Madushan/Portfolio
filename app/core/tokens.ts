import { ENV, userAgent } from '@/app/constant/config';
import { SignJWT } from 'jose';

const jwtSecret = new TextEncoder().encode(ENV.JWT_SECRET);

interface JWTPayload {
  raw_link: string,
  sha: string
}

export const SignRequest = async (payload: JWTPayload): Promise<string> => {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })   /* Set algorithm */
    .setIssuedAt()                          /* Set issued at time */
    .setExpirationTime('40s')               /* Expires in 40 seconds */
    .setIssuer(userAgent)                   /* Token issuer */
    .sign(jwtSecret);                       /* Sign with secret */

  return token;
}
