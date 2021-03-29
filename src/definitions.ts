declare module '@capacitor/core' {
  interface PluginRegistry {
    UsercentricsCmp: UsercentricsCmpPlugin;
  }
}

export interface UsercentricsCmpPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
