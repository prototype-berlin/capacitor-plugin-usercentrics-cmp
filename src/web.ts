import { WebPlugin, registerWebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';

const MOCK_CONSENTS: UsercentricsConsents = {
  acceptedVendors: [],
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
    console.error('Usercentrics plugin not implemented for web. Return empty array of accepted vendors');

    return Promise.resolve(MOCK_CONSENTS);
  }

  public async updateConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`update consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Return empty array of accepted vendors');

    return Promise.resolve(MOCK_CONSENTS);
  }

  public async resetConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`reset consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Return empty array of accepted vendors');

    return Promise.resolve(MOCK_CONSENTS);
  }
}

const UsercentricsCmpInstance = new UsercentricsCmpWeb();

export { UsercentricsCmpInstance };

registerWebPlugin(UsercentricsCmpInstance);
