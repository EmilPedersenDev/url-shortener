import express, { Router } from 'express';
import tryCatch from '../common/try-catch';
import urlController from '../controllers/url.controller';
import { createShortUrlValidator, getOriginalUrlValidator, validate } from '../middleware/validator';

const urlRouter: Router = express.Router({ mergeParams: true });

urlRouter.route('/').post(createShortUrlValidator, validate, tryCatch(urlController.createShortUrl));
urlRouter.route('/:hash').get(getOriginalUrlValidator, validate, tryCatch(urlController.getOriginalUrl));

export default urlRouter;
