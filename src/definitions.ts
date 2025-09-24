
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
  init(options: { settingsId: string, language: string }): Promise<UsercentricsConsents>;
  update(options: { language: string }): Promise<UsercentricsConsents | null>;
  reset(): Promise<UsercentricsConsents | null>;
}


// interfaces for web plugin
//

export interface UsercentricsBaseService {
  categorySlug: string;
  consent: {
    history: any[];
    status: boolean;
  };
  id: string;
  isEssential: boolean;
  name: string;
  subServices: any[];
  version: string;
}

// make the Usercentrics API available on the window object for TypeScript
declare global {
  interface Window {
    UC_UI?: any;
  }
}
