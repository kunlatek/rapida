export interface AppInterface {
  name: string;
  db: string;
  url: string;
  icon?: string;
  iconPath?: string;
  permissionEnabled?: boolean; // In invitation flow, it will be possible to give permission to this app from parent app
}