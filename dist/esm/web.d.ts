import { WebPlugin } from '@capacitor/core';
import type { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';
export declare class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
    init(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    update(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    reset(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
}
