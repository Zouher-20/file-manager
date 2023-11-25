export interface fileInterface {
  files: Array<fileInterface["file"]>;
  file: { id: number; name: string; state: string; date: string };

  folders: Array<fileInterface["folder"]>;
  folder: { id: number; name: string; state: string; date: string };
}
