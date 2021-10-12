export interface UsercentricsVendor {
    status: boolean;
    id: string;
    type: any;
    version: string;
    label: string;
}
export interface UsercentricsConsents {
    vendors: UsercentricsVendor[];
}
export interface UsercentricsCmpPlugin {
    init(options: {
        settingsId: string;
    }): Promise<UsercentricsConsents>;
    update(): Promise<UsercentricsConsents>;
    reset(): Promise<UsercentricsConsents>;
}
