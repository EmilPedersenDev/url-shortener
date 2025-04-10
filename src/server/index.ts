import express, { Request, Response } from 'express';
import cors from 'cors';
import urlRouter from './routes/url.route';
import 'dotenv/config';
import ErrorHandler from './middleware/error-handler';
import path from 'node:path';

const app = express();
const port = process.env.PORT;

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders:
    'Content-Type,Authorization,X-Amz-Date,X-Amz-Security-Token,X-Amz-Content-Sha256,X-Amz-Target,X-Api-Key,X-Amz-User-Agent,Host',
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '..', 'client')));

// Client routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Api routes
const router = express.Router();
router.use(urlRouter);
app.use('/v1', router);

app.use(ErrorHandler.handleError);
process.on('uncaughtException', ErrorHandler.handleUncaughtError);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
