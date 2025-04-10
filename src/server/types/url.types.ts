export interface originalUrl {
  originalUrl: string;
}

export interface UrlData {
  id: string;
  hash: string;
  original_url: string;
  expiration: string | null;
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
