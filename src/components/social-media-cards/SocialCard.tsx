import React, { useState } from "react";
import styled from "styled-components";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaGitlab,
} from "react-icons/fa";
import GitHubStats from "../GitHubStats";
import { GitHubData } from "../../types/types";
import YouTubeStats from "../YouTubeStats";
import GitLabStats from "../GitLabStats";

interface YouTubeData {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeObject?: any;
}

interface GitLabUser {
  id: number;
  username: string;
  name: string;
  public_repos: number;
  followers: number;
}

interface GitLabProject {
  id: number;
  name: string;
  star_count: number;
  forks_count: number;
}

interface GitLabData {
  user: GitLabUser;
  projects: GitLabProject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeObject?: any;
}

type Platform = "github" | "twitter" | "linkedin" | "youtube" | "gitlab";

interface SocialCardProps {
  platform: Platform;
  onClick: () => void;
  isSelected: boolean;
  data: GitHubData | YouTubeData | GitLabData;
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

const SocialCard: React.FC<SocialCardProps> = ({
  platform,
  data,
  onClick,
  isSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick();
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
      case "gitlab":
        return <FaGitlab />;
      default:
        return null;
    }
  };

  const renderStats = () => {
    switch (platform) {
      case "github":
        return <GitHubStats data={data as GitHubData} />;
      case "youtube":
        return <YouTubeStats data={data as YouTubeData} />;
      case "gitlab": {
        const gitlabData = data as GitLabData;
        return (
          <GitLabStats user={gitlabData.user} projects={gitlabData.projects} />
        );
      }
      default:
        return null;
    }
  };

  return (
    <CardContainer
      onClick={handleClick}
      theme={data.themeObject}
      style={{ border: isSelected ? "2px solid #4A90E2" : "none" }}
    >
      <IconWrapper>{renderIcon()}</IconWrapper>
      <CardContent $isExpanded={isExpanded}>{renderStats()}</CardContent>
    </CardContainer>
  );
};

export default SocialCard;
