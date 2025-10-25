declare module '@dmtools' {
  import { UploadCloud } from 'lucide-react';

  export interface iRepoGet {
    type: "dir" | "file" | "submodule" | "symlink";
    size: number;
    name: string;
    path: string;
    content?: string;
    sha: string;
    url: string;
    git_url: string | null;
    html_url: string | null;
    download_url: string | null;
    _links: {
      git: string | null;
      html: string | null;
      self: string;
    };
  }

  export type iKitServices = {
    services: {
      key: string,
      name: string,
      IconNode: typeof UploadCloud
    }[],
    selected: string | number,
    setSelected: (key: string | number) => void
  }
}
