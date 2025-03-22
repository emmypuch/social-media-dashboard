export type Platform = "github" | "youtube" | "gitlab";

export interface GitHubData {
  themeObject: {
    cardBackground?: string;
    color: string;
  };
  user: {
    public_repos?: number;
    followers?: number;
  };
  repos: {
    name: string;
    stargazers_count: number;
    forks_count: number;
  }[];
  orgs: {
    login: string;
    avatar_url: string;
  }[];
  events: {
    type: string;
    repo: {
      name: string;
    };
    created_at: string;
  }[];
}
