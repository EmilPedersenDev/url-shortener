import express from 'express';
import cors from 'cors';
import urlRouter from './routes/url.route';
import 'dotenv/config';
import ErrorHandler from './middleware/error-handler';
import path from 'node:path';
import { rateLimit } from 'express-rate-limit';
import { RATE_LIMIT_THRESHOLD } from './common/constants';
import { connectDB } from './common/config/mongo-db-client';
import RabbitMqService from './services/rabbit-mq.service';
import { assertQueue, connectRabbitMQ } from './common/config/rabbit-mq-client';

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
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_THRESHOLD ?? RATE_LIMIT_THRESHOLD),
  message: 'Too many requests, please try again later.',
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
app.use(limiter);
app.use(express.static(path.join(__dirname, '..', 'client')));

// Client routes
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Api routes
const router = express.Router();
router.use(urlRouter);
app.use('/v1', router);

app.use(ErrorHandler.handleError);
process.on('uncaughtException', ErrorHandler.handleUncaughtError);

start().then(() => {
  console.log('running...');
});

async function start(): Promise<void> {
  await connectDB();
  await connectRabbitMQ();
  await assertQueue(RabbitMqService.RABBIT_QUEUE_NAME);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
