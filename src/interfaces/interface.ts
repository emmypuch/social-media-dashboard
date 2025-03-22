export interface GitHubUser {
  public_repos: number;
  followers: number;
  login: string;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubOrg {
  login: string;
  avatar_url: string;
}

export interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  orgs: GitHubOrg[];
  events: GitHubEvent[];
  monthlyGrowth: { month: string; followers: number }[];
}

export interface YouTubeChannelStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface GitLabUser {
  id: number;
  username: string;
  name: string;
  public_repos: number;
  followers: number;
}

export interface GitLabProject {
  id: number;
  name: string;
  star_count: number;
  forks_count: number;
}

export interface GitLabData {
  user: GitLabUser;
  projects: GitLabProject[];
}
