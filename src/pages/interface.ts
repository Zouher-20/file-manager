export interface fileInterface {
  files: Array<fileInterface["file"]>;
  file: { id: number; name: string; state: string; date: string };

  folders: Array<fileInterface["folder"]>;
  folder: { id: number; name: string; files: string; date: string };

  users: Array<fileInterface["user"]>;
  user: { name: string; id: number; email: string };

  table: {
    rows: Array<string>;
    cols: fileInterface["files"] | fileInterface["folders"];
  };
}
