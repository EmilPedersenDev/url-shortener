import UrlModel from '../models/url.model';
import UrlHashService from './url-hash.service';
import { Url, UrlData, UrlResponse } from '../types/url.types';
import { NotFoundError } from '../common/errors';
import CacheService from './cache.service';

class UrlService {
  private readonly urlModel: UrlModel;
  private readonly urlHashService: UrlHashService;
  private readonly cacheService: CacheService;
  constructor(urlModel: UrlModel, urlHashService: UrlHashService, cacheService: CacheService) {
    this.urlModel = urlModel;
    this.urlHashService = urlHashService;
    this.cacheService = cacheService;
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
    await this.cacheService.set(shortUrl.hash, shortUrl.original_url);
    return {
      hash: shortUrl.hash,
      originalUrl: shortUrl.original_url,
    };
  }

  public async getOriginalUrl(hash: string): Promise<string> {
    const cachedOriginalUrl: string | undefined | null = await this.cacheService.get(hash);
    if (cachedOriginalUrl) {
      return cachedOriginalUrl;
    }
    const { hash: savedHash, originalUrl }: Url = await this.urlModel.getOriginalUrlByHash(hash);
    if (!originalUrl || !savedHash) {
      throw new NotFoundError('No original URL found for the given hash.');
    }
    await this.cacheService.set(savedHash, originalUrl);
    return originalUrl;
  }
}

export default UrlService;
