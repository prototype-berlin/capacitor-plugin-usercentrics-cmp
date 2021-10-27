import { WebPlugin } from '@capacitor/core';
import type { UsercentricsCmpPlugin, UsercentricsConsents } from './definitions';
export declare class UsercentricsCmpWeb extends WebPlugin implements UsercentricsCmpPlugin {
    init(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    update(): Promise<UsercentricsConsents>;
    reset(): Promise<UsercentricsConsents>;
}
