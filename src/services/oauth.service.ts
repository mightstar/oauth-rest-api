import { generateAuthCode, generateTokens } from '../utils/jwt';
import config from '../config/index';

class OAuthService {
  validateClient(clientId: string, redirectUri: string): boolean {
    return clientId === config.CLIENT_ID && redirectUri === config.REDIRECT_URI;
  }

  async authorize(responseType: string, state?: string) {
    if (responseType !== 'code') {
      throw new Error('unsupported_response_type');
    }

    const authCode = generateAuthCode();
    return { authCode, state };
  }

  async token(grantType: string, code: string) {
    if (grantType !== 'authorization_code') {
      throw new Error('unsupported_grant_type');
    }

    if (!code) {
      throw new Error('invalid_code');
    }

    return generateTokens();
  }
}

export default new OAuthService();