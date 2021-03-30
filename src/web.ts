import { WebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsOptions, UsercentricsPermissions } from './definitions';

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

  public async getPermissions(options: { settingsId: string }): Promise<UsercentricsPermissions> {
    console.log(`get permissions for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web. Permissions are mocked');

    return Promise.resolve(MOCK_PERMISSIONS);
  }

  public async setPermissions(options: { settingsId: string; permissions: UsercentricsPermissions; userOptions?: UsercentricsOptions }): Promise<void> {
    console.log(`set permissions for ${options.settingsId}`, options.permissions);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve();
  }

  public async reset(options: { settingsId: string }): Promise<void> {
    console.log(`reset permissions for ${options.settingsId}`);
    console.error('Usercentrics plugin not implemented for web.');

    return Promise.resolve();
  }
}

const UsercentricsCmp = new UsercentricsCmpWeb();

export { UsercentricsCmp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(UsercentricsCmp);
