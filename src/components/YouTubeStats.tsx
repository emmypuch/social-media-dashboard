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
  return (
    <StatsContainer>
      <StatItem>Subscribers: {data.subscriberCount}</StatItem>
      <StatItem>Views: {data.viewCount}</StatItem>
      <StatItem>Videos: {data.videoCount}</StatItem>
    </StatsContainer>
  );
};

export default YouTubeStats;
