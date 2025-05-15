import UrlModel from '../models/url.model';
import UrlService from './url.service';
import UrlKeyService from './url-key.service';
import CacheService from './cache.service';

export const getUrlService = () => {
  const urlModel = new UrlModel();
  const cacheService = new CacheService();
  const urlHashService = new UrlKeyService(urlModel);
  return new UrlService(urlModel, urlHashService, cacheService);
};
