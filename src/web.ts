import { WebPlugin } from '@capacitor/core';

import type { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';

const MOCK_CONSENTS = {
    vendors: [
        {
            'status': true,     
            'type': null,
            'version': '1.0',
            'id': 'uNl9XGnZC',
            'label': 'Google Firebase',
        },
        {
            'status': false,     
            'type': 'test',
            'version': '1.0',
            'id': 'S1pcEj_jZX',
            'label': 'Google Maps',
        },
        {
            'status': true,     
            'type': 'explicit',
            'version': '1.0',
            'id': 'H1Vl5NidjWX',
            'label': 'Usercentrics Consent Management Platform',
        },
    ],
};

export class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
  async init(options: { settingsId: string }): Promise<UsercentricsConsents> {
    console.log(`get consents for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);
  }

  async update(): Promise<UsercentricsConsents> {
    console.log(`update consents`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');


    return Promise.resolve(MOCK_CONSENTS);
  }
  async reset(): Promise<UsercentricsConsents> {
    console.log(`reset consents`);
    console.error('Usercentrics plugin not implemented for web. Mock state "accept all vendors"');

    return Promise.resolve(MOCK_CONSENTS);

  }
}


