import { WebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsPermissions } from './definitions';

const MOCK_PERMISSIONS: UsercentricsPermissions = {
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

  public async getPermissions(settingsId: string): Promise<UsercentricsPermissions> {
    console.log(`get permissions for ${settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Permissions are mocked');
    console.info('mocked permissions fo:', MOCK_PERMISSIONS);

    return Promise.resolve(MOCK_PERMISSIONS);
  }

  public async setPermissions(settingsId: string, permissions: UsercentricsPermissions): Promise<void> {
    console.log(`set permissions for ${settingsId}`, permissions);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve();
  }

  public async reset(settingsId: string): Promise<void> {
    console.log(`reset permissions for ${settingsId}`);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve();
  }
}

const UsercentricsCmp = new UsercentricsCmpWeb();

export { UsercentricsCmp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(UsercentricsCmp);
