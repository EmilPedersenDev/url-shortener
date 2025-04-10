import crypto from 'crypto';
import UrlModel from '../models/url.model';

class UrlHashService {
  private urlModel: UrlModel;
  private hashRetries: number = 5;
  constructor(urlModel: UrlModel) {
    this.urlModel = urlModel;
  }
  public async createUrlHash(originalUrl: string): Promise<string> {
    if (this.hashRetries < 1) {
      throw new Error('Too many url hash retries');
    }
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex').slice(0, 8);
    const { exists: existingHash }: { exists: boolean } = await this.urlModel.existingUrlHash(hash);
    if (existingHash) {
      this.hashRetries -= 1;
      return await this.createUrlHash(originalUrl);
    }
    return hash;
  }
}

export default UrlHashService;
