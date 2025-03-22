import React from "react";
import { useTranslation } from "react-i18next";

interface GitLabUser {
  username: string;
  name: string;
  public_repos: number;
}

interface GitLabProject {
  id: number;
  name: string;
}

interface GitLabStatsProps {
  user: GitLabUser;
  projects: GitLabProject[];
}

const GitLabStats: React.FC<GitLabStatsProps> = ({ user, projects }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t("gitlab.title")}</h3>
      <p>
        {t("gitlab.username")}: {user.username}
      </p>
      <p>
        {t("gitlab.name")}: {user.name}
      </p>
      <p>
        {t("gitlab.publicRepos")}: {user.public_repos}
      </p>
      <p>
        {t("gitlab.projects")}: {projects.length}
      </p>
    </div>
  );
};

export default GitLabStats;
