import { WebPlugin, registerWebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';

const MOCK_CONSENTS: UsercentricsConsents = {
  acceptedVendors: [
    {
      'id': 'Afk_Nife_',
      'label': 'Adjust',
      'categoryId': 'marketing',
      'subVendors': [],
    },
    {
      'id': 'MbHgRDHhR',
      'label': 'Firebase (ohne Analysefunktion)',
      'categoryId': 'essential',
      'subVendors': [],
    },
    {
      'id': 'yBaAnQfrt',
      'label': 'Google Firebase',
      'categoryId': 'marketing',
      'subVendors': [],
    },
    {
      'id': '5bG1RVWaN',
      'label': 'The Adex',
      'categoryId': 'marketing',
      'subVendors': [],
    },
    {
      'id': 'H1Vl5NidjWX',
      'label': 'Usercentrics Consent Management Platform',
      'categoryId': 'essential',
      'subVendors': [],
    },
  ],
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
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);
  }

  public async updateConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`update consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);
  }

  public async resetConsents(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`reset consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);
  }
}

const UsercentricsCmpInstance = new UsercentricsCmpWeb();

export { UsercentricsCmpInstance };

registerWebPlugin(UsercentricsCmpInstance);
