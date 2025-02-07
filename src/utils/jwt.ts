import { SignJWT } from 'jose';
import config from '../config';

const secret = new TextEncoder().encode(config.JWT_SECRET);

export const generateAuthCode = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const generateTokens = async () => {
  const accessToken = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  const refreshToken = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'Bearer',
    expires_in: 3600, // 1 hour in seconds
  };
};