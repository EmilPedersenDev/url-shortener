import { Request, Response } from 'express';
import UrlService from '../services/url.service';
import { getUrlService } from '../services/service.factory';
import HttpStatus from 'http-status';

class UrlController {
  constructor() {}

  public static async createShortUrl(req: Request, res: Response): Promise<Response<{ hash: string }>> {
    const urlService: UrlService = getUrlService();
    const shortUrlHash = await urlService.createShortUrl(req.body.originalUrl as string);
    return res.status(HttpStatus.CREATED).json({ hash: shortUrlHash });
  }

  public static async getOriginalUrl(req: Request, res: Response): Promise<void> {
    const urlService: UrlService = getUrlService();
    const originalUrl = await urlService.getOriginalUrl(req.params.hash as string);
    return res.redirect(HttpStatus.MOVED_PERMANENTLY, originalUrl);
  }
}

export default UrlController;
