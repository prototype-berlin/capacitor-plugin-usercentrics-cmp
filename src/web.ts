import { WebPlugin, registerWebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';

const MOCK_PERMISSIONS: UsercentricsConsents = {
  acceptedVendors: [],
  acceptedCategories: [],
};

export class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
  constructor() {
    super({
      name: 'UsercentricsCmp',
      platforms: ['web'],
    });
  }

  public async getConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`get consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Permissions are mocked');

    return Promise.resolve(MOCK_PERMISSIONS);
  }

  public async updateConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`set consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve(MOCK_PERMISSIONS);
  }

  public async reset(options: { settingsId: string }): Promise<void> {
    console.log(`reset consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve();
  }
}

const UsercentricsCmpInstance = new UsercentricsCmpWeb();

export { UsercentricsCmpInstance };

registerWebPlugin(UsercentricsCmpInstance);
