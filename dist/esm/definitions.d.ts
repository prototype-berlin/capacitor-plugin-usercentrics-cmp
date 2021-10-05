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
