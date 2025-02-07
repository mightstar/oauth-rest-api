import { Router } from 'express';
import oauthController from '../controllers/oauth.controller';

const router = Router();

router.get('/authorize', oauthController.authorize);
router.post('/token', oauthController.token);

export default router;