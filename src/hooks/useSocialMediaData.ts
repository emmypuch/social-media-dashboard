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
  monthlyGrowth: { month: string; followers: number }[]; 
}

interface YouTubeChannelStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

interface RedditUserStats {
  totalKarma: number;
  postKarma: number;
  commentKarma: number;
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

const fetchRedditData = async (username: string): Promise<RedditUserStats> => {
  const url = `https://www.reddit.com/user/${username}/about.json`;
  const response = await axios.get(url);

  const data = response.data.data;
  return {
    totalKarma: data.total_karma,
    postKarma: data.link_karma,
    commentKarma: data.comment_karma,
  };
};

// Custom hook to fetch social media data
export const useSocialMediaData = (usernames: { github?: string; youtube?: string, reddit?: string }) => {
   const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY; 
  const youtubeChannelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

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

   // Reddit Query
   const redditQuery = useQuery({
    queryKey: ["reddit", usernames.reddit],
    queryFn: () =>
      usernames.reddit
        ? fetchRedditData(usernames.reddit)
        : Promise.reject("Reddit username missing"),
    enabled: !!usernames.reddit,
  });

  return { githubQuery, youtubeQuery, redditQuery };
};
