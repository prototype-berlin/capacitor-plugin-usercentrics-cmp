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
  getPermissions(settingsId: string): Promise<UsercentricsPermissions>;
  setPermissions(settingsId: string, permissions: UsercentricsPermissions, options?: UsercentricsOptions): Promise<void>;
  reset(settingsId: string): Promise<void>;
}
