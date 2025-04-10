import UrlModel from '../models/url.model';
import UrlHashService from './url-hash.service';
import { OriginalUrlResponse, UrlData, UrlResponse } from '../types/url.types';
import { NotFoundError } from '../common/errors';

class UrlService {
  private readonly urlModel: UrlModel;
  private readonly urlHashService: UrlHashService;
  constructor(urlModel: UrlModel, urlHashService: UrlHashService) {
    this.urlModel = urlModel;
    this.urlHashService = urlHashService;
  }

  public async createShortUrl(originalUrl: string): Promise<UrlResponse> {
    const existingUrl: UrlData = await this.urlModel.existingUrl(originalUrl);
    if (existingUrl) {
      return {
        hash: existingUrl.hash,
        originalUrl: existingUrl.original_url,
      };
    }
    const urlHash: string = await this.urlHashService.createUrlHash(originalUrl);
    const shortUrl: UrlData = await this.urlModel.createShortUrl(originalUrl, urlHash);
    return {
      hash: shortUrl.hash,
      originalUrl: shortUrl.original_url,
    };
  }

  public async getOriginalUrl(hash: string): Promise<string> {
    const { originalUrl }: OriginalUrlResponse = await this.urlModel.getOriginalUrlByHash(hash);
    if (!originalUrl) {
      throw new NotFoundError('No original URL found for the given hash.');
    }
    return originalUrl;
  }
}

export default UrlService;
