import { Page } from 'playwright';
import { Browser, BrowserContext } from 'playwright-core';

export type PlayrightContexts = { browser: Browser, context: BrowserContext, page: Page };
