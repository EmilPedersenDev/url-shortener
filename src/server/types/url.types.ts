export interface originalUrl {
  originalUrl: string;
}

export interface UrlData {
  id: string;
  hash: string;
  original_url: string;
}

export interface Url {
  hash: string;
  originalUrl: string;
}

export interface SqlQueryResponse<T> {
  rowcount: number;
  rows: Array<T>;
}

export interface UrlResponse {
  hash: string;
  originalUrl: string;
}

export interface OriginalUrlResponse {
  originalUrl: string;
}

export interface UrlKeyServiceResponse {
  hash: string;
}
