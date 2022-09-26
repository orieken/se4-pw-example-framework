import { join } from 'path';
import { chromium, Page } from 'playwright';
import { Builder, WebDriver } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/chrome';
import { Driver } from './driver.type';
import { PlayrightContexts } from './playwright-contexts.type';
import { WebDriverContexts } from './webdriver-contexts.type';

export class PageDriver {
  name: Driver;
  private playwrightContexts: PlayrightContexts = {} as PlayrightContexts;
  private webdriverContexts: WebDriverContexts = {} as WebDriverContexts;

  constructor(name: Driver) {
    this.name = name;
  }

  async create(): Promise<Page | WebDriver> {
    const pageDrivers: Record<Driver, () => Promise<Page | WebDriver>> = {
      playwright: async () => {
        const browser = await chromium.launch();
        this.playwrightContexts['browser'] = browser;
        const context = await browser.newContext();
        this.playwrightContexts['context'] = context;
        const page = await context.newPage();
        this.playwrightContexts['page'] = page
        return page
      },
      webdriver: async () => {
        const service = new ServiceBuilder(join(__dirname, '..', 'drivers', 'chromedriver'));
        const driver = await new Builder().forBrowser('chrome').setChromeService(service).build();
        this.webdriverContexts['driver'] = driver;
        return driver
      }
    }

    return pageDrivers[this.name]();
  }

  async close() {
    const pageDrivers: Record<Driver, () => Promise<void>> = {
      playwright: async () => {
        await this.playwrightContexts['page'].context().close()
        await this.playwrightContexts['context'].close();
        await this.playwrightContexts['browser'].close();
      },
      webdriver: async () => await this.webdriverContexts['driver'].quit(),
    }
    return pageDrivers[this.name]();
  }
}
