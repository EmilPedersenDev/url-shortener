import UrlModel from '../models/url.model';
import { UrlKeyServiceResponse } from '../types/url.types';
import { BaseError } from '../common/errors';
import { HASH_RETRIES } from '../common/constants';

class UrlHashService {
  private urlModel: UrlModel;
  private hashRetries: number = HASH_RETRIES;
  constructor(urlModel: UrlModel) {
    this.urlModel = urlModel;
  }

  public async createUrlHash(originalUrl: string): Promise<string> {
    if (this.hashRetries < 1) {
      throw new BaseError('Too many url hash retries.');
    }

    let hash;
    try {
      const response = await fetch(String(process.env.URL_KEY_SERVICE_URL), {
        method: 'GET',
      });
      const json = (await response.json()) as Partial<UrlKeyServiceResponse>;
      hash = json?.hash;

      if (!hash) {
        this.hashRetries -= 1;
        return this.createUrlHash(originalUrl);
      }
    } catch (_e) {
      this.hashRetries -= 1;
      return this.createUrlHash(originalUrl);
    }

    const { exists: existingHash }: { exists: boolean } = await this.urlModel.existingUrlHash(hash);
    if (existingHash) {
      this.hashRetries -= 1;
      return await this.createUrlHash(originalUrl);
    }
    return hash;
  }
}

export default UrlHashService;
