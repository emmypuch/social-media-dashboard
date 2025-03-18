import React, { useState } from "react";
import styled from "styled-components";
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
// import GitHubStats from "../GitHubStats";
import { GitHubData } from "../../types/types";
// import YouTubeStats from "../YoutubeStats";

interface YouTubeData {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeObject?: any;
}

interface RedditData {
  totalKarma: number;
  postKarma: number;
  commentKarma: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeObject?: any;
}

type Platform = "github" | "twitter" | "linkedin" | "youtube" | "reddit";

interface SocialCardProps {
  platform: Platform;
  data: GitHubData | YouTubeData | RedditData;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  //   background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const CardContent = styled.div<{ $isExpanded: boolean }>`
  display: ${({ $isExpanded }) => ($isExpanded ? "block" : "none")};
  width: 100%;
`;

const SocialCard: React.FC<SocialCardProps> = ({ platform, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIcon = () => {
    switch (platform) {
      case "github":
        return <FaGithub />;
      case "twitter":
        return <FaTwitter />;
      case "linkedin":
        return <FaLinkedin />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    let content;
    if (platform === "github") {
      const githubData = data as GitHubData;
      content = (
        <>
          <p>Followers: {githubData.user?.followers}</p>
          <p>Repositories: {githubData.user?.public_repos}</p>
        </>
      );
    } else if (platform === "youtube") {
      const youtubeData = data as YouTubeData;
      content = (
        <>
          <p>Subscribers: {youtubeData.subscriberCount}</p>
          <p>Views: {youtubeData.viewCount}</p>
          <p>Videos: {youtubeData.videoCount}</p>
        </>
      );
    } else if (platform === "reddit") {
      const redditData = data as RedditData;
      content = (
        <>
          <p>Total Karma: {redditData.totalKarma}</p>
          <p>Post Karma: {redditData.postKarma}</p>
          <p>Comment Karma: {redditData.commentKarma}</p>
        </>
      );
    } else {
      content = <p>No data available for this platform.</p>;
    }

    return content;
  };

  return (
    <CardContainer onClick={handleClick} theme={data.themeObject}>
      <IconWrapper>{renderIcon()}</IconWrapper>
      <CardContent $isExpanded={isExpanded}>{renderContent()}</CardContent>
    </CardContainer>
  );
};

export default SocialCard;
