import { useTranslation } from "react-i18next";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSocialMediaData } from "../hooks/useSocialMediaData";
import Sections from "../components/Sections";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/context/ThemeContext";
import SocialCard from "../components/social-media-cards/SocialCard";
import { darkTheme } from "../types/theme";
import { useEffect, useState } from "react";
import ChartWrapper from "../components/charts/ChartWrapper";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Platform } from "../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

const Container = styled.div`
  // max-width: 1200px;
  // margin: 20px auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  &:hover {
    opacity: 0.8;
  }
`;

const BackIcon = styled(FaArrowLeft)`
  margin-right: 8px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.color};
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Username = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 30px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 0 auto;
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const { themeObject } = useTheme();
  const navigate = useNavigate();

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("github");

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const { githubQuery, youtubeQuery, gitlabQuery } = useSocialMediaData({
    github: username,
    youtube: import.meta.env.VITE_YOUTUBE_CHANNEL_ID,
    reddit: username,
    gitlab: username,
  });

  const [lineChartData, setLineChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (selectedPlatform === "github" && githubQuery.data) {
      const labels = githubQuery.data.monthlyGrowth.map((item) => item.month);
      const data = githubQuery.data.monthlyGrowth.map((item) => item.followers);
      setLineChartData({
        labels,
        datasets: [
          {
            label: t("dashboard.followersGrowth"),
            data,
            borderColor: "#4A90E2",
            fill: false,
          },
        ],
      });
    } else if (selectedPlatform === "youtube" && youtubeQuery.data) {
      // Update chart data for YouTube
      const labels = ["Subscribers", "Views", "Videos"];
      const data = [
        youtubeQuery.data.subscriberCount,
        youtubeQuery.data.viewCount,
        youtubeQuery.data.videoCount,
      ];
      setLineChartData({
        labels,
        datasets: [
          {
            label: t("dashboard.youtubeStats"),
            data,
            borderColor: "#FF0000",
            fill: false,
          },
        ],
      });
    } else if (selectedPlatform === "gitlab" && gitlabQuery.data) {
      // Update chart data for GitLab
      const labels = ["Projects", "Followers"];
      const data = [
        gitlabQuery.data.projects.length,
        gitlabQuery.data.user.followers,
      ];
      setLineChartData({
        labels,
        datasets: [
          {
            label: t("dashboard.gitlabStats"),
            data,
            borderColor: "#FC6D26",
            fill: false,
          },
        ],
      });
    }
  }, [
    selectedPlatform,
    githubQuery.data,
    youtubeQuery.data,
    gitlabQuery.data,
    t,
  ]);

  if (!username) {
    return (
      <Container>
        <p>No username provided.</p>
      </Container>
    );
  }

  if (
    githubQuery.isLoading ||
    youtubeQuery.isLoading ||
    gitlabQuery.isLoading
  ) {
    return (
      <Loader>
        <ClipLoader color="#6e8efb" size={50} />
      </Loader>
    );
  }

  if (
    githubQuery.isError ||
    youtubeQuery.isError ||
    gitlabQuery.isError ||
    !githubQuery.data
  ) {
    return (
      <Container>
        <p>{t("dashboard.error")}</p>
      </Container>
    );
  }

  const data = {
    ...githubQuery.data,
    themeObject,
  };

  const chartData = {
    labels: [t("dashboard.followers"), t("dashboard.repositories")],
    datasets: [
      {
        label: t("dashboard.statisticsOverview"),
        data: [
          githubQuery.data.user?.followers ?? 0,
          githubQuery.data.user?.public_repos ?? 0,
        ],
        backgroundColor: darkTheme
          ? ["#6e8efb", "#50E3C2"]
          : ["#4A90E2", "#50E3C2"],
        borderRadius: 5,
      },
    ],
  };

  const pieChartData = {
    labels: [
      t("dashboard.likes"),
      t("dashboard.comments"),
      t("dashboard.shares"),
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#4A90E2", "#50E3C2", "#FF6384"],
      },
    ],
  };

  interface ChartContext {
    chart: {
      data: {
        datasets: {
          data: number[];
        }[];
        labels: string[];
      };
    };
    dataIndex: number;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#000",
        formatter: (value: number, context: ChartContext) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1) + "%";
          return (
            context.chart.data.labels[context.dataIndex] + "\n" + percentage
          );
        },
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  const followerGoal = 1000;
  const currentFollowers = githubQuery.data.user?.followers ?? 0;
  const progress = (currentFollowers / followerGoal) * 100;

  return (
    <Container theme={themeObject}>
      <BackButton onClick={() => navigate("/")}>
        {" "}
        <BackIcon />
        <span>{t("dashboard.backToHome")}</span>
      </BackButton>

      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Header>{t("dashboard.title")}</Header>
      <Username>
        {t("dashboard.username")} <strong>{username}</strong>
      </Username>

      <CardsContainer>
        <SocialCard
          platform="github"
          data={data}
          onClick={() => handlePlatformSelect("github")}
          isSelected={selectedPlatform === "github"}
        />
        {youtubeQuery.data && (
          <SocialCard
            platform="youtube"
            data={{
              subscriberCount: youtubeQuery.data.subscriberCount,
              viewCount: youtubeQuery.data.viewCount,
              videoCount: youtubeQuery.data.videoCount,
              themeObject: themeObject,
            }}
            onClick={() => handlePlatformSelect("youtube")}
            isSelected={selectedPlatform === "youtube"}
          />
        )}

        {gitlabQuery.data && (
          <SocialCard
            platform="gitlab"
            data={{
              user: gitlabQuery.data.user,
              projects: gitlabQuery.data.projects,
              themeObject: themeObject,
            }}
            onClick={() => handlePlatformSelect("gitlab")}
            isSelected={selectedPlatform === "gitlab"}
          />
        )}
      </CardsContainer>

      <Sections title={t("dashboard.statisticsOverview")}>
        <ChartContainer>
          <ChartWrapper type="bar" data={chartData} options={chartOptions} />
        </ChartContainer>
      </Sections>
      <Sections title={t("dashboard.followersGrowth")}>
        <ChartContainer>
          <ChartWrapper
            type="line"
            data={lineChartData}
            options={chartOptions}
          />
        </ChartContainer>
      </Sections>

      <Sections title={t("dashboard.engagementDistribution")}>
        <ChartContainer>
          <ChartWrapper type="pie" data={pieChartData} options={chartOptions} />
        </ChartContainer>
      </Sections>

      <Sections title={t("dashboard.followerGoalProgress")}>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      </Sections>
    </Container>
  );
};

export default Dashboard;
