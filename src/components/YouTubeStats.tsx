// import { useTranslation } from "react-i18next";
// import React from "react";
// import styled from "styled-components";

// interface YouTubeData {
//   subscriberCount: number;
//   viewCount: number;
//   videoCount: number;
// }

// interface YouTubeStatsProps {
//   data: YouTubeData;
// }

// const StatsContainer = styled.div`
//   text-align: center;
// `;

// const StatItem = styled.div`
//   margin: 10px 0;
//   font-size: 1rem;
// `;

// const YouTubeStats: React.FC<YouTubeStatsProps> = ({ data }) => {
//   const { t } = useTranslation();

//   return (
//     <StatsContainer>
//       <StatItem>
//         {t("youtubeStats.subscribers")}: {data.subscriberCount}
//       </StatItem>
//       <StatItem>
//         {t("youtubeStats.views")}: {data.viewCount}
//       </StatItem>
//       <StatItem>
//         {t("youtubeStats.videos")}: {data.videoCount}
//       </StatItem>
//     </StatsContainer>
//   );
// };

// export default YouTubeStats;

import { useTranslation } from "react-i18next";
import React from "react";
import styled from "styled-components";
import { FaYoutube, FaUsers, FaEye, FaVideo } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

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

const ProgressContainer = styled.div`
  margin-top: 10px;
`;

const YouTubeStats: React.FC<YouTubeStatsProps> = ({ data }) => {
  const { t } = useTranslation();

  const subscriberProgress = data.subscriberCount;
  const viewProgress = data.viewCount;
  const videoProgress = data.videoCount;

  return (
    <StatsContainer>
      <h3>
        <FaYoutube /> {t("youtubeStats.title")}
      </h3>

      <StatItem>
        <StatLabel>
          <FaUsers /> {t("youtubeStats.subscribers")}
        </StatLabel>
        <StatValue>{data.subscriberCount.toLocaleString()}</StatValue>
      </StatItem>
      <ProgressContainer>
        <ProgressBar
          now={subscriberProgress}
          label={`${subscriberProgress.toFixed(1)}%`}
          variant="danger"
        />
      </ProgressContainer>

      <StatItem>
        <StatLabel>
          <FaEye /> {t("youtubeStats.views")}
        </StatLabel>
        <StatValue>{data.viewCount.toLocaleString()}</StatValue>
      </StatItem>
      <ProgressContainer>
        <ProgressBar
          now={viewProgress}
          label={`${viewProgress.toFixed(1)}%`}
          variant="info"
        />
      </ProgressContainer>

      <StatItem>
        <StatLabel>
          <FaVideo /> {t("youtubeStats.videos")}
        </StatLabel>
        <StatValue>{data.videoCount.toLocaleString()}</StatValue>
      </StatItem>
      <ProgressContainer>
        <ProgressBar
          now={videoProgress}
          label={`${videoProgress.toFixed(1)}%`}
          variant="success"
        />
      </ProgressContainer>
    </StatsContainer>
  );
};

export default YouTubeStats;
