declare module '@capacitor/core' {
    interface PluginRegistry {
        UsercentricsCmp: UsercentricsCmpPlugin;
    }
}
export interface UsercentricsBaseVendor {
    id: string;
    label: string;
}
export interface UsercentricsVendor extends UsercentricsBaseVendor {
    categoryId: string;
    subVendors: UsercentricsBaseVendor[];
}
export interface UsercentricsConsents {
    acceptedVendors: UsercentricsVendor[];
}
export interface UsercentricsOptions {
    predefinedUI: boolean;
    defaultLanguage?: string;
    controllerID?: string;
    version?: string;
    debugMode?: boolean;
    timeoutMillis?: number;
    noCache?: boolean;
}
export interface UsercentricsCmpPlugin {
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
