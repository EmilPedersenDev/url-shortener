import express, { Router, Request, Response } from 'express';

const urlRouter: Router = express.Router({ mergeParams: true });

interface originalUrl {
    originalUrl: string;
}

urlRouter.get("/:urlKey", (req: Request, res: Response) => {
    return res.status(200).json({ originalUrl: req.originalUrl });
});

urlRouter.route("/").post((req: Request, res: Response) => {
    const body: originalUrl = req.body;
    return res.status(201).json({ shortUrl: body.originalUrl });
}).delete((req: Request, res: Response) => {
    return res.status(204).json({ message: 'short url deleted' })
})

export default urlRouter;
