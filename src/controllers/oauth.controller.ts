import { Request, Response } from 'express';
import oauthService from '../services/oauth.service';

const oauthController = {
  async authorize(req: Request, res: Response): Promise<void> {
    const { response_type, client_id, redirect_uri, state } = req.query;

    if (!oauthService.validateClient(client_id as string, redirect_uri as string)) {
      res.status(400).json({ error: 'invalid_client' });
      return;
    }

    try {
      const { authCode, state: responseState } = await oauthService.authorize(
        response_type as string,
        state as string
      );

      const redirectUrl = `${redirect_uri}?code=${authCode}${
        responseState ? `&state=${responseState}` : ''
      }`;

      res.redirect(redirectUrl);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async token(req: Request, res: Response): Promise<void> {
    const { grant_type, code, client_id, redirect_uri } = req.body;

    if (!oauthService.validateClient(client_id, redirect_uri)) {
      res.status(400).json({ error: 'invalid_client' });
      return;
    }

    try {
      const tokens = await oauthService.token(grant_type, code);
      res.json(tokens);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default oauthController;