import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GitHubUser {
  public_repos: number;
  followers: number;
  login: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

interface GitHubOrg {
  login: string;
  avatar_url: string;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  orgs: GitHubOrg[];
  events: GitHubEvent[];
}

const fetchGitHubData = async (username: string): Promise<GitHubData> => {
  if (!username) {
    throw new Error("GitHub username is required");
  }

  const [userResponse, reposResponse, orgsResponse, eventsResponse] =
    await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
      axios.get(`https://api.github.com/users/${username}/orgs`),
      axios.get(`https://api.github.com/users/${username}/events`),
    ]);

  return {
    user: userResponse.data,
    repos: reposResponse.data,
    orgs: orgsResponse.data,
    events: eventsResponse.data,
  };
};

export default fetchGitHubData;

// Instagram data
// const fetchInstagramData = async (username: string) => {
//   const accessToken = "YOUR_VALID_INSTAGRAM_ACCESS_TOKEN"; // Replace with actual token
//   if (!username) {
//     throw new Error("Instagram username is required");
//   }
//   const url = `https://graph.instagram.com/me?fields=id,username,media_count,followers_count&access_token=${accessToken}`;
//   const { data } = await axios.get(url);
//   return data;
// };

// Custom hook to fetch social media data
export const useSocialMediaData = (usernames: { github?: string; instagram?: string }) => {
  const githubQuery = useQuery({
    queryKey: ["github", usernames.github],
    queryFn: () =>
      usernames.github
        ? fetchGitHubData(usernames.github)
        : Promise.reject("GitHub username missing"),
    enabled: !!usernames.github,
  });

//   const instagramQuery = useQuery({
//     queryKey: ["instagram", usernames.instagram],
//     queryFn: () => usernames.instagram ? fetchInstagramData(usernames.instagram) : Promise.reject("Instagram username missing"),
//     enabled: !!usernames.instagram,
//   });

  return { githubQuery,  };
};
