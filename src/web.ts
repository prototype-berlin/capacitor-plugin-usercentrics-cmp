import { WebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin } from './definitions';

export class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
  constructor() {
    super({
      name: 'UsercentricsCmp',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const UsercentricsCmp = new UsercentricsCmpWeb();

export { UsercentricsCmp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(UsercentricsCmp);
