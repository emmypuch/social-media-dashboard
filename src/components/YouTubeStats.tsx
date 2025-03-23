import { useTranslation } from "react-i18next";
import React from "react";
import styled from "styled-components";
import { FaUsers, FaEye, FaVideo } from "react-icons/fa";

interface YouTubeData {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

interface YouTubeStatsProps {
  data: YouTubeData;
}

const StatsContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  // border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
`;

const StatItem = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.color};
`;

const StatLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatValue = styled.span`
  font-weight: bold;
`;

const YouTubeStats: React.FC<YouTubeStatsProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <StatsContainer>
      <h3>{t("youtubeStats.title")}</h3>

      <StatItem>
        <StatLabel>
          <FaUsers /> {t("youtubeStats.subscribers")}
        </StatLabel>
        <StatValue>{data.subscriberCount.toLocaleString()}</StatValue>
      </StatItem>

      <StatItem>
        <StatLabel>
          <FaEye /> {t("youtubeStats.views")}
        </StatLabel>
        <StatValue>{data.viewCount.toLocaleString()}</StatValue>
      </StatItem>

      <StatItem>
        <StatLabel>
          <FaVideo /> {t("youtubeStats.videos")}
        </StatLabel>
        <StatValue>{data.videoCount.toLocaleString()}</StatValue>
      </StatItem>
    </StatsContainer>
  );
};

export default YouTubeStats;
