import { Driver } from './driver.type';

export class SiteParams {
  mobile: boolean;
  driver: Driver
  constructor(params: Partial<SiteParams>) {
    this.mobile = params?.mobile ?? false;
    this.driver = params?.driver ?? 'playwright';
  }

  isMobile() {
    return this.mobile;
  }
}
