declare module '@capacitor/core' {
  interface PluginRegistry {
    UsercentricsCmp: UsercentricsCmpPlugin;
  }
}

export interface UsercentricsCategory {
  id: string;
  label: string;
  isEssential: boolean;
}

export interface UsercentricsBaseVendor {
  id: string;
  label: string;
}

export interface UsercentricsVendor extends UsercentricsBaseVendor {
  categoryId: string;
  isEssential: boolean;
  subVendors?: UsercentricsBaseVendor[];
}

export interface UsercentricsConsents {
  acceptedCategories: UsercentricsCategory[];
  acceptedVendors: UsercentricsVendor[];
}

// currently not used / hard coded in android and ios plugin
export interface UsercentricsOptions {
  defaultLanguage: string;
  predefinedUI: boolean;
  controllerID?: string;
  version?: string;
  debugMode?: boolean;
  timeoutMillis?: number;
  noCache?: boolean;
}

export interface UsercentricsCmpPlugin {
  getConsents(options: { settingsId: string }): Promise<UsercentricsConsents>;
  updateConsents(options: { settingsId: string }): Promise<UsercentricsConsents>;
  reset(options: { settingsId: string }): Promise<void>;
}
