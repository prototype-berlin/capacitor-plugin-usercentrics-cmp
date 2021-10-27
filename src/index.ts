import { registerPlugin } from '@capacitor/core';

import type { UsercentricsCmpPlugin } from './definitions';

const UsercentricsCmp = registerPlugin<UsercentricsCmpPlugin>('UsercentricsCmp', {
  web: () => import('./web').then(m => new m.UsercentricsCmpWeb()),
});

export * from './definitions';
export { UsercentricsCmp };
