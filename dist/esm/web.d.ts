import { WebPlugin } from '@capacitor/core';
import { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';
export declare class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
    constructor();
    getConsents(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    updateConsents(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    resetConsents(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
}
declare const UsercentricsCmpInstance: UsercentricsCmpWeb;
export { UsercentricsCmpInstance };
