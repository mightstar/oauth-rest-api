import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import oauthRoutes from './routes/oauth.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/oauth', oauthRoutes);

// Error handling
app.use(errorMiddleware);

export default app;