import UrlModel from '../models/url.model';
import UrlService from './url.service';
import UrlHashService from './url-hash.service';

export const getUrlService = () => {
  const urlModel = new UrlModel();
  const urlHashService = new UrlHashService(urlModel);
  return new UrlService(urlModel, urlHashService);
};
