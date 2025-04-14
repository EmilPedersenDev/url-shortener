import UrlModel from '../models/url.model';
import UrlService from './url.service';
import UrlHashService from './url-hash.service';
import CacheService from './cache.service';

export const getUrlService = () => {
  const urlModel = new UrlModel();
  const cacheService = new CacheService();
  const urlHashService = new UrlHashService(urlModel);
  return new UrlService(urlModel, urlHashService, cacheService);
};
