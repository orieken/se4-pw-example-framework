import { Site } from '../../lib/site';
import { SiteParams } from '../../lib/site-params';

jest.setTimeout(30000);
describe('Simple spec that changes based on driver', () => {
  it('creates a playwright page', async () =>  {
    const site = new Site(new SiteParams({ driver: 'playwright' }));
    await site.create();

    await site.close();
  });

  it('creates a webdriver page', async () =>  {
    const site = new Site(new SiteParams({ driver: 'webdriver' }));
    await site.create();

    await site.close();
  });

});
