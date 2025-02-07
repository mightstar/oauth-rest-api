import request from 'supertest';
import app from '../../src/app';

describe('OAuth Endpoints', () => {
  it('should redirect with code and state', async () => {
    const res = await request(app)
      .get('/api/oauth/authorize?response_type=code&client_id=upfirst&redirect_uri=http://localhost:8081/process&state=123')
      .expect(302);

    expect(res.header.location).toMatch(/http:\/\/localhost:8081\/process\?code=.+&state=123/);
  });

  it('should return tokens for valid code', async () => {
    const res = await request(app)
      .post('/api/oauth/token')
      .send({
        grant_type: 'authorization_code',
        code: 'valid_code',
        client_id: 'upfirst',
        redirect_uri: 'http://localhost:8081/process',
      })
      .expect(200);

    expect(res.body).toHaveProperty('access_token');
    expect(res.body).toHaveProperty('refresh_token');
  });
});