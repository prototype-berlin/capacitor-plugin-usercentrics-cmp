import { registerPlugin } from '@capacitor/core';
const UsercentricsCmp = registerPlugin('UsercentricsCmp', {
    web: () => import('./web').then(m => new m.UsercentricsCmpWeb()),
});
export * from './definitions';
export { UsercentricsCmp };
//# sourceMappingURL=index.js.map