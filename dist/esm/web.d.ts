import { WebPlugin } from '@capacitor/core';
export declare class UsercentricsCmpWeb extends WebPlugin {
    init(options: {
        settingsId: string;
        language: string;
    }): Promise<unknown>;
    update(_options: {
        language: string;
    }): Promise<null>;
    reset(): Promise<null>;
    private getMappedVendors;
}
