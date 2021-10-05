import { WebPlugin } from '@capacitor/core';

import type { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';

const MOCK_CONSENTS = {
    acceptedVendors: [
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
            'id': 'H1Vl5NidjWX',
            'label': 'Usercentrics Consent Management Platform',
            'categoryId': 'essential',
            'subVendors': [],
        },
    ],
};

export class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
  async init(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`get consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);
  }

  async update(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`update consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');


    return Promise.resolve(MOCK_CONSENTS);
  }
  async reset(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`reset consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);

  }
}


