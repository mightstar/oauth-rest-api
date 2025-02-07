import oauthService from '../../src/services/oauth.service';

describe('OAuthService', () => {
  describe('validateClient', () => {
    it('should return true for valid client', () => {
      const isValid = oauthService.validateClient('upfirst', 'http://localhost:8081/process');
      expect(isValid).toBe(true);
    });

    it('should return false for invalid client', () => {
      const isValid = oauthService.validateClient('invalid', 'http://invalid.com');
      expect(isValid).toBe(false);
    });
  });

  describe('authorize', () => {
    it('should throw error for unsupported response_type', async () => {
      await expect(oauthService.authorize('invalid')).rejects.toThrow('unsupported_response_type');
    });
  });

  describe('token', () => {
    it('should throw error for unsupported grant_type', async () => {
      await expect(oauthService.token('invalid', 'code')).rejects.toThrow('unsupported_grant_type');
    });
  });
});