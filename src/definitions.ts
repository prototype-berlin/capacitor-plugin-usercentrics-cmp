declare module '@capacitor/core' {
  interface PluginRegistry {
    UsercentricsCmp: UsercentricsCmpPlugin;
  }
}
export interface UsercentricsPermissions {
  acceptedVendors: string[];
  acceptedCategories: string[];
}

export interface UsercentricsOptions {
  controllerID: string;
  defaultLanguage: string;
  version: string;
  debugMode: boolean;
  predefinedUI: boolean;
  timeoutMillis: number;
  noCache: boolean;
}

export interface UsercentricsCmpPlugin {
  getPermissions(options: { settingsId: string }): Promise<UsercentricsPermissions>;
  setPermissions(options: { settingsId: string; permissions: UsercentricsPermissions; userOptions?: UsercentricsOptions }): Promise<void>;
  reset(options: { settingsId: string }): Promise<void>;
}
