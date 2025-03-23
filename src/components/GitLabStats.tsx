/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FaUser, FaCode, FaStar, FaCalendar, FaUsers } from "react-icons/fa";

interface GitLabUser {
  id: number;
  username: string;
  name: string;
  public_repos: number;
  followers: number;
  starredProjects?: any[];
  events?: any[];
  groups?: any[];
}

interface GitLabProject {
  id: number;
  name: string;
}

interface GitLabStatsProps {
  user?: GitLabUser;
  projects?: GitLabProject[];
}

const StatsContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const StatsHeader = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1rem;
`;

const StatIcon = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.subtext};
`;

const GitLabStats: React.FC<GitLabStatsProps> = ({ user, projects }) => {
  const { t } = useTranslation();

  const safeUser = user || {
    id: 0,
    username: "",
    name: "",
    public_repos: 0,
    followers: 0,
    starredProjects: [],
    events: [],
    groups: [],
  };

  const safeProjects = projects || [];

  return (
    <StatsContainer>
      <StatsHeader>{t("gitlab.title")}</StatsHeader>

      <StatItem>
        <StatIcon>
          <FaUser />
        </StatIcon>
        <StatLabel>{t("gitlab.username")}:</StatLabel>
        <StatValue>{safeUser.username}</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaUser />
        </StatIcon>
        <StatLabel>{t("gitlab.name")}:</StatLabel>
        <StatValue>{safeUser.name}</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaCode />
        </StatIcon>
        <StatLabel>{t("gitlab.publicRepos")}:</StatLabel>
        <StatValue>{safeUser.public_repos}</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaCode />
        </StatIcon>
        <StatLabel>{t("gitlab.projects")}:</StatLabel>
        <StatValue>{safeProjects.length}</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaStar />
        </StatIcon>
        <StatLabel>{t("gitlab.starredProjects")}:</StatLabel>
        <StatValue>{safeUser.starredProjects?.length || 0}</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaCalendar />
        </StatIcon>
        <StatLabel>{t("dashboard.recentActivity")}:</StatLabel>
        <StatValue>{safeUser.events?.length || 0} events</StatValue>
      </StatItem>

      <StatItem>
        <StatIcon>
          <FaUsers />
        </StatIcon>
        <StatLabel>{t("gitlab.groups")}:</StatLabel>
        <StatValue>{safeUser.groups?.length || 0}</StatValue>
      </StatItem>
    </StatsContainer>
  );
};

export default GitLabStats;
