import styled from "styled-components";
import Sections from "./Sections";

const Stat = styled.p`
  font-size: 1.1rem;
  color: #444;
`;

interface InstagramData {
  followers_count?: number;
  engagement_rate?: number;
}

interface InstagramStatsProps {
  data: InstagramData;
}

const InstagramStats = ({ data }: InstagramStatsProps) => {
  return (
    <Sections title="Instagram">
      {" "}
      <Stat>Followers: {data?.followers_count ?? "--"}</Stat>
      <Stat>Engagement Rate: {data?.engagement_rate ?? "--"}%</Stat>
    </Sections>
  );
};

export default InstagramStats;
