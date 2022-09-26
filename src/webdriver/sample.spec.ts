import { join } from 'path';
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/chrome';

jest.setTimeout(30000);

let driver: WebDriver;
let service: ServiceBuilder;
describe('Simple webdriver test', () => {
  beforeAll(() => {
    service = new ServiceBuilder(join(__dirname, '..', '..', 'drivers', 'chromedriver'));
  });

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').setChromeService(service).build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should open google', async () => {
    await driver.get('http://www.google.com');
    expect(await driver.getTitle()).toEqual('Google');
  });
});

jest.setTimeout(60000);

describe('Simple webdriver test on Grid', () => {
  it('should open google', async () => {
    const capabilities: Capabilities = new Capabilities(
      { browserName: 'chrome' }
    );

    driver = await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(capabilities).build();
    await driver.get('http://www.google.com');
    expect(await driver.getTitle()).toEqual('Google');
  })
})

describe('Simple webdriver test on appium Grid', () => {
  it('should open google', async () => {
    const capabilities: Capabilities = new Capabilities(
      // { browserName: 'chrome' }
      // selenium grid object for ios
      {
        "browserName": "safari",
        "platformName": "iOS",
        "platformVersion": "14.4",
        "deviceName": "iPhone 12 Pro Max",
        "automationName": "XCUITest",
      }

    );

    driver = await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(capabilities).build();
    await driver.get('http://www.google.com');
    expect(await driver.getTitle()).toEqual('Google');
  })
})
