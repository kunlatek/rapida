export enum FileType {
  TEMPLATE = 'template',
  COMPONENT = 'component',
  SERVICE = 'service',
}
export interface FileTypeInterface {
  cliGenerateCommand: string,
  sufixFileType: string;
}

export const FileTypeConfig: { [key: string]: FileTypeInterface; } = {
  template: {
    cliGenerateCommand: 'c',
    sufixFileType: 'component.html',
  },
  component: {
    cliGenerateCommand: 'c',
    sufixFileType: 'component.ts',
  },
  service: {
    cliGenerateCommand: 's',
    sufixFileType: 'service.ts',
  }
};
