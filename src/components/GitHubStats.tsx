import styled from "styled-components";
import { FaStar, FaCodeBranch, FaBuilding, FaClock } from "react-icons/fa";
import Sections from "./Sections";
import { GitHubData } from "../types/types";

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #777;
  font-size: 1rem;
  padding: 10px;
`;

const OrgAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const TimeStamp = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

interface GitHubStatsProps {
  data: GitHubData;
}

const GitHubStats = ({ data }: GitHubStatsProps) => {
  if (data.user?.public_repos === 0) {
    throw new Error("Test error: No public repositories found.");
  }
  return (
    <Sections title="GitHub Overview">
      {/* Stats Cards */}
      <StatsContainer>
        <StatCard>
          <FaCodeBranch size={24} color="#4A90E2" />
          <StatNumber>{data.user?.public_repos ?? "--"}</StatNumber>
          <p>Repositories</p>
        </StatCard>
        <StatCard>
          <FaBuilding size={24} color="#50E3C2" />
          <StatNumber>{data.user?.followers ?? "--"}</StatNumber>
          <p>Followers</p>
        </StatCard>
      </StatsContainer>

      {/* Repositories */}
      <Sections title="Top Repositories">
        {data.repos.length > 0 ? (
          <List>
            {data.repos.slice(0, 5).map((repo) => (
              <ListItem key={repo.name}>
                <strong>{repo.name}</strong>
                <FaStar color="#FFD700" /> {repo.stargazers_count}
                <FaCodeBranch color="#50E3C2" /> {repo.forks_count}
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState>No repositories available.</EmptyState>
        )}
      </Sections>

      {/* Organizations */}
      <Sections title="Organizations">
        {data.orgs.length > 0 ? (
          <List>
            {data.orgs.map((org) => (
              <ListItem key={org.login}>
                <OrgAvatar src={org.avatar_url} alt={org.login} />
                {org.login}
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState>Not part of any organizations.</EmptyState>
        )}
      </Sections>

      {/* Recent Activity */}
      <Sections title="Recent Activity">
        {data.events.length > 0 ? (
          <List>
            {data.events.slice(0, 5).map((event, index) => (
              <ListItem key={index}>
                <FaClock color="#777" />
                <span>
                  {event.type} on <strong>{event.repo.name}</strong>
                </span>
                <TimeStamp>
                  {new Date(event.created_at).toLocaleString()}
                </TimeStamp>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState>No recent activity found.</EmptyState>
        )}
      </Sections>
    </Sections>
  );
};

export default GitHubStats;
