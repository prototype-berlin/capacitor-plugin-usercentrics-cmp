import { WebPlugin } from '@capacitor/core';
export declare class UsercentricsCmpWeb extends WebPlugin {
    init(options: {
        settingsId: string;
        language: string;
    }): Promise<unknown>;
    update(options: {
        language: string;
    }): Promise<{
        vendors: ({
            status: boolean;
            type: null;
            version: string;
            id: string;
            label: string;
        } | {
            status: boolean;
            type: string;
            version: string;
            id: string;
            label: string;
        })[];
    }>;
    reset(): Promise<{
        vendors: ({
            status: boolean;
            type: null;
            version: string;
            id: string;
            label: string;
        } | {
            status: boolean;
            type: string;
            version: string;
            id: string;
            label: string;
        })[];
    }>;
}
