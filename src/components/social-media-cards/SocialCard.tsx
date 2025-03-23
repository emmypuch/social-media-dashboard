/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { GitLabData } from "../../interfaces/interface";

interface YouTubeData {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
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
  // padding: 20px;
  margin: 10px;
  color: ${({ theme }) => theme.color};
  // border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin: 5px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 5px;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CardContent = styled.div<{ $isExpanded: boolean }>`
  display: ${({ $isExpanded }) => ($isExpanded ? "block" : "none")};
  width: 100%;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
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
