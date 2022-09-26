import { Page } from 'playwright';
import { WebDriver } from 'selenium-webdriver';
import { PageDriver } from './page-driver';
import { SiteParams } from './site-params';

export class Site {
  page?: Page | WebDriver;
  private pageDriver: PageDriver;

  constructor(public params: SiteParams) {
    this.pageDriver = new PageDriver(params.driver);
  }

  async create(): Promise<void> {
    this.page = await this.pageDriver.create();
  }

  async close() {
    await this.pageDriver.close();
  }
}
