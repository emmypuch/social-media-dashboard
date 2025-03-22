import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  GitHubData,
  YouTubeChannelStats,
  GitLabData,
} from "../interfaces/interface";

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

     const monthlyGrowth = [
    { month: "Jan", followers: 100 },
    { month: "Feb", followers: 150 },
    { month: "Mar", followers: 200 },
    { month: "Apr", followers: 300 },
    { month: "May", followers: 400 },
    { month: "Jun", followers: 500 },
  ];

  return {
    user: userResponse.data,
    repos: reposResponse.data,
    orgs: orgsResponse.data,
    events: eventsResponse.data,
    monthlyGrowth,
  };
};

export default fetchGitHubData;

// Fetch YouTube Data Function
const fetchYouTubeData = async (channelId: string, apiKey: string): Promise<YouTubeChannelStats> => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
  const response = await axios.get(url);

  const stats = response.data.items[0].statistics;
  return {
    subscriberCount: parseInt(stats.subscriberCount),
    viewCount: parseInt(stats.viewCount),
    videoCount: parseInt(stats.videoCount),
  };
};

const fetchGitLabData = async (username: string, accessToken: string): Promise<GitLabData> => {
  if (!username || !accessToken) {
    throw new Error("GitLab username and access token are required");
  }

  const [userResponse, projectsResponse] = await Promise.all([
    axios.get(`https://gitlab.com/api/v4/users?username=${username}`, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    }),
    axios.get(`https://gitlab.com/api/v4/users/${username}/projects`, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    }),
  ]);

  return {
    user: userResponse.data[0],
    projects: projectsResponse.data,
  };
};

// Custom hook to fetch social media data
export const useSocialMediaData = (usernames: { github?: string; youtube?: string, reddit?: string, gitlab?: string }) => {
   const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY; 
  const youtubeChannelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
   const gitlabAccessToken = import.meta.env.VITE_GITLAB_ACCESS_TOKEN;

   // GitHub Query
  const githubQuery = useQuery({
    queryKey: ["github", usernames.github],
    queryFn: () =>
      usernames.github
        ? fetchGitHubData(usernames.github)
        : Promise.reject("GitHub username missing"),
    enabled: !!usernames.github,
  });

  // YouTube Query
  const youtubeQuery = useQuery({
    queryKey: ["youtube", usernames.youtube],
    queryFn: () =>
      usernames.youtube
        ? fetchYouTubeData(youtubeChannelId, youtubeApiKey) 
        : Promise.reject("YouTube channel ID missing"),
    enabled: !!usernames.youtube,
  });

  // GitLab Query
  const gitlabQuery = useQuery({
    queryKey: ["gitlab", usernames.gitlab],
    queryFn: () =>
      usernames.gitlab
        ? fetchGitLabData(usernames.gitlab, gitlabAccessToken)
        : Promise.reject("GitLab username missing"),
    enabled: !!usernames.gitlab,
  });

  return { githubQuery, youtubeQuery, gitlabQuery };
};
