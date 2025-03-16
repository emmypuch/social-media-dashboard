import React, { useState } from "react";
import styled from "styled-components";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import GitHubStats from "../GitHubStats";
import { GitHubData } from "../../types/types";

type Platform = "github" | "twitter" | "linkedin";

interface SocialCardProps {
  platform: Platform;
  data: GitHubData;
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
      default:
        return null;
    }
  };

  const renderStats = () => {
    switch (platform) {
      case "github":
        return <GitHubStats data={data} />;
      default:
        return null;
    }
  };

  return (
    <CardContainer onClick={handleClick} theme={data.themeObject}>
      <IconWrapper>{renderIcon()}</IconWrapper>
      <CardContent $isExpanded={isExpanded}>{renderStats()}</CardContent>
    </CardContainer>
  );
};

export default SocialCard;
