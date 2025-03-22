import { useTranslation } from "react-i18next";
import React from "react";
import styled from "styled-components";

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
`;

const StatItem = styled.div`
  margin: 10px 0;
  font-size: 1rem;
`;

const YouTubeStats: React.FC<YouTubeStatsProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <StatsContainer>
      <StatItem>
        {t("youtubeStats.subscribers")}: {data.subscriberCount}
      </StatItem>
      <StatItem>
        {t("youtubeStats.views")}: {data.viewCount}
      </StatItem>
      <StatItem>
        {t("youtubeStats.videos")}: {data.videoCount}
      </StatItem>
    </StatsContainer>
  );
};

export default YouTubeStats;
