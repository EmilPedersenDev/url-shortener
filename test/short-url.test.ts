import { expect } from 'chai';
import request from 'supertest';
import sinon, { SinonStub } from 'sinon';
import { app } from '../src/server';
import CacheService from '../src/server/services/cache.service';
import { setupDatabaseForUrlTests } from './config';
import UrlKeyService from '../src/server/services/url-key.service';


let cacheServiceGetStub: SinonStub;
let getUrlHashStub: SinonStub;
describe('Url shortener tests', () => {
  setupDatabaseForUrlTests()
  beforeEach(async() => {
    cacheServiceGetStub = sinon.stub(CacheService.prototype, 'get').resolves(null);
    getUrlHashStub = sinon.stub(UrlKeyService.prototype, 'getUrlHash').resolves('ztgseJwZ');
  })
  afterEach(() => {
    cacheServiceGetStub.restore();
    getUrlHashStub.restore();
  })

  it('should get the original url', async () => {
    const expectedLocation = 'https://google.se';
    const res = await request(app).get('/v1/4XXfe-0R');
    expect(res.status).to.equal(301);
    expect(res.headers.location).to.equal(expectedLocation);
  });

  it('should create a new short url', async () => {
    const res = await request(app).post('/v1').send({
      "originalUrl": "https://example.se"
    })
    expect(res.status).to.equal(201);
  });
});
