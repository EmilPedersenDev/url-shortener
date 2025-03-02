import express, { Request, Response } from 'express';
import cors from 'cors';
import urlRouter from "./routes/url.route";

const app = express();
const port = 3000;

app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders:
        'Content-Type,Authorization,X-Amz-Date,X-Amz-Security-Token,X-Amz-Content-Sha256,X-Amz-Target,X-Api-Key,X-Amz-User-Agent,Host',
};
app.use(cors(corsOptions));

// Routes
const router = express.Router();
router.use(urlRouter)
app.use('/v1', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
