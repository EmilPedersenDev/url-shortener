import express, { Router } from 'express';
import tryCatch from '../common/try-catch';
import urlController from '../controllers/url.controller';

const urlRouter: Router = express.Router({ mergeParams: true });

urlRouter.route('/').post(tryCatch(urlController.createShortUrl));
urlRouter.route('/:hash').get(tryCatch(urlController.getOriginalUrl));

export default urlRouter;
