export interface Repository {
  id: number;
  description: string;
  html_url: string;
  languages_url: string;
  name: string;
  stargazers_count: number;
  stargazers_url: string;
  updated_at: string;
}

export interface Languages {
  [key: string]: number
}